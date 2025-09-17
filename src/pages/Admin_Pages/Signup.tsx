import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  User,
  Phone,
  Mail,
  Camera,
  Shield,
} from "lucide-react";
// Note: These imports would be used in your actual project
import { Link, useNavigate } from "react-router-dom";

import SignupAdmin from "../../services/admin_Services/signup_Service";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
  profilePicture: string;
  role: "admin" | "superadmin" | "moderator"; // Changed from string to union type
}

const AdminSignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
    role: "admin",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate(); // This would be used in your actual project

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Calculate password strength
    const calculateStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[a-z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      return strength;
    };

    setPasswordStrength(calculateStrength(formData.password));
  }, [formData.password]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      alert("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      alert("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      alert("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    if (!formData.contactNumber.trim()) {
      alert("Contact number is required");
      return false;
    }
    if (!formData.password) {
      alert("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    if (!formData.profilePicture.trim()) {
      alert("Profile picture URL is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Remove confirmPassword from the data sent to the server
      const { confirmPassword, ...adminData } = formData;

      // Call the admin signup service
      const response = await SignupAdmin(adminData);

      console.log("Admin signup successful:", response);
      alert("Admin account created successfully!");

      // Clear the form after successful signup
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
        profilePicture: "",
        role: "admin",
      });

      navigate("/admindashboard"); // Uncomment when you have routing set up
    } catch (error: any) {
      // Handle different types of errors
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Admin signup failed. Please try again.";

      alert(errorMessage);
      console.error("Admin signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900 flex items-center justify-center p-2 sm:p-4 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm"></div>

        <div className="flex flex-col lg:flex-row relative z-10">
          {/* Left Side - Signup Form */}
          <div className="lg:w-2/3 p-4 sm:p-6 lg:p-12 order-2 lg:order-1">
            <div className="max-w-2xl mx-auto">
              {/* Logo with animation */}
              <div className="flex items-center mb-6 sm:mb-8 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 via-black to-emerald-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Real time capital. Admin
                </span>
              </div>

              {/* Welcome Text */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 animate-fadeIn">
                  Create Admin Account 🛡️
                </h1>
                <p className="text-gray-300 text-sm sm:text-base">
                  Join our administrative team to manage the platform
                </p>
              </div>

              {/* Signup Form */}
              <div className="space-y-4 sm:space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/25"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/25"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/25"
                      />
                    </div>
                  </div>

                {/* Contact Number */}
                <div className="group">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                    <input
                      type="tel"
                      name="contactNumber"
                      placeholder="Contact Number"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/25"
                    />
                  </div>
                </div>

                {/* Profile Picture URL */}
                <div className="group">
                  <div className="relative">
                    <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                    <input
                      type="url"
                      name="profilePicture"
                      placeholder="Profile Picture URL"
                      value={formData.profilePicture}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/25"
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="group">
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/25 appearance-none"
                    >
                      <option value="admin" className="bg-gray-800 text-white">
                        Admin
                      </option>
                      <option
                        value="moderator"
                        className="bg-gray-800 text-white"
                      >
                        Moderator
                      </option>
                      <option
                        value="superadmin"
                        className="bg-gray-800 text-white"
                      >
                        Super Admin
                      </option>
                    </select>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 pr-12 group-hover:bg-white/25"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <div className="relative group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 pr-12 group-hover:bg-white/25"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Password strength:</span>
                      <span
                        className={`font-medium ${
                          passwordStrength <= 1
                            ? "text-red-400"
                            : passwordStrength <= 3
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full bg-gradient-to-r from-green-600 via-black to-emerald-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-green-700 hover:via-black hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Admin Account</span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isHovered ? "translate-x-1" : ""
                        }`}
                      />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 sm:mt-6">
                <div className="text-center text-gray-300 text-sm relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative bg-gradient-to-r from-transparent via-green-900 to-transparent px-4">
                    or
                  </div>
                </div>

                <div className="text-center text-sm text-gray-300 mt-4">
                  Already have an account?
                  <Link
                    to="/"
                    className="text-green-400 font-semibold hover:text-green-300 transition-colors ml-1 hover:underline"
                  >
                    SignIn
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Illustration */}
          <div className="lg:w-1/3 bg-gradient-to-br from-green-900/50 via-black/50 to-emerald-900/50 p-4 sm:p-6 lg:p-12 flex items-center justify-center relative overflow-hidden order-1 lg:order-2 min-h-[300px] lg:min-h-0">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 border border-white transform rotate-45 animate-pulse"></div>
              <div className="absolute top-32 right-16 w-8 h-8 sm:w-12 sm:h-12 border border-white transform rotate-12 animate-pulse delay-500"></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 sm:w-16 sm:h-16 border border-white transform -rotate-12 animate-pulse delay-1000"></div>
              <div className="absolute bottom-32 right-8 w-6 h-6 border border-white rounded-full animate-bounce delay-700"></div>
            </div>

            <div className="text-center relative z-10">
              {/* Enhanced 3D Character Illustration */}
              <div className="mb-6 sm:mb-8 relative group">
                <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto bg-gradient-to-br from-green-500 via-black to-emerald-500 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>

                  {/* Character */}
                  <div className="relative animate-float">
                    <Shield
                      size={80}
                      className="text-white opacity-90 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
                    />
                    <Sparkles
                      size={32}
                      className="text-white absolute -bottom-2 -right-2 animate-pulse lg:w-10 lg:h-10"
                    />
                  </div>

                  {/* Enhanced Floating Elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full opacity-80 animate-bounce delay-200"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-green-400 to-black rounded-full opacity-80 animate-bounce delay-500"></div>
                  <div className="absolute top-1/2 left-4 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-black to-emerald-400 rounded-full opacity-80 animate-bounce delay-700"></div>
                  <div className="absolute top-8 left-1/2 w-2 h-2 bg-white rounded-full opacity-60 animate-ping"></div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 animate-fadeIn">
                Admin Portal Access 🛡️
              </h2>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                Manage the platform with
                <br className="hidden sm:block" />
                administrative privileges
              </p>

              {/* Enhanced Pagination Dots */}
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full opacity-50 animate-pulse delay-500"></div>
                <div className="w-8 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`}
      </style>
    </div>
  );
};

export default AdminSignUp;