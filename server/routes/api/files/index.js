'use strict';

const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  sendFiles,
  downloadFile
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

router.post('/upload', upload.array('files'), sendFiles);
router.post('/download', downloadFile);

module.exports = router;
