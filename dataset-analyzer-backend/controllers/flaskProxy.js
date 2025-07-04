const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");
const FormData = require("form-data");

const FLASK_API_URL = process.env.FLASK_API_URL || "http://localhost:5001";

// Simple reverse proxy for general Flask routes (e.g., health check, etc.)
exports.flaskProxy = createProxyMiddleware({
  target: FLASK_API_URL,
  changeOrigin: true,
  pathRewrite: { "^/api/flask": "" }, // Remove /api/flask prefix
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(502).json({ error: "Flask service unavailable" });
  },
});

// Enhanced proxy for /analyze file POST
exports.analyzeProxy = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Create proper multipart/form-data for axios to send to Flask
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    formData.append("analysis_type", req.body.analysis_type || "full");

    // Send to Flask API
    console.log("📤 Sending file to Flask API...");

    const response = await axios.post(`${FLASK_API_URL}/analyze`, formData, {
      headers: formData.getHeaders(),
    });

    console.log("✅ Flask response:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("❌ Flask service error:", error.message);
    if (error.response) {
      console.error("📄 Flask response error data:", error.response.data);
      console.error("📄 Flask response status:", error.response.status);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("📡 No response from Flask:", error.request);
      res.status(503).json({ error: "Flask service unavailable" });
    }
  }
};
