import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

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
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Appointment booked successfully");
      fetchAppointments();
      setSelectedDoctor("");
      setSelectedDate("");
      setSelectedTime("");
    } catch (error) {
      toast.error("Failed to book appointment");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Patient Dashboard</h2>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Book Appointment</h3>

        <form onSubmit={handleBookAppointment} className="space-y-5">
          {/* Doctor Selection */}
          <div>
            <label className="block text-gray-700 font-medium">Choose a doctor</label>
            <select
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
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

          {/* Date Picker */}
          <div>
            <label className="block text-gray-700 font-medium">Select Date</label>
            <input
              type="date"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          {/* Time Picker */}
          <div>
            <label className="block text-gray-700 font-medium">Select Time</label>
            <input
              type="time"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientDashboard;
