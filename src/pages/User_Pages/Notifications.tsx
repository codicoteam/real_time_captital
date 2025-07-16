// src/pages/user/NotificationsPage.tsx

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/User_Sidebar';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Menu, ChevronDown } from 'lucide-react';
import {
  listenToNotifications,
  markAllNotificationsAsRead,
  type Notification,
} from '../../services/notificationsApi';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToNotifications((data) => {
      setNotifications(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-blue-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-500/5" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-blue-100/50 hover:bg-blue-200/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-blue-600" />
              </button>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-500">Dashboard</span>
                  <span className="text-blue-300">›</span>
                  <span className="text-blue-700 font-medium">Notifications</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 pl-4 border-l border-blue-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-blue-700">User</div>
                  <div className="text-xs text-blue-500">Client</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <span className="text-white font-semibold text-sm">U</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm" />
                </div>
                <ChevronDown className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 max-w-4xl mx-auto overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xl font-semibold text-gray-600">Loading...</div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6"> {/* Added mb-6 for bottom margin */}
                <h1 className="text-2xl font-bold text-blue-700">Notifications</h1>
                <div className="ml-4"> {/* Added margin-left to create space */}
                  <button
                    onClick={handleMarkAllAsRead}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Mark All as Read
                  </button>
                </div>
              </div>

              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-600">
                  <CheckCircleIcon className="w-16 h-16 text-blue-400 mb-4" />
                  <p className="text-lg font-medium">You've caught up with everything</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={`p-4 rounded-lg shadow ${
                        n.read
                          ? 'bg-white text-gray-600 border border-blue-100'
                          : 'bg-blue-50 text-gray-900 font-medium border-l-4 border-blue-500'
                      }`}
                    >
                      <h3 className="text-lg">{n.title}</h3>
                      <p className="text-sm mt-1">{n.description}</p>
                      <span className="text-xs text-blue-400 mt-2 block">{n.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;