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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationService from "../../services/admin_Services/notification_service";

interface Notification {
  id: string;
  type: 'sent' | 'received';
  recipient?: string;
  sender?: string;
  message: string;
  timestamp: string;
  read?: boolean;
}

// Sidebar Component
const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-green-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-green-700">Dashboard</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg hover:bg-green-100"
            >
              <X className="w-5 h-5 text-green-600" />
            </button>
          </div>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            <a href="#" className="flex items-center px-3 py-2 text-green-700 bg-green-100 rounded-lg">
              <MessageSquareText className="w-5 h-5 mr-3" />
              Notifications
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-gray-600 hover:bg-green-100 rounded-lg">
              <User className="w-5 h-5 mr-3" />
              Users
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-gray-600 hover:bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 mr-3" />
              Calendar
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

// Notification Bell Component
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
        className="relative p-2 rounded-xl bg-green-100/50 hover:bg-green-200/50 transition-all duration-200"
      >
        {unreadCount > 0 ? (
          <BellRing className="w-5 h-5 text-green-600" />
        ) : (
          <Bell className="w-5 h-5 text-green-600" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-green-200 z-50">
          <div className="p-4 border-b border-green-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-green-700">Notifications</h3>
              <button
                onClick={onViewAll}
                className="text-sm text-green-600 hover:text-green-700"
              >
                View All
              </button>
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {notifications.slice(0, 5).map((notification) => (
              <div
                key={`notification-${notification.id}`}
                className={`p-3 border-b border-green-100 hover:bg-green-50 ${
                  !notification.read ? 'bg-green-25' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {notification.type === 'sent' 
                          ? `To: ${notification.recipient}`
                          : `From: ${notification.sender}`}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
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

// Main Notifications Component
const Notifications: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showViewAll, setShowViewAll] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'sent' | 'received'>('all');

  useEffect(() => {
    // Initialize with a welcome notification
    const initialNotifications: Notification[] = [
      {
        id: 'welcome-1',
        type: 'received',
        sender: 'System',
        message: 'Welcome to the admin dashboard!',
        timestamp: new Date().toISOString(),
        read: false
      }
    ];
    setNotifications(initialNotifications);
  }, []);

  const handleSendNotification = async () => {
    if (!recipient || !message) {
      toast.error("Both recipient and message are required");
      return;
    }

    setLoading(true);

    try {
      const notificationData = {
        recipient,
        message
      };

      // Send the notification using the service
      const response = await NotificationService.sendNotification(notificationData);
      
      // Add the sent notification to our local state
      const newNotification: Notification = {
        id: response.id || `notification-${Date.now()}`,
        type: 'sent',
        recipient,
        message,
        timestamp: new Date().toISOString(),
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      toast.success("Notification sent successfully!");
      
      // Clear the form
      setRecipient("");
      setMessage("");
    } catch (error: any) {
      console.error("Notification error:", error);
      toast.error(typeof error === 'string' ? error : "Failed to send notification");
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
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-green-50 to-green-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-green-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-500/5" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-green-100/50 hover:bg-green-200/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-green-600" />
              </button>
              <div className="flex items-center space-x-3">
                <MessageSquareText className="w-6 h-6 text-green-600" />
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-500">Dashboard</span>
                  <span className="text-green-300">›</span>
                  <span className="text-green-700 font-medium">Notifications</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 bg-green-100/50 border border-green-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-200"
                />
              </div>

              {/* Bell */}
              <Adminbell 
                notifications={notifications.filter(n => n.type === 'received')} 
                onViewAll={handleViewAll}
              />

              {/* User Info */}
              <div className="flex items-center space-x-3 pl-4 border-l border-green-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-green-700">Admin User</div>
                  <div className="text-xs text-green-500">Administrator</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <span className="text-white font-semibold text-sm">AD</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown className="w-4 h-4 text-green-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <h1 className="text-2xl font-bold text-green-700 text-center mb-4">
              Send Notification
            </h1>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                User ID / Token
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full border border-green-200 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="Enter user ID or token"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full border border-green-200 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="Enter your message"
              />
            </div>

            <button
              onClick={handleSendNotification}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 rounded font-semibold flex items-center justify-center gap-2 transition-colors"
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
      </div>

      {/* View All Notifications Modal */}
      {showViewAll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-green-200">
              <h2 className="text-2xl font-bold text-green-700">All Notifications</h2>
              <button
                onClick={() => setShowViewAll(false)}
                className="p-2 hover:bg-green-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-green-600" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-green-200">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-500 hover:text-green-600'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'sent'
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-500 hover:text-green-600'
                }`}
              >
                <Send className="w-4 h-4 inline mr-2" />
                Sent ({notifications.filter(n => n.type === 'sent').length})
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'received'
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-500 hover:text-green-600'
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
                      key={`full-notification-${notification.id}`}
                      className={`p-4 rounded-lg border transition-all ${
                        notification.type === 'received' && !notification.read
                          ? 'bg-green-50 border-green-200'
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
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
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