import React from "react";
import { Star, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the logo from assets
import Loan from "../assets/loan.png";

interface FooterProps {
  isDarkMode: boolean;
  themeClasses: {
    cardBg: string;
    border: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    glowEffect: string;
  };
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, themeClasses }) => {
  const navigate = useNavigate();

  return (
    <footer
      className={`${themeClasses.cardBg} backdrop-blur-xl border-t ${themeClasses.border} py-16`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <div className="flex items-center mb-6">
              {/* Logo from assets */}
<img
                   src={Loan}
                   alt="Clear Finance Logo"
                 className="h-35 w-auto mt-12 ml-0 mr-auto"
                  />
              <span
                className={`ml-0 text-3xl font-bold ${
                  isDarkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                Clear Finance
              </span>
            </div>
            <p
              className={`${themeClasses.textSecondary} mb-6 max-w-md leading-relaxed`}
            >
              Revolutionizing financial services through innovative technology.
            </p>
            <div className="flex flex-col space-y-2">
              {[
                { icon: <Star className="w-5 h-5" />, label: "4.9 Rating" },
                {
                  icon: <Shield className="w-5 h-5" />,
                  label: "Bank-Level Security",
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  label: "24/7 Support",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 ${themeClasses.textMuted} text-sm`}
                >
                  <div className="text-green-500">{item.icon}</div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-6`}>
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className={`${themeClasses.textSecondary} hover:${themeClasses.text} hover:text-green-500 transition-colors`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-6`}>
              Services
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Business Loans", path: "/services/business" },
                { name: "Salary Based Loans", path: "/services/salary" },
                { name: "Asset Finance", path: "/services/asset" },
                { name: "Pensioner Loans", path: "/services/pensioner" },
              ].map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(service.path)}
                    className={`${themeClasses.textSecondary} hover:${themeClasses.text} hover:text-green-500 transition-colors`}
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-6`}>
              Contact & Get Started
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => navigate("/userlogin")}
                  className={`${themeClasses.textSecondary} hover:${themeClasses.text} hover:text-green-500 transition-colors`}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/usersignup")}
                  className={`${themeClasses.textSecondary} hover:${themeClasses.text} hover:text-green-500 transition-colors`}
                >
                  Sign Up
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className={`${themeClasses.textSecondary} hover:${themeClasses.text} hover:text-green-500 transition-colors`}
                >
                  Contact Support
                </button>
              </li>
              <li>
                <span className={`${themeClasses.textMuted} text-sm`}>
                  Email: sales@clearfinace.co.zw
                </span>
              </li>
              <li>
                <span className={`${themeClasses.textMuted} text-sm`}>
                  Phone: +263 78 969 3725 or +263 71 506 3418
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t ${themeClasses.border} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}
        >
          <p className={`${themeClasses.textMuted} text-sm`}>
            © 2025 Clear Finance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;