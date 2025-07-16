import React, { useState, useEffect } from 'react';
import { Plus, User, Mail, Calendar, Menu, Loader2, CheckCircle, XCircle, Phone, Search, X, Eye, EyeOff } from 'lucide-react';
import Sidebar from "../../components/User_Sidebar";
import UserService from "../../services/admin_Services/user_Service";
import SignupUser from "../../services/user_Services/signup_Service";

interface User {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  name?: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role?: string;
  status?: string;
  createdAt?: string;
  joinDate?: string;
  lastLogin?: string;
  profilePicture?: string;
}

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
  profilePicture: string;
  role: string;
  status: string;
}

// Validation helper functions
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePhone = (phone: string) => {
  const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{2,6}[-\s.]?[0-9]{2,6}$/;
  return re.test(phone);
};

const validatePassword = (password: string) => {
  return password.length >= 6;
};

const UserManagementScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newUser, setNewUser] = useState<NewUser>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    profilePicture: '',
    role: 'user',
    status: 'active'
  });

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch users - fixed to run when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await UserService.getAllUsers();
        const formattedUsers = response.data.map((user: any) => ({
          ...user,
          id: user._id || user.id,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role || 'user',
          status: user.status || 'active',
          joinDate: user.createdAt || user.joinDate || new Date().toISOString()
        }));
        setUsers(formattedUsers);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Real-time field validation
  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) error = 'This field is required';
        else if (value.length < 2) error = 'Must be at least 2 characters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Invalid email format';
        break;
      case 'phoneNumber':
        if (value && !validatePhone(value)) error = 'Invalid phone number';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (!validatePassword(value)) error = 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password';
        else if (value !== newUser.password) error = 'Passwords do not match';
        break;
    }
    
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    Object.keys(newUser).forEach(key => {
      if (key !== 'profilePicture' && key !== 'address' && key !== 'phoneNumber') {
        const error = validateField(key, newUser[key as keyof NewUser]);
        if (error) errors[key] = error;
      }
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormSuccess(false);
    setFormErrors({});
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      const userData = {
        firstName: newUser.firstName.trim(),
        lastName: newUser.lastName.trim(),
        email: newUser.email.trim(),
        phoneNumber: newUser.phoneNumber.trim() || 'Not specified',
        password: newUser.password,
        address: newUser.address.trim() || 'Not specified',
        profilePicture: newUser.profilePicture || '',
        role: newUser.role.toLowerCase(),
        status: newUser.status.toLowerCase()
      };
      
      const response = await SignupUser(userData);
      
      const createdUser: User = {
        ...response.user,
        id: response.user._id,
        name: `${response.user.firstName} ${response.user.lastName}`,
        role: newUser.role,
        joinDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        status: newUser.status,
        lastLogin: new Date().toISOString()
      };
      
      setUsers(prev => [...prev, createdUser]);
      resetForm();
      setFormSuccess(true);
      setTimeout(() => setShowModal(false), 1500);
    } catch (error: any) {
      let errorMessage = 'Failed to create user. Please try again.';
      if (error.message.includes('User validation failed')) {
        errorMessage = 'Invalid user data. Please check all fields.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      setFormErrors(prev => ({
        ...prev,
        form: errorMessage
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewUser({ 
      firstName: '', 
      lastName: '', 
      email: '', 
      phoneNumber: '', 
      address: '', 
      password: '', 
      confirmPassword: '',
      profilePicture: '',
      role: 'user',
      status: 'active'
    });
    setFormErrors({});
    setFormSuccess(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredUsers = users.filter(user =>
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const ErrorMessage = ({ error }: { error: string }) => (
    <p className="mt-1 text-sm text-red-600 flex items-center">
      <XCircle className="mr-1 h-4 w-4" />
      {error}
    </p>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 overflow-y-auto relative">
        {/* Main Content */}
        <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 transition-all duration-300 ${showModal ? 'blur-sm brightness-90' : ''}`}>
          <div className="max-w-7xl mx-auto">
            {/* Header with Add New Customer button */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center">
                  {isMobile && (
                    <button 
                      onClick={toggleSidebar}
                      className="mr-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="Toggle sidebar"
                    >
                      <Menu size={20} className="text-gray-600" />
                    </button>
                  )}
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 md:mb-2">Customer Management</h1>
                    <p className="text-sm md:text-base text-gray-600">Manage all system customers and their permissions</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 w-full md:w-auto justify-center"
                  aria-label="Add new customer"
                >
                  <Plus size={20} />
                  <span>Add New Customer</span>
                </button>
              </div>
            </div>

            {/* Search and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Customers</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {users.filter(u => u.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customers Cards */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center text-red-500">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2"></div>
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center mb-4 gap-4">
                        <div className="bg-indigo-100 rounded-full p-4 flex-shrink-0">
                          <User size={24} className="text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {user.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact</h4>
                          <div className="flex items-start text-gray-700">
                            <Mail className="mr-2 mt-1 flex-shrink-0 text-gray-400" />
                            <span className="break-all">{user.email}</span>
                          </div>
                          {user.phoneNumber && user.phoneNumber !== 'Not specified' && (
                            <div className="flex items-center text-gray-700">
                              <Phone className="mr-2 flex-shrink-0 text-gray-400" />
                              <span>{user.phoneNumber}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Details</h4>
                          <div className="flex items-center text-gray-700">
                            <Calendar className="mr-2 flex-shrink-0 text-gray-400" />
                            <span>Joined {new Date(user.createdAt || user.joinDate || '').toLocaleDateString()}</span>
                          </div>
                          {user.address && user.address !== 'Not specified' && (
                            <div className="flex items-start text-gray-700">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-1 flex-shrink-0 text-gray-400">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                              <span className="break-words">{user.address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Customer Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dimmed background */}
            <div 
              className="absolute inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            ></div>
            
            {/* Modal container */}
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
              {/* Modal header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Add New Customer</h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="p-2 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="mt-1 opacity-90">Fill in the details below to create a new customer account</p>
              </div>
              
              {/* Modal content */}
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {formErrors.form && (
                  <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center text-red-600">
                      <XCircle className="mr-2 h-5 w-5" />
                      <span className="font-medium">{formErrors.form}</span>
                    </div>
                  </div>
                )}

                {formSuccess && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span className="font-medium">Customer created successfully!</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={newUser.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border ${
                          formErrors.firstName ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="John"
                        required
                      />
                      {formErrors.firstName && <ErrorMessage error={formErrors.firstName} />}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={newUser.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border ${
                          formErrors.lastName ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Doe"
                        required
                      />
                      {formErrors.lastName && <ErrorMessage error={formErrors.lastName} />}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border ${
                          formErrors.email ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="john@example.com"
                        required
                      />
                      {formErrors.email && <ErrorMessage error={formErrors.email} />}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={newUser.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border ${
                          formErrors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {formErrors.phoneNumber && <ErrorMessage error={formErrors.phoneNumber} />}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                      <select
                        name="role"
                        value={newUser.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={newUser.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border ${
                            formErrors.password ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 transition-colors`}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {formErrors.password && <ErrorMessage error={formErrors.password} />}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={newUser.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border ${
                            formErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 transition-colors`}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {formErrors.confirmPassword && <ErrorMessage error={formErrors.confirmPassword} />}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:transform-none"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin inline" />
                          Creating...
                        </>
                      ) : (
                        'Create Customer'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementScreen;