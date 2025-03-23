import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, Calendar, Users } from "lucide-react";
import "./Home.css";

// Ensure images are correctly imported
import apollo from "../assets/apollo.png";
import fortis from "../assets/fortis.jpg";
import manipal from "../assets/manipal.jpg";
import aiims from "../assets/aiims.jpg";
import max from "../assets/max.webp";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Function to navigate based on user role
  const handleNavigation = (route) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate(route);
    }
  };

  const features = [
    {
      icon: <Stethoscope className="w-12 h-12 text-blue-500" />,
      title: "Expert Doctors",
      description: "Connect with qualified healthcare professionals",
      route: "/doctors",
    },
    {
      icon: <Calendar className="w-12 h-12 text-blue-500" />,
      title: "Easy Scheduling",
      description: "Book appointments at your convenience",
      route: user?.role === "patient" ? "/patient/dashboard" : "/login",
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Patient Care",
      description: "Receive personalized medical attention",
      route: user?.role === "patient" ? "/patient/dashboard" : "/login",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Healthcare Booking System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your trusted platform for managing medical appointments
        </p>
        {!isAuthenticated && (
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 px-6 py-3"
            >
              Sign In
            </Link>
          </div>
        )}
      </section>

      <section className="grid md:grid-cols-3 gap-8 py-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => handleNavigation(feature.route)}
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Footer with images */}
      <Footer />
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer py-8">
      <h3 className="text-lg font-semibold text-center my-4">Our Trusted Partners</h3>
      <div className="partners-carousel flex flex-wrap justify-center gap-6">
        <img src={apollo} alt="Apollo Hospitals" className="w-36 h-24 object-cover rounded-md shadow-md hover:scale-110 transition-all" />
        <img src={fortis} alt="Fortis Healthcare" className="w-36 h-24 object-cover rounded-md shadow-md hover:scale-110 transition-all" />
        <img src={manipal} alt="Manipal Hospitals" className="w-36 h-24 object-cover rounded-md shadow-md hover:scale-110 transition-all" />
        <img src={aiims} alt="AIIMS" className="w-36 h-24 object-cover rounded-md shadow-md hover:scale-110 transition-all" />
        <img src={max} alt="Max Healthcare" className="w-36 h-24 object-cover rounded-md shadow-md hover:scale-110 transition-all" />
      </div>

      <div className="copyright">
        &copy; {new Date().getFullYear()} Healthcare Booking. All rights reserved.
      </div>
    </footer>
  );
};

export default Home;
