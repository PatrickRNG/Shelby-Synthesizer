'use strict';

const Files = require('../../models/files');
const config = require('../../config');

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
    const savedFiles = await Files.updateOne(
      { email: req.body.email },
      req.body,
      { upsert: true, new: true }
    ).exec();
    res.status(200);
    console.log('server >>>>> req.body', req.body)
    const response = { success: true };
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const getProcessedFiles = async (req, res, next) => {
  try {
    const processedFiles = await Files.findOne(
      { email: req.query.email },
      'email files',
      { _id: 0, __v: 0 }
    ).exec();

    res.status(200);
    console.log('YESSS >>>> ', processedFiles, req.query.email);
    const response = {...processedFiles.toObject(), success: true };
    res.json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendFiles,
  downloadFile,
  saveFilePath,
  getProcessedFiles
};
