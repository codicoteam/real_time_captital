import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/User_Sidebar";
import { IoClose } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { Menu, ChevronDown } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const [showLogout, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    setShowModal(false);
    setTimeout(() => {
      navigate("/userlogin");
    }, 1500); // Wait so toast is visible before redirect
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-green-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-500/5" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-green-100/50 hover:bg-green-200/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-green-600" />
              </button>
              <div className="flex items-center space-x-3">
                <FiLogOut className="w-6 h-6 text-green-600" />
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-500">Dashboard</span>
                  <span className="text-green-300">›</span>
                  <span className="text-green-700 font-medium">Logout</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 pl-4 border-l border-green-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-green-700">
                    John Doe
                  </div>
                  <div className="text-xs text-green-500">User</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <span className="text-white font-semibold text-sm">JD</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm" />
                </div>
                <ChevronDown className="w-4 h-4 text-green-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          <div className="max-w-md w-full">
            {/* Logout Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200/50 p-8 text-center transform hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
                  <FiLogOut className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  Ready to Leave?
                </h2>
                <p className="text-gray-600 text-sm">
                  Click the button below to securely log out of your account
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20"
              >
                <div className="flex items-center justify-center space-x-2">
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </div>
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                You will be redirected to the login page after logout
              </p>
            </div>
          </div>
        </main>

        {/* Logout Modal */}
        {showLogout && (
          <div
            onClick={() => setShowModal(false)}
            className="fixed bg-black/50 backdrop-blur-sm min-h-screen z-50 w-screen flex justify-center items-center top-0 left-0"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-green-200/50 relative max-w-md w-full mx-4 transform animate-pulse"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/25">
                  <FiLogOut className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-black mb-2">
                  Confirm Logout
                </h2>
                <p className="text-gray-600 mb-8 text-sm">
                  Are you sure you want to logout? You will need to sign in
                  again to access your account.
                </p>

                <div className="flex gap-4 w-full">
                  <button
                    onClick={handleConfirm}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20"
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-300 hover:border-gray-400 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/20"
              >
                <IoClose className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Logout;