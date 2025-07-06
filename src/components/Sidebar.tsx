import {
  LayoutDashboard,
  Users,
  CreditCard,
  TrendingUp,
  Settings,
  
  X,
} from "lucide-react";
import { useNavigate, useLocation, type To } from "react-router-dom";

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
        <div className="relative flex items-center justify-between h-20 px-8 border-b border-orange-200/40 bg-orange-50/60 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-500/25 flex items-center justify-center">
                <div className="w-6 h-6 rounded-lg bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse shadow-lg shadow-orange-400/50"></div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-800 to-red-700 bg-clip-text text-transparent">
                Pocket
              </span>
              <div className="text-xs text-orange-600/80 font-medium">
                Loan Management
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
        <nav className="relative mt-8 px-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            // Check if current path matches the item path
            const isActive = location.pathname === item.path;

            return (
              <div
                key={index}
                className={`group relative flex items-center px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-orange-500/90 to-red-500/90 shadow-lg shadow-orange-500/25 transform scale-105 backdrop-blur-sm"
                    : "text-orange-800/80 hover:text-orange-900 hover:bg-orange-100/50 hover:transform hover:scale-105"
                } cursor-pointer`}
                onClick={() => handleNavigation(item.path)}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-red-400 to-orange-500 rounded-r-full shadow-lg shadow-orange-400/50"></div>
                )}

                {/* Icon container */}
                <div
                  className={`relative p-2 rounded-xl mr-4 transition-all duration-300 ${
                    isActive
                      ? "bg-white/30 backdrop-blur-sm"
                      : "bg-orange-200/40 group-hover:bg-orange-200/60"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-xl animate-pulse"></div>
                  )}
                </div>

                <span className="relative z-10">{item.label}</span>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-red-400/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:via-red-400/5 group-hover:to-orange-500/10 transition-all duration-500"></div>
              </div>
            );
          })}
        </nav>

        {/* Bottom decoration */}
        <div className="absolute bottom-8 left-4 right-4">
          <div className="h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent"></div>
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-orange-50/70 border border-orange-200/50 backdrop-blur-sm">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
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
