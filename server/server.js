import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB, getDBStatus } from './src/config/db.js';
import { getGeminiStatus } from './src/config/gemini.js';

// Route Imports
import authRoutes from './src/routes/authRoutes.js';
import analyzerRoutes from './src/routes/analyzerRoutes.js';
import careerRoutes from './src/routes/careerRoutes.js';
import resumeRoutes from './src/routes/resumeRoutes.js';
import interviewRoutes from './src/routes/interviewRoutes.js';
import dashboardRoutes from './src/routes/dashboardRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// System Health & Configuration Status Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'RESUMIFY API Server',
    version: '1.0.0',
    database: getDBStatus(),
    gemini: getGeminiStatus(),
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to RESUMIFY API Server',
    healthCheck: '/api/health',
    sections: [
      '/api/auth',
      '/api/analyzer',
      '/api/career',
      '/api/resume',
      '/api/interview',
      '/api/dashboard',
    ],
  });
});

// Mount Module Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/analyzer', analyzerRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Initialize Database and Start Server
connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`🚀 [RESUMIFY Server]: Running on http://localhost:${PORT}`);
    console.log(`📡 [Health Check]: http://localhost:${PORT}/api/health`);
  });
});
