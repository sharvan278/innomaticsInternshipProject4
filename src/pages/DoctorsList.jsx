import React from "react";
import { User } from "lucide-react"; // Importing icon

const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    description: "Expert in heart-related diseases with 15+ years of experience.",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Neurologist",
    description: "Specialist in treating disorders of the nervous system.",
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    specialty: "Dermatologist",
    description: "Experienced in skin treatments and cosmetic procedures.",
  },
];

const DoctorsList = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Our Expert Doctors
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {doctor.name}
                </h2>
                <p className="text-blue-500 font-medium">{doctor.specialty}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">{doctor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
