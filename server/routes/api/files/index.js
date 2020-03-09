'use strict';

const express = require('express');
const multer = require('multer');
const router = express.Router();

const auth = require('../../../middlewares/authorization');
const {
  sendFiles,
  downloadFile,
  saveFilePath,
  getProcessedFiles
} = require('../../../controllers/files/controller');

const MAX_SIZE = '20000000';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  limits: {
    fileSize: MAX_SIZE
  },
  storage
});

router.post('/upload', auth(['user']), upload.array('files'), sendFiles);
router.post('/download', auth(['user']), downloadFile);
router.post('/save', auth(['user']), saveFilePath);
router.get('/processed', auth(['user']), getProcessedFiles);

module.exports = router;
