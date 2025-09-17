import { useState } from "react";
import {
  Menu,
  Search,
  ChevronDown,
  Bell,
  Users,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import Sidebar from "../../components/User_Sidebar";

// Mock NotificationBell component - replace with your actual import
const NotificationBell = () => (
  <div className="relative">
    <Bell className="w-5 h-5 text-green-500" />
  </div>
);

// Sample customer data
const sampleCustomers = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    address: "123 Main St, New York, NY 10001",
    role: "customer",
    profilePicture: "",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1234567891",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    role: "customer",
    profilePicture: "",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    _id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    phoneNumber: "+1234567892",
    address: "789 Pine Rd, Chicago, IL 60601",
    role: "customer",
    profilePicture: "",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
  {
    _id: "4",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@example.com",
    phoneNumber: "+1234567893",
    address: "321 Elm St, Houston, TX 77001",
    role: "customer",
    profilePicture: "",
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
  },
  {
    _id: "5",
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@example.com",
    phoneNumber: "+1234567894",
    address: "654 Maple Dr, Phoenix, AZ 85001",
    role: "customer",
    profilePicture: "",
    createdAt: "2024-01-19T11:30:00Z",
    updatedAt: "2024-01-19T11:30:00Z",
  },
];

const CustomerPage = () => {
  const userName = "Admin User"; // Replace with localStorage.getItem("userName")
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNumber.includes(searchTerm)
  );

  const handleView = (customer: {
    _id?: string;
    firstName: any;
    lastName: any;
    email?: string;
    phoneNumber?: string;
    address?: string;
    role?: string;
    profilePicture?: string;
    createdAt?: string;
    updatedAt?: string;
  }) => {
    alert(`Viewing customer: ${customer.firstName} ${customer.lastName}`);
  };

  const handleEdit = (customer: {
    _id?: string;
    firstName: any;
    lastName: any;
    email?: string;
    phoneNumber?: string;
    address?: string;
    role?: string;
    profilePicture?: string;
    createdAt?: string;
    updatedAt?: string;
  }) => {
    alert(`Editing customer: ${customer.firstName} ${customer.lastName}`);
  };

  const handleDelete = (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((customer) => customer._id !== customerId));
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-green-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-700/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition-all duration-200 shadow-lg"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-500 font-medium">Dashboard</span>
                  <span className="text-green-400">›</span>
                  <span className="text-black font-semibold">
                    Customer Management
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-white/70 border border-green-300/50 rounded-xl text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/70 transition-all duration-200"
                />
              </div>

              <button className="relative p-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition-all duration-200 group shadow-lg">
                <Bell className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-700 to-green-600 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
              </button>
              <NotificationBell />

              <div className="flex items-center space-x-3 pl-4 border-l border-green-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-black">{userName}</div>
                  <div className="text-xs text-gray-600 font-medium">
                    Customer Manager
                  </div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">AU</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Customer Management
                </h1>
                <p className="text-gray-600">
                  Manage and monitor all customer accounts
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg transform hover:scale-105"
              >
                <UserPlus className="w-5 h-5" />
                <span>Add Customer</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200/30 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Total Customers
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {customers.length}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-700 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200/30 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Active Customers
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {customers.length}
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200/30 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      New This Month
                    </p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Table */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-200/30 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-500/10 to-green-700/10 border-b border-green-200/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Join Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-200/30">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="hover:bg-green-50/30 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">
                              {getInitials(
                                customer.firstName,
                                customer.lastName
                              )}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {customer.firstName} {customer.lastName}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {customer._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-gray-900">
                            <Mail className="w-4 h-4 text-green-500" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4 text-green-500" />
                            <span>{customer.phoneNumber}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span className="max-w-xs truncate">
                            {customer.address}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-green-500" />
                          <span>{formatDate(customer.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-xs font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full">
                          {customer.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleView(customer)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="View Customer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(customer)}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200"
                            title="Edit Customer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(customer._id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            title="Delete Customer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No customers found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>

          {/* Add Customer Modal Placeholder */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Add New Customer
                </h3>
                <p className="text-gray-600 mb-6">
                  Customer creation form would go here.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition-colors"
                  >
                    Add Customer
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerPage;