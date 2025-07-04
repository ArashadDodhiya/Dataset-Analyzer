const express = require('express');
const router = express.Router();
const { flaskProxy, analyzeProxy } = require('../controllers/flaskProxy');
const { validateAnalysisRequest, validateFlaskRequest } = require('../middleware/validation');
const upload = require('../utils/fileUpload');

// ✅ Handle /analyze first to prevent hijack
router.post(
  '/analyze',
  upload.single('file'),
  validateAnalysisRequest,
  analyzeProxy
);

// Optional route for dataset-specific analysis
router.post(
  '/datasets/:dataset_id/analyze',
  validateFlaskRequest,
  analyzeProxy
);

// ⚠️ Move this LAST: It proxies any unmatched /flask/* requests
router.use('/', flaskProxy); // instead of `/flask`, use `/` because this is already under /api/flask

module.exports = router;
