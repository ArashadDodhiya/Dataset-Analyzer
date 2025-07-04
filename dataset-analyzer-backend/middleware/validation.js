const { body, validationResult } = require('express-validator');

exports.validateAnalysisRequest = [
  // Validate analysis_type parameter
  body('analysis_type')
    .optional()
    .isIn(['full', 'eda', 'stats', 'viz', 'ml'])
    .withMessage('Invalid analysis type'),
  
  // Validate file in multipart requests
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type' });
    }
    
    next();
  }
];

exports.validateFlaskRequest = [
  body('dataset_id').isMongoId().withMessage('Invalid dataset ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];