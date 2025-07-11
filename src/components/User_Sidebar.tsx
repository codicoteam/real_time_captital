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
      subtitle: "Loan Overview",
      path: "/userdashboard",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: FileText,
      label: "Loan Application",
      subtitle: "Apply & Manage",
      path: "/loan_application",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: CreditCard,
      label: "Payment",
      subtitle: "Transactions",
      path: "/payment",
      color: "from-orange-500 to-red-600",
    },

    {
      icon: User,
      label: "Chart",
      subtitle: "chart",
      path: "/chart",
      color: "from-orange-500 to-pink-600",
    },
    {
      icon: User,
      label: "My Customers",
      subtitle: "agent customers",
      path: "/customer",
      color: "from-orange-500 to-pink-600",
    },
    {
      icon: Bell,
      label: "Notifications",
      subtitle: "Check what's new",
      path: "/Notifications",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: User,
      label: "Account",
      subtitle: "Profile & Settings",
      path: "/account",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Lock,
      label: "Logout",
      subtitle: "Logout your account",
      path: "/Logout",
      color: "from-purple-500 to-pink-600",
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-700 ease-out lg:translate-x-0 lg:static lg:inset-0 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-blue-600/20 via-transparent to-transparent"></div>
        <div className="absolute top-20 right-8 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-6 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>

        <div className="relative flex items-center justify-between h-20 px-6 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Pocket Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Pocket.
                </h1>
                <p className="text-xs text-slate-400 font-medium tracking-wide">
                  Financial Solutions
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300 border border-slate-600/50 group"
          >
            <X className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
          </button>
        </div>

        <nav className="relative mt-8 px-5 space-y-2">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div
                key={index}
                className={`group relative flex items-center px-5 py-4 rounded-xl transition-all duration-300 cursor-pointer transform ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} shadow-lg shadow-blue-500/20 scale-[1.02] translate-x-1`
                    : "hover:bg-slate-700/40 hover:scale-[1.01] hover:translate-x-0.5"
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                {isActive && (
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-10 blur-sm animate-pulse`}
                  />
                )}
                <div
                  className={`relative p-2.5 rounded-lg mr-4 transition-all duration-300 ${
                    isActive
                      ? "bg-white/20 backdrop-blur-sm shadow-md"
                      : "bg-slate-700/40 group-hover:bg-slate-600/40"
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-slate-300 group-hover:text-white"
                    }`}
                  />
                </div>

                <div className="flex-1 relative z-10">
                  <div
                    className={`font-medium text-base ${
                      isActive
                        ? "text-white"
                        : "text-slate-200 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </div>
                  <div
                    className={`text-sm ${
                      isActive
                        ? "text-white/70"
                        : "text-slate-400 group-hover:text-slate-300"
                    }`}
                  >
                    {item.subtitle}
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-all duration-300 ${
                    isActive
                      ? "text-white opacity-100 translate-x-0.5"
                      : "text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                  }`}
                />

                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-4"></div>
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 backdrop-blur-xl">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-150"></div>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-300"></div>
              </div>
              <span className="text-xs text-slate-300 font-medium">
                All Systems Online
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-px h-24 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>
      </aside>
    </>
  );
};

export default Sidebar;
