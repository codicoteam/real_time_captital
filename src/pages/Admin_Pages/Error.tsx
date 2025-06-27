import { useState, useEffect } from "react";
import {
  Home,
  ArrowLeft,
  Clock,
  Search,
  Menu,
  Bell,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

// Mock Sidebar component since we can't import external files

const Error = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setRedirecting(true);
      // In a real app, you would redirect here
      // window.location.href = "/dashboard";
    }
  }, [countdown]);

  const handleGoHome = () => {
    setRedirecting(true);
    // In a real app, you would navigate here
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-green-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-green-100/50 hover:bg-green-200/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-green-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-slate-500">Error</span>
                  <span className="text-slate-300">›</span>
                  <span className="text-slate-700 font-medium">
                    Page Not Found
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  className="pl-10 pr-4 py-2 w-64 bg-green-100/50 border border-green-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-200"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl bg-green-100/50 hover:bg-green-200/50 transition-all duration-200 group">
                <Bell className="w-5 h-5 text-green-600 group-hover:text-green-700" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">5</span>
                </div>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-4 border-l border-green-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-slate-700">
                    Pastor David
                  </div>
                  <div className="text-xs text-slate-500">Senior Pastor</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <span className="text-white font-semibold text-sm">PD</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* 404 Content */}
        <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 border border-green-500/20 rounded-full"></div>
            <div className="absolute top-40 right-32 w-24 h-24 border border-emerald-500/15 rounded-full"></div>
            <div className="absolute bottom-32 left-1/3 w-16 h-16 border border-green-400/10 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 border border-green-300/8 rounded-full"></div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-10 right-10 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
          <div className="absolute bottom-10 left-10 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>

          <div className="max-w-2xl mx-auto text-center relative">
            {/* 404 Number */}
            <div className="relative mb-8">
              <div className="text-9xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-2xl">
                404
              </div>
              <div className="absolute inset-0 text-9xl font-bold text-green-200/20 blur-sm">
                404
              </div>
            </div>

            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full shadow-lg">
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50 mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">
                Oops! Page Not Found
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
                The page you're looking for seems to have wandered off from the
                flock. Don't worry, we'll help you find your way back to the
                sanctuary.
              </p>

              {/* Countdown Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200/50">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-slate-800">
                    Auto Redirect
                  </h3>
                </div>

                {!redirecting ? (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {countdown}
                    </div>
                    <p className="text-sm text-slate-600">
                      Redirecting to dashboard in {countdown} seconds...
                    </p>

                    {/* Countdown Progress Bar */}
                    <div className="w-full bg-green-200/50 rounded-full h-2 mt-4">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 text-green-600">
                      <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-medium">Redirecting...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={handleGoHome}
                  className={`group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105 flex items-center space-x-2 ${
                    redirecting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={redirecting}
                >
                  <Home className="w-5 h-5" />
                  <span>Go to Dashboard</span>
                </button>

                <button
                  onClick={handleGoBack}
                  className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg border border-green-200/50 hover:border-green-300/50 flex items-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Go Back</span>
                </button>
              </div>
            </div>

            {/* Help Text */}
            <p className="text-sm text-slate-500">
              If you believe this is an error, please contact your system
              administrator or
              <span className="text-green-600 font-medium hover:text-green-700 cursor-pointer">
                {" "}
                report this issue
              </span>
              .
            </p>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Error;
