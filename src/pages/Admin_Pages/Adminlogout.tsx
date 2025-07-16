import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu, ChevronDown } from 'lucide-react';


type ConfirmLogoutModalProps = {
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmLogoutModal: React.FC<ConfirmLogoutModalProps> = ({ onConfirm, onClose }) => (
  <div
    onClick={onClose}
    className="fixed bg-black/50 min-h-screen z-50 w-screen flex justify-center items-center top-0 left-0"
    aria-modal="true"
    role="dialog"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-6 rounded relative"
    >
      <div className="flex flex-col gap-4 max-w-[400px]">
        <h2 className="text-xl font-bold">Logout</h2>
        <p className="text-gray-700">Are you sure you want to logout?</p>
        <div className="flex gap-4 mt-5">
          <button
            onClick={onConfirm}
            className="bg-orange-500 text-white px-4 py-2 hover:bg-gray-600"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-4 py-2 hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
      <div
        onClick={onClose}
        className="absolute top-2 right-2 cursor-pointer"
        aria-label="Close modal"
      >
        <IoClose size={30} />
      </div>
    </div>
  </div>
);

const Logout: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);

  const handleConfirm = () => {
    localStorage.clear();
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/adminlogin');
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-orange-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-orange-100/50 hover:bg-orange-200/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-orange-600" />
              </button>
              <div className="flex items-center space-x-3">
                <FiLogOut className="w-6 h-6 text-orange-600" />
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-orange-500">Dashboard</span>
                  <span className="text-orange-300">›</span>
                  <span className="text-orange-700 font-medium">Logout</span>
                </div>
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">
              <div
                onClick={() => setShowModal(true)}
                 className="cursor-pointer max-w-sm mx-auto mt-5 bg-white rounded-xl shadow-lg hover:shadow-xl p-4 flex flex-col items-center space-y-4 transition"
                 >
                  <span className="text-xl font-semibold text-orange-700"><FiLogOut size={2} className="text-red-500" />Click To Logout</span>
              </div>
            </main>
          </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-orange-700">Sarah Johnson</div>
                <div className="text-xs text-orange-500">Administrator</div>
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <span className="text-white font-semibold text-sm">SJ</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
              </div>
              <ChevronDown className="w-4 h-4 text-orange-400" />
            </div>
          </div>
        </header>

     
      </div>

      {showModal && (
        <ConfirmLogoutModal onConfirm={handleConfirm} onClose={handleClose} />
      )}

      <ToastContainer position="top-right" autoClose={1500} hideProgressBar />
    </div>
  );
};

export default Logout;
