import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Trash2,
  Shield,
  Search,
  Filter,
  Menu,
  Bell,
  ChevronDown,
  MoreVertical,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  UserCheck,
  Loader2,
  X,
} from "lucide-react";
import UserService from "../../services/admin_Services/user_Service";
import UserDetailsModal from "../../components/user_component/view_User";
import Sidebar from "../../components/Sidebar";

interface User {
  _id: string;
  id?: string | number;
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture?: string;
  role?: string;
  status?: string;
  avatar?: string;
  lastLogin?: string;
  permissions?: string[];
  joinDate?: string;
  totalLoans?: number;
  createdAt: string;
  updatedAt: string;
}

const UserManagement = () => {
  const userName = localStorage.getItem("userName");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);

  // Sample notifications data
  const [notifications] = useState([
    {
      id: 1,
      title: "New User Registration",
      message: "John Doe has registered as a new borrower",
      time: "10 minutes ago",
      read: false,
      type: "user",
    },
    {
      id: 2,
      title: "Account Update",
      message: "Sarah Johnson updated her profile information",
      time: "2 hours ago",
      read: false,
      type: "update",
    },
    {
      id: 3,
      title: "System Maintenance",
      message: "Scheduled maintenance this weekend",
      time: "1 day ago",
      read: true,
      type: "system",
    },
  ]);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        !target.closest(".notifications-popup") &&
        !target.closest(".notification-bell")
      ) {
        setNotificationsOpen(false);
      }

      if (
        !target.closest(".filters-popup") &&
        !target.closest(".filters-button")
      ) {
        setFiltersOpen(false);
      }

      if (
        !target.closest(".add-user-popup") &&
        !target.closest(".add-user-button")
      ) {
        setAddUserOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await UserService.getAllUsers();

        const transformedUsers =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response.data?.map((user: any) => ({
            _id: user._id || user.id,
            id: user.id || user._id,
            firstName: user.firstName || user.name?.split(" ")[0] || "",
            lastName: user.lastName || user.name?.split(" ")[1] || "",
            name: user.name || `${user.firstName} ${user.lastName}`.trim(),
            email: user.email,
            phoneNumber: user.phoneNumber || user.phone || "Not provided",
            address: user.address || "Not provided",
            profilePicture: user.profilePicture || user.avatar,
            role: user.role || "User",
            status: user.status || (user.isActive ? "Active" : "Inactive"),
            avatar: getInitials(user.name || user.fullName || user.email),
            lastLogin: user.lastLogin || user.lastLoginAt || "Never",
            permissions: user.permissions || [],
            joinDate:
              user.joinDate || user.createdAt?.split("T")[0] || "Unknown",
            totalLoans: user.totalLoans || user.loansCount || 0,
            createdAt: user.createdAt || new Date().toISOString(),
            updatedAt: user.updatedAt || new Date().toISOString(),
          })) || [];
        setUsers(transformedUsers);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error fetching users:", err);
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Helper function to generate initials from name
  const getInitials = (name: string): string => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Calculate user stats from actual data
  const userStats = [
    {
      label: "Total Users",
      value: users.length.toString(),
      trend: "+3",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      icon: Users,
    },
    {
      label: "Active Users",
      value: users.filter((user) => user.status === "Active").length.toString(),
      trend: "+2",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      icon: UserCheck,
    },
    {
      label: "Pending Approval",
      value: users
        .filter((user) => user.status === "Pending")
        .length.toString(),
      trend: "0",
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50",
      icon: Clock,
    },
    {
      label: "Admin Users",
      value: users.filter((user) => user.role === "Admin").length.toString(),
      trend: "+1",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      icon: Shield,
    },
  ];

  // Get unique roles and statuses from users
  const roles = [
    "all",
    ...new Set(users.map((user) => user.role).filter(Boolean)),
  ];
  const statuses = [
    "all",
    ...new Set(users.map((user) => user.status).filter(Boolean)),
  ];

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      user.name?.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phoneNumber.toLowerCase().includes(searchLower) ||
      user.address.toLowerCase().includes(searchLower) ||
      user.role?.toLowerCase().includes(searchLower) ||
      user.status?.toLowerCase().includes(searchLower);

    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
      case "Away":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-3 h-3" />;
      case "Inactive":
        return <AlertCircle className="w-3 h-3" />;
      case "Away":
        return <Clock className="w-3 h-3" />;
      case "Pending":
        return <Clock className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const handleDeleteUser = async (userId: string | number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await UserService.deleteUser(userId.toString());
        setUsers(
          users.filter((user) => user._id !== userId && user.id !== userId)
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setUsers(
          users.filter((user) => user._id !== userId && user.id !== userId)
        );
      } catch (err: any) {
        console.error("Error deleting user:", err);
        setError(err.message || "Failed to delete user");
      }
    }
  };

  const refreshUsers = async () => {
    try {
      setLoading(true);
      const response = await UserService.getAllUsers();
      const transformedUsers =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data?.map((user: any) => ({
          _id: user._id || user.id,
          id: user.id || user._id,
          firstName: user.firstName || user.name?.split(" ")[0] || "",
          lastName: user.lastName || user.name?.split(" ")[1] || "",
          name: user.name || `${user.firstName} ${user.lastName}`.trim(),
          email: user.email,
          phoneNumber: user.phoneNumber || user.phone || "Not provided",
          address: user.address || "Not provided",
          profilePicture: user.profilePicture || user.avatar,
          role: user.role || "User",
          status: user.status || (user.isActive ? "Active" : "Inactive"),
          avatar: getInitials(user.name || user.fullName || user.email),
          lastLogin: user.lastLogin || user.lastLoginAt || "Never",
          permissions: user.permissions || [],
          joinDate: user.joinDate || user.createdAt?.split("T")[0] || "Unknown",
          totalLoans: user.totalLoans || user.loansCount || 0,
          createdAt: user.createdAt || new Date().toISOString(),
          updatedAt: user.updatedAt || new Date().toISOString(),
        })) || [];
      setUsers(transformedUsers);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to refresh users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-green-200/50 px-6 py-4 relative z-10">
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
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500">Dashboard</span>
                  <span className="text-gray-300">›</span>
                  <span className="text-black font-medium">
                    User Management
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-green-100/50 border border-green-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-200"
                />
              </div>

              {/* Refresh Button */}
              <button
                onClick={refreshUsers}
                disabled={loading}
                className="p-2 rounded-xl bg-green-100/50 hover:bg-green-200/50 transition-all duration-200 group disabled:opacity-50"
                title="Refresh Users"
              >
                <Loader2
                  className={`w-5 h-5 text-green-600 group-hover:text-green-700 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="notification-bell relative p-2 rounded-xl bg-green-100/50 hover:bg-green-200/50 transition-all duration-200 group"
                >
                  <Bell className="w-5 h-5 text-green-600 group-hover:text-green-700" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  </div>
                </button>

                {/* Notifications Popup */}
                {notificationsOpen && (
                  <div className="notifications-popup absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-green-200/50 z-[9999] overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200/50 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-black">
                        Notifications
                      </h3>
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-green-100/50 hover:bg-green-50/50 cursor-pointer transition-colors ${
                              !notification.read ? "bg-green-50" : ""
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${
                                  notification.read
                                    ? "bg-green-200"
                                    : "bg-green-500"
                                }`}
                              ></div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-semibold text-black">
                                    {notification.title}
                                  </h4>
                                  <span className="text-xs text-gray-400">
                                    {notification.time}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center">
                          <Bell className="w-10 h-10 mx-auto text-green-300 mb-3" />
                          <p className="text-gray-500">
                            No notifications to display
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-200/50 text-center"></div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-4 border-l border-green-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-black">
                    {userName}
                  </div>
                  <div className="text-xs text-gray-500">Loan Manager</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <span className="text-white font-semibold text-sm">
                      {getInitials(userName || "Admin")}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown className="w-4 h-4 text-green-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                User Management
              </h1>
              <p className="text-gray-700">
                Manage user accounts, roles, and permissions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="filters-button px-4 py-2 bg-white/70 backdrop-blur-sm border border-green-200/50 rounded-xl text-green-700 font-medium hover:bg-green-50/70 transition-all duration-200 flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                {/* Filters Popup */}
                {filtersOpen && (
                  <div className="filters-popup absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-green-200/50 z-50 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-green-800">Filters</h3>
                      <button
                        onClick={() => setFiltersOpen(false)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                          Role
                        </label>
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="w-full px-3 py-2 bg-green-100/50 border border-green-200/50 rounded-xl text-sm"
                        >
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {role === "all" ? "All Roles" : role}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                          Status
                        </label>
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="w-full px-3 py-2 bg-green-100/50 border border-green-200/50 rounded-xl text-sm"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status === "all" ? "All Statuses" : status}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedRole("all");
                          setSelectedStatus("all");
                        }}
                        className="w-full py-2 text-sm font-medium text-green-600 hover:text-green-700"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setAddUserOpen(!addUserOpen)}
                  className="add-user-button px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg shadow-green-500/25 flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add User</span>
                </button>

                {/* Add User Popup */}
                {addUserOpen && (
                  <div className="add-user-popup absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-green-200/50 z-50 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-green-800">
                        Add New User
                      </h3>
                      <button
                        onClick={() => setAddUserOpen(false)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-green-100/50 border border-green-200/50 rounded-xl text-sm"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-green-100/50 border border-green-200/50 rounded-xl text-sm"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 bg-green-100/50 border border-green-200/50 rounded-xl text-sm"
                          placeholder="Enter email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">
                          Role
                        </label>
                        <select className="w-full px-3 py-2 bg-green-100/50 border border-green-200/50 rounded-xl text-sm">
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                        </select>
                      </div>
                      <button className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
                        Create User
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100/70 backdrop-blur-sm border border-red-200/50 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium">Error: {error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto p-1 hover:bg-red-200/50 rounded"
                >
                  <span className="text-red-600">×</span>
                </button>
              </div>
            </div>
          )}

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-6 h-6 text-green-700" />
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${stat.color} shadow-lg`}
                      >
                        {stat.trend}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </h3>
                      <div className="text-3xl font-bold text-black">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Users Table */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-green-200/30 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black">All Users</h3>
              <div className="text-sm text-gray-700">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 text-green-400 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-semibold text-black mb-2">
                  Loading Users...
                </h3>
                <p className="text-gray-700">
                  Please wait while we fetch the user data
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Loans Managed
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-black uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-200/30">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-green-50/30 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                              <span className="text-white font-semibold text-sm">
                                {user.avatar}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-black">
                                {user.name}
                              </div>
                              <div className="text-xs text-gray-700">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-black">
                            {user.role}
                          </div>
                          <div className="text-xs text-gray-700">
                            Since {user.joinDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              user.status || "Unknown"
                            )}`}
                          >
                            {getStatusIcon(user.status || "Unknown")}
                            <span>{user.status || "Unknown"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">
                            {user.lastLogin}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-black">
                            {user.totalLoans}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              className="p-2 rounded-lg bg-blue-100/70 hover:bg-blue-200/70 transition-colors duration-200 group"
                              title="View Details"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                            </button>
                            <button
                              className="p-2 rounded-lg bg-red-100/70 hover:bg-red-200/70 transition-colors duration-200 group"
                              title="Delete User"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                            </button>
                            <button
                              className="p-2 rounded-lg bg-gray-100/70 hover:bg-gray-200/70 transition-colors duration-200 group"
                              title="More Options"
                            >
                              <MoreVertical className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-black mb-2">
                  No users found
                </h3>
                <p className="text-gray-700">
                  {users.length === 0
                    ? "No users are currently registered in the system"
                    : "Try adjusting your search or filter criteria"}
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && filteredUsers.length > 0 && (
            <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
              <div className="text-sm text-green-600">
                Showing 1 to {filteredUsers.length} of {filteredUsers.length}{" "}
                results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 bg-green-100/50 text-green-600 rounded-lg hover:bg-green-200/50 transition-colors duration-200 text-sm font-medium">
                  Previous
                </button>
                <button className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-colors duration-200 text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-2 bg-green-100/50 text-green-600 rounded-lg hover:bg-green-200/50 transition-colors duration-200 text-sm font-medium">
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* User Details Modal */}
      <UserDetailsModal
        selectedUser={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default UserManagement;