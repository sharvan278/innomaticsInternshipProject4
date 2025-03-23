export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  specialization?: string;
  availability?: TimeSlot[];
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  _id: string;
  patientId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}