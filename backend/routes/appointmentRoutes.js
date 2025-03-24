import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

const router = express.Router();

// Book an appointment
router.post('/', auth, async (req, res, next) => {
  try {
    const { doctorId, date, timeSlot, reason } = req.body;

    const appointment = new Appointment({
      patientId: req.user._id,
      doctorId,
      date,
      timeSlot,
      status: 'pending',
      reason
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
});

// Fetch appointments (with doctor details)
router.get('/', auth, async (req, res, next) => {
  try {
    let appointments;
    if (req.user.role === 'patient') {
      appointments = await Appointment.find({ patientId: req.user._id })
        .populate('doctorId', 'name specialization');
    } else if (req.user.role === 'doctor') {
      appointments = await Appointment.find({ doctorId: req.user._id })
        .populate('patientId', 'name email');
    } else if (req.user.role === 'admin') {
      appointments = await Appointment.find({})
        .populate('patientId', 'name email')
        .populate('doctorId', 'name specialization');
    }

    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

// Cancel Appointment
router.put('/:id/cancel', auth, async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = 'cancelled';
    await appointment.save();
    res.json({ message: 'Appointment cancelled', appointment });
  } catch (error) {
    next(error);
  }
});

export default router;
