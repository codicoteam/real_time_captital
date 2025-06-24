import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/User_Sidebar';
import { IoClose } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';

const Logout = () => {
  const [showLogout, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.clear();
    navigate("/userlogin");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Centered main content */}
      <div className="flex-1 flex justify-center items-center ">
        <div
          onClick={() => setShowModal(true)}
          className="cursor-pointer p-6 bg-gray-100 rounded shadow-md hover:bg-gray-200 text-3xl"
        >
          <div className="text-red-500 hover:text-red-700">
          <FiLogOut size={50} />
          </div>
          Click To Proceed
        </div>

        {/* Modal */}
        {showLogout && (
          <div
            onClick={() => setShowModal(false)}
            className="fixed bg-black/50 min-h-screen z-50 w-screen flex justify-center items-center top-0 left-0"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded relative "
            >
              <div className="flex flex-col gap-4 max-w-[400px]">
                <h2 className="text-xl font-bold">Logout</h2>
                <p className="text-gray-700">Are you sure you want to logout?  </p>
                <div className="flex gap-4 mt-5">
                  <button
                    onClick={handleConfirm}
                    className="bg-orange-500 text-white px-4 py-2 hover:bg-gray-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-orange-500 text-white px-4 py-2 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 cursor-pointer"
              >
                <IoClose size={30} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
