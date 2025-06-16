import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Laptop, Sparkles, ArrowRight } from "lucide-react";
import loginAdmin from "../../services/admin_Services/login";
import { Link, useNavigate } from "react-router-dom";

const Adminlogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Add this inside your component

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginAdmin(formData);
      console.log("Login success:", response);
      navigate("/admindashboard"); // Change to your actual page
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-amber-900 flex items-center justify-center p-2 sm:p-4 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
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

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm"></div>

        <div className="flex flex-col lg:flex-row relative z-10">
          {/* Left Side - Login Form */}
          <div className="lg:w-1/2 p-4 sm:p-6 lg:p-12 order-2 lg:order-1">
            <div className="max-w-md mx-auto">
              {/* Logo with animation */}
              <div className="flex items-center mb-6 sm:mb-8 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 via-red-500 to-amber-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Pocket.
                </span>
              </div>

              {/* Welcome Text */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 animate-fadeIn">
                  Welcome Back! 👋
                </h1>
                <p className="text-gray-300 text-sm sm:text-base">
                  Ready to manage your finances like a pro?
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                  />
                </div>

                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 pr-12 group-hover:bg-white/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-orange-700 hover:via-red-700 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isHovered ? "translate-x-1" : ""
                        }`}
                      />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 sm:mt-6">
                <div className="text-center text-gray-400 text-sm relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative bg-gradient-to-r from-transparent via-orange-900 to-transparent px-4">
                    or continue with
                  </div>
                </div>

                <div className="text-center text-sm text-gray-400 mt-4">
                  Don't have an account?
                  <Link
                    to="/adminsignup"
                    className="text-orange-400 font-semibold hover:text-orange-300 transition-colors ml-1 hover:underline"
                  >
                    SignUp
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Illustration */}
          <div className="lg:w-1/2 bg-gradient-to-br from-orange-900/50 via-red-900/50 to-amber-900/50 p-4 sm:p-6 lg:p-12 flex items-center justify-center relative overflow-hidden order-1 lg:order-2 min-h-[300px] lg:min-h-0">
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
                <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto bg-gradient-to-br from-orange-500 via-red-500 to-amber-500 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>

                  {/* Character */}
                  <div className="relative animate-float">
                    <User
                      size={80}
                      className="text-white opacity-90 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
                    />
                    <Laptop
                      size={32}
                      className="text-white absolute -bottom-2 -right-2 animate-pulse lg:w-10 lg:h-10"
                    />
                  </div>

                  {/* Enhanced Floating Elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80 animate-bounce delay-200"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-80 animate-bounce delay-500"></div>
                  <div className="absolute top-1/2 left-4 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-red-400 to-amber-400 rounded-full opacity-80 animate-bounce delay-700"></div>
                  <div className="absolute top-8 left-1/2 w-2 h-2 bg-white rounded-full opacity-60 animate-ping"></div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 animate-fadeIn">
                Manage Money Anywhere ✨
              </h2>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                Experience seamless financial management
                <br className="hidden sm:block" />
                with our cutting-edge platform
              </p>

              {/* Enhanced Pagination Dots */}
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-8 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full opacity-50 animate-pulse delay-500"></div>
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

export default Adminlogin;
