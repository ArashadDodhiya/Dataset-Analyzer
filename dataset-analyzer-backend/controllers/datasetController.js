const Dataset = require('../models/Dataset');
const ErrorResponse = require('../middleware/error')
const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const path = require('path');

// @desc    Upload a dataset
// @route   POST /api/v1/datasets
// @access  Private
exports.uploadDataset = async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  try {
    // Generate preview data
    const previewData = await generatePreview(req.file.path, req.file.mimetype);

    const dataset = await Dataset.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      user: req.user.id,
      previewData
    });

    res.status(201).json({
      success: true,
      data: dataset
    });
  } catch (err) {
    next(err);
  }
};

// Helper function to generate preview data
async function generatePreview(filePath, mimetype) {
  return new Promise((resolve, reject) => {
    const previewData = [];
    const maxRows = 10;

    try {
      if (mimetype === 'text/csv' || path.extname(filePath) === '.csv') {
        // Process CSV
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {
            if (previewData.length < maxRows) {
              previewData.push(row);
            }
          })
          .on('end', () => {
            resolve(previewData);
          })
          .on('error', reject);
      } else {
        // Process Excel
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        
        resolve(jsonData.slice(0, maxRows));
      }
    } catch (err) {
      reject(err);
    }
  });
}