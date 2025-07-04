require('dotenv').config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose"); // Added missing mongoose import
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/error");

// Debug: Verify environment variables
console.log('Environment Variables Loaded:');
console.log('- MONGO_URI:', process.env.MONGO_URI ? '***' : 'Not set');
console.log('- FLASK_API_URL:', process.env.FLASK_API_URL || 'Not set');
console.log('- CLIENT_URL:', process.env.CLIENT_URL || 'Not set');

// Connect to database
connectDB().then(() => {
  console.log('✅ MongoDB connection established');
}).catch(err => {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
});

// Route imports
const authRoutes = require("./routes/authRoutes");
const datasetRoutes = require("./routes/datasetRoutes");
const flaskRoutes = require('./routes/flaskRoutes');

const app = express();

// Middleware Stack
app.use(express.json({ limit: process.env.MAX_FILE_SIZE || '50mb' }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Static files
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/datasets", datasetRoutes);
app.use('/api/flask', flaskRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    4: 'invalid'
  };
  
  res.status(200).json({
    status: 'healthy',
    mongo: statusMap[mongoStatus] || 'unknown',
    flask: process.env.FLASK_API_URL ? 'configured' : 'not configured'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Not Found - ${req.method} ${req.originalUrl}`
  });
});

// Error Handling
app.use(errorHandler);

// Server Configuration
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  const mongoStatus = mongoose.connection.readyState;
  console.log(`\nServer running in ${process.env.NODE_ENV || 'development'} mode:`);
  console.log(`- Port: ${PORT}`);
  console.log(`- MongoDB: ${mongoStatus === 1 ? '✅ Connected' : '❌ Disconnected'}`);
  console.log(`- Flask: ${process.env.FLASK_API_URL ? '✅ Configured' : '❌ Not configured'}\n`);
});

// Process Handlers
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close();
    console.log('💤 Process terminated');
    process.exit(0);
  });
});