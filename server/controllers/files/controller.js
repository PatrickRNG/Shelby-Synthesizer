'use strict';

const fetch = require('node-fetch');
const multer = require('multer');
const Files = require('../../models/files');
const config = require('../../config');
const { base64_encode, base64_decode } = require('../../utils/files');

const sendFiles = (req, res, next) => {
  try {
    const files = req.files;
    res.json({ files });
  } catch (error) {
    return next(error);
  }
};

const downloadFile = (req, res) => {
  const { fileName } = req.body;
  const uploadUrl = `${config.apiUrl}/uploads`;
  const filePath = `${uploadUrl}/${fileName}`;
  res.json({ filePath });
};

const saveFilePath = async (req, res, next) => {
  try {
    await Files.findOneAndUpdate(
      { email: req.user.email },
      { email: req.user.email, $addToSet: { files: req.body.files } },
      { upsert: true, new: true }
    ).exec();
    res.status(200);
    const response = { success: true };
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const processFile = async (req, res, next) => {
  try {
    console.log('>>>>>>>>> ', req.file);
    const { filename } = req.file;
    const filePath = `uploads/${filename}`
    const dataApiUrl = `${config.dataApiUrl}/getEmentas2`;

    const params = {
      'pdf': base64_encode(filePath),
      'factor': 7, 
      'words': 15,
      'max_diff': 0.2,
      'min_sim' : 0.6
    }

    const response = await fetch(dataApiUrl, {
      method: 'POST',
      body: JSON.stringify(params)
    });

    const result = await response.json();
    // Update /uploads with the processed file
    base64_decode(result.pdf, filePath);

    res.json({ file: req.file, success: true });
    res.status(200);

  } catch (err) {
    next(err);
  }
}

const getProcessedFiles = async (req, res, next) => {
  try {
    const processedFiles = await Files.findOne(
      { email: req.query.email },
      'email files',
      { _id: 0, __v: 0 }
    ).exec();

    res.status(200);
    const response = {...processedFiles.toObject(), success: true };
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const deleteProcessedFile = async (req, res, next) => {
  try {
    const { filename } = req.body;
    await Files.deleteOne(
      { email: req.query.email, $pull: { 'files.loading': 'processed', 'files.filename': filename } },
      { _id: 0, __v: 0 }
    ).exec();

    res.status(200);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendFiles,
  downloadFile,
  saveFilePath,
  getProcessedFiles,
  processFile,
  deleteProcessedFile
};
