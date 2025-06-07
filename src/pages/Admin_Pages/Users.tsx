import { useState } from "react";
import {
  Users,
  UserPlus,
  Edit3,
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
} from "lucide-react";
// Import Sidebar from your components directory
import Sidebar from "../../components/Sidebar";

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@pocket.com",
      role: "Loan Manager",
      status: "Active",
      avatar: "SJ",
      lastLogin: "2025-06-05 09:30 AM",
      permissions: ["loan_approval", "user_management", "reports"],
      joinDate: "2024-01-15",
      totalLoans: 145,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@pocket.com",
      role: "Senior Analyst",
      status: "Active",
      avatar: "MC",
      lastLogin: "2025-06-05 08:45 AM",
      permissions: ["analytics", "reports", "loan_tracking"],
      joinDate: "2024-03-20",
      totalLoans: 89,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@pocket.com",
      role: "Customer Support",
      status: "Away",
      avatar: "ER",
      lastLogin: "2025-06-04 05:20 PM",
      permissions: ["customer_support", "basic_reports"],
      joinDate: "2024-05-10",
      totalLoans: 32,
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@pocket.com",
      role: "Admin",
      status: "Active",
      avatar: "DT",
      lastLogin: "2025-06-05 10:15 AM",
      permissions: ["all_permissions"],
      joinDate: "2023-11-05",
      totalLoans: 203,
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@pocket.com",
      role: "Loan Officer",
      status: "Inactive",
      avatar: "LW",
      lastLogin: "2025-05-28 02:30 PM",
      permissions: ["loan_processing", "customer_contact"],
      joinDate: "2024-02-28",
      totalLoans: 67,
    },
    {
      id: 6,
      name: "James Miller",
      email: "james.miller@pocket.com",
      role: "Risk Analyst",
      status: "Active",
      avatar: "JM",
      lastLogin: "2025-06-05 09:00 AM",
      permissions: ["risk_assessment", "analytics", "reports"],
      joinDate: "2024-04-12",
      totalLoans: 112,
    },
  ];

  const userStats = [
    {
      label: "Total Users",
      value: "24",
      trend: "+3",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
      icon: Users,
    },
    {
      label: "Active Users",
      value: "18",
      trend: "+2",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      icon: UserCheck,
    },
    {
      label: "Pending Approval",
      value: "3",
      trend: "0",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      icon: Clock,
    },
    {
      label: "Admin Users",
      value: "5",
      trend: "+1",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      icon: Shield,
    },
  ];

  const roles = [
    "all",
    "Admin",
    "Loan Manager",
    "Senior Analyst",
    "Loan Officer",
    "Customer Support",
    "Risk Analyst",
  ];
  const statuses = ["all", "Active", "Inactive", "Away", "Pending"];

  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-orange-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-orange-100/50 hover:bg-orange-200/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-orange-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-orange-500">Dashboard</span>
                  <span className="text-orange-300">›</span>
                  <span className="text-orange-700 font-medium">
                    User Management
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-orange-100/50 border border-orange-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-200"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl bg-orange-100/50 hover:bg-orange-200/50 transition-all duration-200 group">
                <Bell className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">2</span>
                </div>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-4 border-l border-orange-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-orange-700">
                    Sarah Johnson
                  </div>
                  <div className="text-xs text-orange-500">Loan Manager</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                    <span className="text-white font-semibold text-sm">SJ</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown className="w-4 h-4 text-orange-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-orange-800 mb-2">
                User Management
              </h1>
              <p className="text-orange-600">
                Manage user accounts, roles, and permissions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-orange-200/50 rounded-xl text-orange-700 font-medium hover:bg-orange-50/70 transition-all duration-200 flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg shadow-orange-500/25 flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>

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
                        <IconComponent className="w-6 h-6 text-orange-700" />
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${stat.color} shadow-lg`}
                      >
                        {stat.trend}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-orange-600">
                        {stat.label}
                      </h3>
                      <div className="text-3xl font-bold text-orange-800">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-orange-700">
                  Role:
                </span>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 bg-orange-100/50 border border-orange-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role === "all" ? "All Roles" : role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-orange-700">
                  Status:
                </span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-orange-100/50 border border-orange-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "All Statuses" : status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ml-auto text-sm text-orange-600">
                Showing {filteredUsers.length} of {mockUsers.length} users
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-orange-200/30">
              <h3 className="text-lg font-semibold text-orange-800">
                All Users
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">
                      Loans Managed
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-orange-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-200/30">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-orange-50/30 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                            <span className="text-white font-semibold text-sm">
                              {user.avatar}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-orange-800">
                              {user.name}
                            </div>
                            <div className="text-xs text-orange-600">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-orange-700">
                          {user.role}
                        </div>
                        <div className="text-xs text-orange-500">
                          Since {user.joinDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {getStatusIcon(user.status)}
                          <span>{user.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-orange-700">
                          {user.lastLogin}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-orange-800">
                          {user.totalLoans}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="p-2 rounded-lg bg-blue-100/70 hover:bg-blue-200/70 transition-colors duration-200 group"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-green-100/70 hover:bg-green-200/70 transition-colors duration-200 group"
                            title="Edit User"
                          >
                            <Edit3 className="w-4 h-4 text-green-600 group-hover:text-green-700" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-purple-100/70 hover:bg-purple-200/70 transition-colors duration-200 group"
                            title="Manage Permissions"
                          >
                            <Shield className="w-4 h-4 text-purple-600 group-hover:text-purple-700" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-red-100/70 hover:bg-red-200/70 transition-colors duration-200 group"
                            title="Delete User"
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

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-orange-700 mb-2">
                  No users found
                </h3>
                <p className="text-orange-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
              <div className="text-sm text-orange-600">
                Showing 1 to {filteredUsers.length} of {filteredUsers.length}{" "}
                results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 bg-orange-100/50 text-orange-600 rounded-lg hover:bg-orange-200/50 transition-colors duration-200 text-sm font-medium">
                  Previous
                </button>
                <button className="px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors duration-200 text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-2 bg-orange-100/50 text-orange-600 rounded-lg hover:bg-orange-200/50 transition-colors duration-200 text-sm font-medium">
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
    </div>
  );
};

export default UserManagement;
