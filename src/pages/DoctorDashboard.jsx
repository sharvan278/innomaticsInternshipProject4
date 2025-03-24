import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("Appointments Data:", response.data);
      setAppointments(response.data);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      console.log("Updating appointment ID:", appointmentId); // Debugging statement
  
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
  
      toast.success("Appointment status updated");
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error.response?.data || error.message);
      toast.error("Failed to update appointment status");
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Doctor Dashboard</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Welcome, Dr. {user?.name}</h3>
        <p className="text-gray-600">Specialization: {user?.specialization}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
        {appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment?.patientId?.name || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(appointment.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.timeSlot}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.status === 'pending' && (
                        <div className="space-x-2">
                          <button
                            onClick={() => updateAppointmentStatus(appointment._id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment._id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No appointments found</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
