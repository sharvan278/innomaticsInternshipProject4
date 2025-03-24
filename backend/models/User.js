import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['patient', 'doctor', 'admin'] },
  specialization: String,
  availability: [{
    day: String,
    startTime: String,
    endTime: String
  }]
});

export default mongoose.model('User', userSchema);
