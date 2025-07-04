const express = require('express');
const { protect } = require('../middleware/auth');
const { uploadDataset } = require('../controllers/datasetController');
const upload = require('../utils/fileUpload');

const router = express.Router();

router.route('/')
  .post(protect, upload.single('file'), uploadDataset);

module.exports = router;