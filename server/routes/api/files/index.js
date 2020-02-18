'use strict';

const express = require('express');
const multer = require('multer');
const router = express.Router();
const { sendFiles } = require('../../../controllers/files/controller');

const MAX_SIZE = '20000000';

const upload = multer({
  dest: './uploads/',
  limits: {
    fileSize: MAX_SIZE
  }
});

router.post('/files', upload.array('files'), sendFiles);
module.exports = router;
