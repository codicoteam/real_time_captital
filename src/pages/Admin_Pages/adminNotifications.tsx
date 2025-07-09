import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AdminBell from "../../components/Adminbell"; // The bell component we created
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface NotificationItem {
  id: number;
  text: string;
  read: boolean;
  time?: string;
}

const AdminNotifications: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching notifications, replace with real API call
    setTimeout(() => {
      setNotifications([
        { id: 1, text: "New user registered", read: false, time: "2m ago" },
        { id: 2, text: "Loan approved", read: true, time: "1h ago" },
        { id: 3, text: "Support message received", read: false, time: "3h ago" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewAllFromBell = () => {
    // If needed, this can scroll the page or navigate, but here we do nothing
    // Because we are already on the notifications page
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-orange-200/50 px-6 py-4 relative flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="w-6 h-6 text-orange-600" />
            <h1 className="text-orange-700 font-bold text-lg">Admin Notifications</h1>
          </div>

          {/* Bell with dropdown */}
          <AdminBell notifications={notifications} onViewAll={handleViewAllFromBell} />
        </header>

        {/* Main Notifications List */}
        <main className="flex-1 p-6 max-w-4xl mx-auto overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xl font-semibold text-gray-600">Loading...</div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-600">
              <CheckCircleIcon
                className="w-16 h-16 text-orange-400 mb-4 opacity-80 transition-opacity duration-500 hover:opacity-100"
              />
              <p className="text-lg font-medium">You've caught up with everything</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`p-4 rounded shadow ${
                    n.read ? "bg-white text-gray-600" : "bg-blue-50 text-gray-900 font-semibold"
                  }`}
                >
                  <p className="text-lg">{n.text}</p>
                  {n.time && <span className="text-xs text-gray-400 mt-2 block">{n.time}</span>}
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminNotifications;
