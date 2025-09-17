import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Laptop, Sparkles, ArrowRight } from "lucide-react";
import loginUser from "../../services/user_Services/login_Service";
import { Link, useNavigate } from "react-router-dom";

const Userlogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

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
      const response = await loginUser(formData);

      // Safely handle API response
      if (!response) {
        throw new Error("No response from server");
      }

      // Extract token and user safely
      const token = response?.token;
      const user = response?.user || {};

      if (token) {
        localStorage.setItem("userToken", token);
      }

      console.log("Login success:", { token, user });

      // If user info exists, log it safely
      if (user?.name) {
        console.log("Welcome:", user.name);
      }

      navigate("/userdashboard");
    } catch (error: any) {
      console.error("Login failed:", error?.message || error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    alert("Google login would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 flex items-center justify-center p-2 sm:p-4 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
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

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm"></div>

        <div className="flex flex-col lg:flex-row relative z-10">
          {/* Left Side - Login Form */}
          <div className="lg:w-1/2 p-4 sm:p-6 lg:p-12 order-2 lg:order-1">
            <div className="max-w-md mx-auto">
              {/* Logo with animation */}
              <div className="flex items-center mb-6 sm:mb-8 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 via-emerald-500 to-lime-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Real time capital.
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
                    className="w-full px-4 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/25"
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
                    className="w-full px-4 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 pr-12 group-hover:bg-white/25"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-gray-300 hover:text-green-400 transition-colors duration-200 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-green-700 hover:via-emerald-700 hover:to-lime-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 group"
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
                <div className="text-center text-gray-300 text-sm relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative bg-gradient-to-r from-transparent via-green-900 to-transparent px-4">
                    or continue with
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full mt-4 bg-white/20 backdrop-blur-sm border border-white/30 py-3 sm:py-4 rounded-xl font-medium text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-3 group hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>

                <div className="text-center text-sm text-gray-300 mt-4">
                  Don't have an account?
                  <Link
                    to="/usersignup"
                    className="text-green-400 font-semibold hover:text-green-300 transition-colors ml-1 hover:underline"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="lg:w-1/2 bg-gradient-to-br from-gray-900/50 via-black/50 to-green-900/50 p-4 sm:p-6 lg:p-12 flex items-center justify-center relative overflow-hidden order-1 lg:order-2 min-h-[300px] lg:min-h-0">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 border border-white transform rotate-45 animate-pulse"></div>
              <div className="absolute top-32 right-16 w-8 h-8 sm:w-12 sm:h-12 border border-white transform rotate-12 animate-pulse delay-500"></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 sm:w-16 sm:h-16 border border-white transform -rotate-12 animate-pulse delay-1000"></div>
              <div className="absolute bottom-32 right-8 w-6 h-6 border border-white rounded-full animate-bounce delay-700"></div>
            </div>

            <div className="text-center relative z-10">
              {/* Character Illustration */}
              <div className="mb-6 sm:mb-8 relative group">
                <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto bg-gradient-to-br from-green-500 via-emerald-500 to-lime-500 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>

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

                  <div className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-lime-400 to-green-400 rounded-full opacity-80 animate-bounce delay-200"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-80 animate-bounce delay-500"></div>
                  <div className="absolute top-1/2 left-4 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-emerald-400 to-lime-400 rounded-full opacity-80 animate-bounce delay-700"></div>
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

              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-8 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
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

export default Userlogin;