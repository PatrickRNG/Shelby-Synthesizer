'use strict';

const config = require('../../config');

function sendFiles(req, res, next) {
  try {
    const files = req.files;
    res.json({ files });
  } catch (error) {
    return next(error);
  }
}

function downloadFile(req, res, next) {
  const { fileName } = req.body;
  const uploadUrl = `${config.apiUrl}/uploads`;
  const filePath = `${uploadUrl}/${fileName}`;
  res.json({filePath});
}

module.exports = {
  sendFiles,
  downloadFile
};
