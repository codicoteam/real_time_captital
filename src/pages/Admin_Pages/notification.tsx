import React, { useState, useEffect } from "react";
import { 
  Menu, 
  Search, 
  ChevronDown, 
  MessageSquareText, 
  X, 
  Clock, 
  Send, 
  Inbox, 
  User, 
  Calendar,
  Bell,
  BellRing
} from "lucide-react";

interface Notification {
  id: string;
  type: 'sent' | 'received';
  recipient?: string;
  sender?: string;
  message: string;
  timestamp: string;
  read?: boolean;
}

// Mock Sidebar Component
const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-orange-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-orange-700">Dashboard</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg hover:bg-orange-100"
            >
              <X className="w-5 h-5 text-orange-600" />
            </button>
          </div>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            <a href="#" className="flex items-center px-3 py-2 text-orange-700 bg-orange-100 rounded-lg">
              <MessageSquareText className="w-5 h-5 mr-3" />
              Notifications
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-gray-600 hover:bg-orange-100 rounded-lg">
              <User className="w-5 h-5 mr-3" />
              Users
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-gray-600 hover:bg-orange-100 rounded-lg">
              <Calendar className="w-5 h-5 mr-3" />
              Calendar
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

// Mock Adminbell Component
const Adminbell: React.FC<{ 
  notifications: Notification[]; 
  onViewAll: () => void; 
}> = ({ notifications, onViewAll }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded-xl bg-orange-100/50 hover:bg-orange-200/50 transition-all duration-200"
      >
        {unreadCount > 0 ? (
          <BellRing className="w-5 h-5 text-orange-600" />
        ) : (
          <Bell className="w-5 h-5 text-orange-600" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-orange-200 z-50">
          <div className="p-4 border-b border-orange-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-orange-700">Notifications</h3>
              <button
                onClick={onViewAll}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                View All
              </button>
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b border-orange-100 hover:bg-orange-50 ${
                  !notification.read ? 'bg-orange-25' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        From: {notification.sender}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))}
            
            {notifications.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Mock Toast Components
const toast = {
  success: (message: string) => {
    console.log('SUCCESS:', message);
    // You can implement your own toast logic here
  },
  error: (message: string) => {
    console.log('ERROR:', message);
    // You can implement your own toast logic here
  }
};

const ToastContainer: React.FC<{ position: string; autoClose: number; hideProgressBar: boolean }> = () => {
  // Mock toast container - replace with actual implementation
  return <div className="fixed top-4 right-4 z-50"></div>;
};

const Notifications: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showViewAll, setShowViewAll] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'sent' | 'received'>('all');

  // Mock notifications data - replace with actual API call
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'sent',
        recipient: 'user123',
        message: 'Your order has been confirmed',
        timestamp: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        type: 'received',
        sender: 'admin456',
        message: 'System maintenance scheduled for tonight',
        timestamp: '2024-01-15T09:15:00Z',
        read: true,
      },
      {
        id: '3',
        type: 'sent',
        recipient: 'user789',
        message: 'Welcome to our platform!',
        timestamp: '2024-01-14T16:45:00Z',
      },
      {
        id: '4',
        type: 'received',
        sender: 'support',
        message: 'Your ticket has been resolved',
        timestamp: '2024-01-14T14:20:00Z',
        read: false,
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleSendNotification = async () => {
    if (!recipient || !message) {
      toast.error("Both fields are required.");
      return;
    }

    setLoading(true);

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("✅ Notification sent!");
      
      // Add to local notifications list
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'sent',
        recipient,
        message,
        timestamp: new Date().toISOString(),
      };
      setNotifications(prev => [newNotification, ...prev]);
      
      setRecipient("");
      setMessage("");
    } catch (error) {
      console.error("Notification error:", error);
      toast.error("Server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    setShowViewAll(true);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    return notification.type === activeTab;
  });


  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-orange-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-orange-100/50 hover:bg-orange-200/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-orange-600" />
              </button>
              <div className="flex items-center space-x-3">
                <MessageSquareText className="w-6 h-6 text-orange-600" />
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-orange-500">Dashboard</span>
                  <span className="text-orange-300">›</span>
                  <span className="text-orange-700 font-medium">Notifications</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 bg-orange-100/50 border border-orange-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-200"
                />
              </div>

              {/* Bell */}
              <Adminbell 
                notifications={notifications.filter(n => n.type === 'received')} 
                onViewAll={handleViewAll}
              />

              {/* User Info */}
              <div className="flex items-center space-x-3 pl-4 border-l border-orange-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-orange-700">Sarah Johnson</div>
                  <div className="text-xs text-orange-500">Administrator</div>
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
        <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <h1 className="text-2xl font-bold text-orange-700 text-center mb-4">
              Send Notification
            </h1>

            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                User ID / Token
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full border border-orange-200 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
                placeholder="Enter user ID or token"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full border border-orange-200 rounded px-3 py-2 focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your message"
              />
            </div>

            <button
              onClick={handleSendNotification}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white py-2 rounded font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Notification"
              )}
            </button>
          </div>
        </main>

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </div>

      {/* View All Notifications Modal */}
      {showViewAll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-orange-200">
              <h2 className="text-2xl font-bold text-orange-700">All Notifications</h2>
              <button
                onClick={() => setShowViewAll(false)}
                className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-orange-600" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-orange-200">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                    : 'text-gray-500 hover:text-orange-600'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'sent'
                    ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                    : 'text-gray-500 hover:text-orange-600'
                }`}
              >
                <Send className="w-4 h-4 inline mr-2" />
                Sent ({notifications.filter(n => n.type === 'sent').length})
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'received'
                    ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                    : 'text-gray-500 hover:text-orange-600'
                }`}
              >
                <Inbox className="w-4 h-4 inline mr-2" />
                Received ({notifications.filter(n => n.type === 'received').length})
              </button>
            </div>

            {/* Notifications List */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquareText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No notifications found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-all ${
                        notification.type === 'received' && !notification.read
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {notification.type === 'sent' ? (
                              <Send className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Inbox className="w-4 h-4 text-green-600" />
                            )}
                            <span className={`text-sm font-medium ${
                              notification.type === 'sent' ? 'text-blue-600' : 'text-green-600'
                            }`}>
                              {notification.type === 'sent' ? 'Sent' : 'Received'}
                            </span>
                            {notification.type === 'received' && !notification.read && (
                              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <User className="w-4 h-4" />
                            <span>
                              {notification.type === 'sent' 
                                ? `To: ${notification.recipient}`
                                : `From: ${notification.sender}`
                              }
                            </span>
                          </div>
                          
                          <p className="text-gray-800 mb-3">{notification.message}</p>
                          
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimestamp(notification.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;