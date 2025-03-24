import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';


dotenv.config();
connectDB();
const app = express();
// app.use(cors());
// app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
// app.use(cors({
//     origin: ['http://localhost:5173', 'https://your-deployed-frontend-url.com'],
//     credentials: true,
//   }));

  app.use(cors({
    origin: process.env.FRONTEND_URL.split(','), // Supports multiple URLs
    credentials: true,
}));


app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
