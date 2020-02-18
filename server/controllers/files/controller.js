'use strict';

function sendFiles(req, res, next) {
  try {
    const files = req.files;
    res.json({files});
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  sendFiles
}