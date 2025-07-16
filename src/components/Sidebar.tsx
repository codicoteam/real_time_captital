import {
  LayoutDashboard,
  Users,
  CreditCard,
  TrendingUp,
  Settings,
  Lock,
  Bell,
  ChevronRight,
  X,
} from "lucide-react";
import { useNavigate, useLocation, type To } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen = true, onClose = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admindashboard",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Users,
      label: "Users",
      path: "/users",
      color: "from-amber-400 to-orange-400",
    },
    {
      icon: CreditCard,
      label: "Loan Management",
      path: "/loan-management",
      color: "from-amber-300 to-orange-300",
    },
    {
      icon: TrendingUp,
      label: "Loan Tracking",
      path: "/loan-tracking",
      color: "from-amber-400 to-orange-400",
    },
    {
      icon: CreditCard,
      label: "Payments",
      path: "/payments",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Users,
      label: "Chat",
      path: "/chat",
      color: "from-amber-300 to-orange-300",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      color: "from-amber-400 to-orange-400",
    },
    {
      icon: Lock,
      label: "Collaterals",
      path: "/collaterals",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Bell,
      label: "Notifications",
      path: "/notification",
      color: "from-amber-300 to-orange-300",
    },
    {
      icon: Lock,
      label: "Admin Logout",
      path: "/Adminlogout",
      color: "from-amber-600 to-orange-600",
    },
  ];

  const handleNavigation = (path: To) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-sm sm:max-w-xs lg:max-w-sm xl:max-w-md bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 overflow-hidden flex flex-col border-r border-orange-200`}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-orange-100/20 to-amber-100/20"></div>
        <div className="absolute top-10 right-4 w-20 h-20 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-4 w-16 h-16 bg-gradient-to-r from-orange-200/20 to-amber-200/20 rounded-full blur-xl"></div>

        {/* Header */}
        <div className="relative flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-orange-200 bg-white/30 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Pocket Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                Pocket.
              </h1>
              <p className="text-xs text-orange-600/80 font-medium tracking-wide hidden sm:block">
                Loan Management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg bg-orange-100/70 hover:bg-orange-200/70 transition-all duration-200 border border-orange-200/50 group"
          >
            <X className="w-4 h-4 text-orange-700 group-hover:text-orange-800 transition-colors" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-1 sm:space-y-2 scrollbar-hide">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div
                key={index}
                className={`group relative flex items-center px-3 sm:px-4 py-3 sm:py-4 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} shadow-lg shadow-orange-400/20 scale-[1.02] text-white`
                    : "hover:bg-orange-100/50 hover:scale-[1.02] text-orange-800"
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                {/* Active background glow */}
                {isActive && (
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-20 blur-lg`}
                  />
                )}

                {/* Icon */}
                <div
                  className={`relative p-2 sm:p-2.5 rounded-lg mr-3 sm:mr-4 transition-all duration-300 flex-shrink-0 ${
                    isActive
                      ? "bg-white/20 backdrop-blur-sm shadow-md"
                      : "bg-orange-100/70 group-hover:bg-orange-200/50"
                  }`}
                >
                  <IconComponent
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                      isActive ? "text-white" : "text-orange-700"
                    }`}
                  />
                </div>

                {/* Text content */}
                <div className="flex-1 relative z-10 min-w-0">
                  <div
                    className={`font-semibold text-sm sm:text-base truncate ${
                      isActive ? "text-white" : "text-orange-800"
                    }`}
                  >
                    {item.label}
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${
                    isActive
                      ? "text-white opacity-100 translate-x-1"
                      : "text-orange-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                  }`}
                />

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </nav>

        {/* Footer status */}
        <div className="relative px-4 pb-4 flex-shrink-0">
          <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent mb-4"></div>
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-orange-100/60 border border-orange-200/50 backdrop-blur-sm">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse delay-300"></div>
              </div>
              <span className="text-xs sm:text-sm text-orange-800 font-medium">
                System Online
              </span>
            </div>
          </div>
        </div>

        {/* Decorative lines */}
        <div className="absolute top-1/2 right-0 w-px h-16 sm:h-24 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-orange-400/30 to-transparent"></div>
      </aside>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;