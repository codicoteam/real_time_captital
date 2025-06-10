import { useState } from "react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  CreditCard,
  Send,
} from "lucide-react";
import Sidebar from "../../components/User_Sidebar";
// Sidebar Component (imported from provided code)

// Apply for New Loans Component
const ApplyNewLoan = () => {
  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    purpose: "",
    tenure: "",
    income: "",
    employment: "",
  });

  const loanTypes = [
    { value: "home", label: "Home Loan", rate: "8.5%" },
    { value: "personal", label: "Personal Loan", rate: "12.0%" },
    { value: "business", label: "Business Loan", rate: "10.5%" },
    { value: "education", label: "Education Loan", rate: "9.0%" },
  ];

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center">
          <Plus className="w-6 h-6 mr-2 text-blue-600" />
          Apply for New Loan
        </h3>
        <p className="text-sm text-blue-500">
          Fill out the form to start your loan application
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Loan Type
            </label>
            <select
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={formData.loanType}
              onChange={(e) =>
                setFormData({ ...formData, loanType: e.target.value })
              }
            >
              <option value="">Select loan type</option>
              {loanTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} - {type.rate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Loan Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Loan Purpose
            </label>
            <input
              type="text"
              placeholder="Purpose of loan"
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={formData.purpose}
              onChange={(e) =>
                setFormData({ ...formData, purpose: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Tenure (months)
            </label>
            <input
              type="number"
              placeholder="Loan tenure"
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={formData.tenure}
              onChange={(e) =>
                setFormData({ ...formData, tenure: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Monthly Income
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input
                type="number"
                placeholder="Your monthly income"
                className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.income}
                onChange={(e) =>
                  setFormData({ ...formData, income: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Employment Type
            </label>
            <select
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={formData.employment}
              onChange={(e) =>
                setFormData({ ...formData, employment: e.target.value })
              }
            >
              <option value="">Select employment type</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self Employed</option>
              <option value="business">Business Owner</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Send className="w-5 h-5" />
          <span>Submit Application</span>
        </button>
      </div>
    </div>
  );
};

// Application Status Component
const ApplicationStatus = () => {
  const applications = [
    {
      id: "APP001",
      type: "Home Loan",
      amount: 500000,
      status: "approved",
      date: "2024-06-01",
      progress: 100,
    },
    {
      id: "APP002",
      type: "Personal Loan",
      amount: 75000,
      status: "pending",
      date: "2024-06-05",
      progress: 60,
    },
    {
      id: "APP003",
      type: "Business Loan",
      amount: 200000,
      status: "under_review",
      date: "2024-06-08",
      progress: 40,
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return {
          color: "text-green-700 bg-green-100",
          icon: CheckCircle,
          text: "Approved",
        };
      case "pending":
        return {
          color: "text-orange-700 bg-orange-100",
          icon: Clock,
          text: "Pending",
        };
      case "under_review":
        return {
          color: "text-blue-700 bg-blue-100",
          icon: AlertCircle,
          text: "Under Review",
        };
      case "rejected":
        return {
          color: "text-red-700 bg-red-100",
          icon: XCircle,
          text: "Rejected",
        };
      default:
        return {
          color: "text-gray-700 bg-gray-100",
          icon: Clock,
          text: status,
        };
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-blue-600" />
          Application Status
        </h3>
        <p className="text-sm text-blue-500">
          Track your current loan applications
        </p>
      </div>

      <div className="space-y-4">
        {applications.map((app) => {
          const statusConfig = getStatusConfig(app.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={app.id}
              className="p-6 border border-blue-200/50 rounded-xl hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">{app.type}</h4>
                    <p className="text-sm text-blue-600">
                      ₹{app.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${statusConfig.color}`}
                >
                  <StatusIcon className="w-4 h-4 mr-1" />
                  {statusConfig.text}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-600">Progress</span>
                  <span className="text-blue-800 font-medium">
                    {app.progress}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${app.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-sm text-blue-600">
                <span>Application ID: {app.id}</span>
                <span>Applied: {new Date(app.date).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Application History Component
const ApplicationHistory = () => {
  const history = [
    {
      id: "APP001",
      type: "Home Loan",
      amount: 500000,
      status: "approved",
      appliedDate: "2024-01-15",
      approvedDate: "2024-02-01",
      disbursedDate: "2024-02-15",
    },
    {
      id: "APP004",
      type: "Personal Loan",
      amount: 50000,
      status: "completed",
      appliedDate: "2023-11-10",
      approvedDate: "2023-11-25",
      disbursedDate: "2023-12-01",
    },
    {
      id: "APP005",
      type: "Business Loan",
      amount: 150000,
      status: "rejected",
      appliedDate: "2023-09-05",
      rejectedDate: "2023-09-20",
    },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-blue-600" />
          Application History
        </h3>
        <p className="text-sm text-blue-500">
          Your complete loan application timeline
        </p>
      </div>

      <div className="space-y-6">
        {history.map((item, index) => (
          <div key={item.id} className="relative">
            {index !== history.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-blue-200"></div>
            )}

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">
                  {index + 1}
                </span>
              </div>

              <div className="flex-1 p-4 bg-white/50 rounded-xl border border-blue-200/50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-blue-800">{item.type}</h4>
                    <p className="text-blue-600">
                      ₹{item.amount.toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "approved" || item.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-500">Applied:</span>
                    <p className="font-medium text-blue-800">
                      {new Date(item.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                  {item.approvedDate && (
                    <div>
                      <span className="text-green-500">Approved:</span>
                      <p className="font-medium text-green-700">
                        {new Date(item.approvedDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {item.disbursedDate && (
                    <div>
                      <span className="text-purple-500">Disbursed:</span>
                      <p className="font-medium text-purple-700">
                        {new Date(item.disbursedDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {item.rejectedDate && (
                    <div>
                      <span className="text-red-500">Rejected:</span>
                      <p className="font-medium text-red-700">
                        {new Date(item.rejectedDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-blue-100">
                  <span className="text-xs text-blue-500">
                    Application ID: {item.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Loan Application Page
const LoanApplicationPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("apply");

  const tabs = [
    { id: "apply", label: "Apply New Loan", icon: Plus },
    { id: "status", label: "Application Status", icon: FileText },
    { id: "history", label: "History", icon: Clock },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-blue-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-blue-100/50 hover:bg-blue-200/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-blue-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-500">Dashboard</span>
                  <span className="text-blue-300">›</span>
                  <span className="text-blue-700 font-medium">
                    Loan Application
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="pl-10 pr-4 py-2 w-64 bg-blue-100/50 border border-blue-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200"
                />
              </div>

              <button className="relative p-2 rounded-xl bg-blue-100/50 hover:bg-blue-200/50 transition-all duration-200 group">
                <Bell className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">2</span>
                </div>
              </button>

              <div className="flex items-center space-x-3 pl-4 border-l border-blue-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-blue-700">
                    Sarah Johnson
                  </div>
                  <div className="text-xs text-blue-500">Loan Manager</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <span className="text-white font-semibold text-sm">SJ</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-white/60 backdrop-blur-sm p-2 rounded-2xl border border-white/50 shadow-lg">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "text-blue-600 hover:bg-blue-100/50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === "apply" && <ApplyNewLoan />}
            {activeTab === "status" && <ApplicationStatus />}
            {activeTab === "history" && <ApplicationHistory />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoanApplicationPage;
