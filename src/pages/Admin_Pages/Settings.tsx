import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Settings as SettingsIcon,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import SystemSettings from "../../components/settingspage_components/system_settings";
import LoanProducts from "../../components/settingspage_components/loan_products";
import WorkflowManagement from "../../components/settingspage_components/workflow_management";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const userName = localStorage.getItem('userName');
  const [, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
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
                <SettingsIcon className="w-6 h-6 text-green-600" />
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-500">Dashboard</span>
                  <span className="text-green-300">›</span>
                  <span className="text-green-700 font-medium">Settings</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                <input
                  type="text"
                  placeholder="Search settings..."
                  className="pl-10 pr-4 py-2 w-64 bg-green-100/50 border border-green-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-200"
                />
              </div>

              {/* Notifications with Dropdown */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className="relative p-2 rounded-xl bg-green-100/50 hover:bg-green-200/50 transition-all duration-200 group"
                >
                  <Bell className="w-5 h-5 text-green-600 group-hover:text-green-700" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">3</span>
                  </div>
                </button>

                
                
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-4 border-l border-green-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-green-700">
                   {userName}
                  </div>
                  <div className="text-xs text-green-500">Administrator</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <span className="text-white font-semibold text-sm">SJ</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown className="w-4 h-4 text-green-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Settings Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              System Settings
            </h1>
            <p className="text-green-600">
              Configure your loan management system
            </p>
          </div>

          {/* System Settings */}
          <SystemSettings />

          {/* Loan Products */}
          <LoanProducts />

          {/* Workflow Management */}
          <WorkflowManagement />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Settings;