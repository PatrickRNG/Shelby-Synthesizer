'use strict';

const Files = require('../../models/files');
const config = require('../../config');
const fs = require('fs');
const fetch = require('node-fetch');

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
    await Files.updateOne(
      { email: req.body.email },
      req.body,
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
    const filePath = `uploads/Patrick_Passarella_Resume.pdf`
    const pdf = fs.readFileSync(filePath);
    const pdfBase64 = new Buffer(pdf).toString('base64');
    const pdfBase64str = new Buffer(pdfBase64, 'base64').toString('ascii');
    const dataApiUrl = `${config.dataApiUrl}/getEmentas2`;

    const params = {
      'pdf': pdfBase64str,
      'factor': 7,
      'words': 15,
      'max_diff': 0.2,
      'min_sim' : 0.6
    };

    const processUrl = new URL(dataApiUrl);
    processUrl.search = new URLSearchParams(params).toString();

    // const response = await fetch(processUrl, {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'GET',
    // });

    // const result = response.json();

    const processedPdfAscii = Buffer(pdfBase64, 'base64').toString('ascii');
    const processedPdf = new Buffer(processedPdfAscii).toString('base64');
    
    res.json(processedPdf);
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

module.exports = {
  sendFiles,
  downloadFile,
  saveFilePath,
  getProcessedFiles,
  processFile
};
