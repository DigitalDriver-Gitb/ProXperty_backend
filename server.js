import express from "express";
import router from "./Routes/Web.js";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
import connectDb from "./db/Connect_db.js";
// CORS configuration
const corsOptions = {
    origin: ["http://localhost:5174", "http://localhost:3500","http://localhost:5173","*"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Disposition"],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Apply CORS before other middleware
app.use(cors(corsOptions));
// Body parser middleware - must be before routes
app.use(express.json({ limit: '10mb', strict: false }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to database
connectDb();

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// Routes
app.use("/", router);

// 404 handler - must be after all other routes
app.use((req, res) => {
    console.warn(`404 - Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// Error handling middleware - must be after all other middleware
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            error: 'Bad Request',
            message: 'Invalid JSON payload'
        });
    }
    res.status(500).json({ 
        error: 'Internal Server Error', 
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

const PORT = process.env.PORT || 3500;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
    console.log(`Available routes:`);
    console.log(`- POST   /admin/project`);
    console.log(`- GET    /admin/project`);
    console.log(`- GET    /admin/project/:id`);
    console.log(`- PUT    /admin/project/:id`);
    console.log(`- DELETE /admin/project/:id`);
    console.log(`- POST   /upload-image`);
    console.log(`- GET    /test-register`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => process.exit(1));
});
