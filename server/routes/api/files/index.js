'use strict';

const express = require('express');
const multer = require('multer');
const router = express.Router();

const auth = require('../../../middlewares/authorization');
const {
  sendFiles,
  downloadFile,
  saveFilePath,
  getProcessedFiles,
  processFile,
  deleteProcessedFile
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

const tmpStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './tmp/');
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

const tmpUpload = multer({
  limits: {
    fileSize: MAX_SIZE
  },
  tmpStorage
});

router.post('/upload', auth(['user']), upload.array('files'), sendFiles);
router.post('/download', auth(['user']), downloadFile);
router.post('/process', auth(['user']), upload.single('file'), processFile);
router.post('/save', auth(['user']), saveFilePath);
router.get('/processed', auth(['user']), getProcessedFiles);
router.delete('/delete', auth(['user']), deleteProcessedFile);

module.exports = router;
