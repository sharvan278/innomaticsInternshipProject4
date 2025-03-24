import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./PatientDashboard.css";


const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAppointments(response.data);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDoctors(response.data);
    } catch (error) {
      toast.error("Failed to fetch doctors");
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        {
          doctorId: selectedDoctor,
          date: selectedDate,
          timeSlot: selectedTime,
          reason,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Appointment booked successfully");
      fetchAppointments();
      setSelectedDoctor("");
      setSelectedDate("");
      setSelectedTime("");
      setReason("");
    } catch (error) {
      toast.error("Failed to book appointment");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${appointmentId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Appointment cancelled");
      fetchAppointments();
    } catch (error) {
      toast.error("Failed to cancel appointment");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Patient Dashboard</h2>

      {/* Book Appointment Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Book Appointment</h3>
        <form onSubmit={handleBookAppointment} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Choose a doctor</label>
            <select
              className="w-full p-3 mt-2 border rounded-lg"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Select Date</label>
            <input
              type="date"
              className="w-full p-3 mt-2 border rounded-lg"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Select Time</label>
            <input
              type="time"
              className="w-full p-3 mt-2 border rounded-lg"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Reason for visit</label>
            <input
              type="text"
              className="w-full p-3 mt-2 border rounded-lg"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Book Appointment
          </button>
        </form>
      </div>

      {/* Appointment List */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Appointments</h3>
<ul>
  {appointments.map((appt) => (
    <li key={appt._id}>
      <span>{appt.date} with Dr. {appt.doctorId.name}</span>
      <span className={`status-${appt.status.toLowerCase()}`}>{appt.status}</span>
      <button onClick={() => handleCancelAppointment(appt._id)}>Cancel</button>
    </li>
  ))}
</ul>

    </div>
  );
};

export default PatientDashboard;
