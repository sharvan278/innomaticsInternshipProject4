import express from 'express';
import auth from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Set doctor availability
router.post('/availability', auth, async (req, res, next) => {
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ error: 'Only doctors can set availability' });
    }
    
    req.user.availability = req.body.availability;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

// Get list of doctors
router.get('/', async (req, res, next) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');
    res.json(doctors);
  } catch (error) {
    next(error);
  }
});

export default router;
