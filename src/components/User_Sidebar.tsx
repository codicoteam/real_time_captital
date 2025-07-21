import {
  LayoutDashboard,
  FileText,
  CreditCard,
  User,
  ChevronRight,
  X,
  Lock,
  Bell,
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
      path: "/userdashboard",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: FileText,
      label: "Loan Application",
      path: "/loan_application",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: CreditCard,
      label: "Payment",
      path: "/payment",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: User,
      label: "Chat",
      path: "/chart",
      color: "from-orange-500 to-pink-600",
    },
    {
      icon: User,
      label: "My Customers",
      path: "/customer",
      color: "from-orange-500 to-pink-600",
    },
    {
      icon: Bell,
      label: "Notifications",
      path: "/usernotifications",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: User,
      label: "Account",
      path: "/account",
      color: "from-orange-500 to-red-600",
    },

    {
      icon: Lock,
      label: "Logout",
      path: "/logout",
      color: "from-orange-500 to-red-600",
    },
  ];

  const handleNavigation = (path: To) => {
    navigate(path);
    onClose(); // Always close sidebar on navigation for mobile
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 overflow-hidden flex flex-col border-r border-gray-200`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Pocket Logo"
              className="w-8 h-8 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-gray-800">Pocket.</h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                Financial Solutions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 border border-gray-300 group"
          >
            <X className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-hide">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div
                key={index}
                className={`group relative flex items-center px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} shadow-lg shadow-orange-500/20`
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                {/* Icon */}
                <div
                  className={`relative p-2 rounded-lg mr-3 transition-all duration-300 ${
                    isActive ? "bg-white/20 backdrop-blur-sm" : "bg-transparent"
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 group-hover:text-gray-800"
                    }`}
                  />
                </div>

                {/* Text content */}
                <div className="flex-1 relative z-10 min-w-0">
                  <div
                    className={`font-medium text-sm ${
                      isActive
                        ? "text-white"
                        : "text-gray-700 group-hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-300 ${
                    isActive
                      ? "text-white opacity-100 translate-x-0.5"
                      : "text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                  }`}
                />
              </div>
            );
          })}
        </nav>

        {/* Footer status */}
        <div className="relative px-4 pb-4 flex-shrink-0">
          <div className="h-px bg-gray-200 mb-4"></div>
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-150"></div>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-300"></div>
              </div>
              <span className="text-xs text-gray-600 font-medium">
                All Systems Online
              </span>
            </div>
          </div>
        </div>
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
