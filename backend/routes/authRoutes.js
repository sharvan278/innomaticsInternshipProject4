import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role, specialization } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      specialization: role === 'doctor' ? specialization : undefined
    });

    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ user: userResponse, token });
  } catch (error) {
    next(error);
  }
});

export default router;
