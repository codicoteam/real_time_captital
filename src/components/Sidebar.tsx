import {
  LayoutDashboard,
  Users,
  CreditCard,
  TrendingUp,
  Settings,
  Lock,
  Bell,
  X,
} from "lucide-react";
import { useNavigate, useLocation, type To } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen = true, onClose = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admindashboard" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: CreditCard, label: "Loan Management", path: "/loan-management" },
    { icon: TrendingUp, label: "Loan Tracking", path: "/loan-tracking" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: Users, label: "Chat", path: "/chat" },
    { icon: Settings, label: "Settings", path: "/settingss" },
    { icon: Lock, label: "Collaterals", path: "/collaterals" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: Bell, label: "Notifications", path: "/notification" },
    { icon: Lock, label: "Admin Logout", path: "/Adminlogout" },
  ];

  const handleNavigation = (path: To) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-orange-50/80 via-red-50/70 to-orange-100/80 backdrop-blur-xl border-r border-orange-200/40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0 shadow-2xl overflow-y-auto`}
      >
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-transparent to-red-200/20 animate-pulse"></div>

        {/* Header */}
        <div className="relative flex items-center justify-between h-18 px-6 border-b border-orange-200/40 bg-orange-50/60 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Pocket Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-orange-800 to-red-700 bg-clip-text text-transparent">
                  Pocket.
                </span>
                <div className="text-xs text-orange-600/80 font-medium">
                  Loan Management
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl bg-orange-100/60 hover:bg-orange-200/60 transition-all duration-200 border border-orange-200/50"
          >
            <X className="w-5 h-5 text-orange-700" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative mt-6 px-4 space-y-1.5">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            // Check if current path matches the item path
            const isActive = location.pathname === item.path;

            return (
              <div
                key={index}
                className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-orange-500/90 to-red-500/90 shadow-md shadow-orange-500/20 transform scale-[1.02] backdrop-blur-sm"
                    : "text-orange-800/80 hover:text-orange-900 hover:bg-orange-100/50 hover:transform hover:scale-[1.01]"
                } cursor-pointer`}
                onClick={() => handleNavigation(item.path)}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-red-400 to-orange-500 rounded-r-full shadow-md shadow-orange-400/40"></div>
                )}

                {/* Icon container */}
                <div
                  className={`relative p-2 rounded-lg mr-3 transition-all duration-300 ${
                    isActive
                      ? "bg-white/30 backdrop-blur-sm"
                      : "bg-orange-200/40 group-hover:bg-orange-200/60"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-lg animate-pulse"></div>
                  )}
                </div>

                <span className="relative z-10">{item.label}</span>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-red-400/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:via-red-400/5 group-hover:to-orange-500/10 transition-all duration-500"></div>
              </div>
            );
          })}
        </nav>

        {/* Bottom decoration */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent"></div>
          <div className="mt-3 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-orange-50/70 border border-orange-200/50 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-orange-700/80 font-medium">
                System Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
