import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Users,
  AlertTriangle,
  Menu,
  Search,
  ChevronDown,
  Target,
} from "lucide-react";
import Sidebar from "../../components/Sidebar"; // Import the Sidebar component
import NotificationBell from '../../components/Notificationsbell';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loanMetrics = [
    {
      label: "Total Loans",
      value: "1,247",
      unit: "",
      trend: "+15%",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
      icon: DollarSign,
    },
    {
      label: "Active Borrowers",
      value: "892",
      unit: "",
      trend: "+8%",
      color: "from-red-500 to-orange-600",
      bgColor: "bg-red-50",
      icon: Users,
    },
    {
      label: "Loan Portfolio",
      value: "₨2.4M",
      unit: "",
      trend: "+12%",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      icon: TrendingUp,
    },
    {
      label: "Default Rate",
      value: "3.2%",
      unit: "",
      trend: "-0.5%",
      color: "from-orange-600 to-red-600",
      bgColor: "bg-orange-50",
      icon: AlertTriangle,
    },
  ];

  const loanPerformanceData = [
    { month: "Jan", approved: 85, disbursed: 78, repaid: 92 },
    { month: "Feb", approved: 92, disbursed: 87, repaid: 88 },
    { month: "Mar", approved: 78, disbursed: 85, repaid: 95 },
    { month: "Apr", approved: 95, disbursed: 92, repaid: 87 },
    { month: "May", approved: 88, disbursed: 78, repaid: 92 },
    { month: "Jun", approved: 102, disbursed: 95, repaid: 98 },
  ];

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
                    Loan Management
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
                  placeholder="Search loans..."
                  className="pl-10 pr-4 py-2 w-64 bg-orange-100/50 border border-orange-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-200"
                />
              </div>

              {/* Notifications */}
               <NotificationBell />
            

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

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Hero Section */}
         {/* Hero Section */}
          <div className="relative rounded-3xl px-10 py-20 text-white overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 shadow-2xl min-h-[300px]">
            {/* Background image layer */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
            ></div>
            
            {/* Softer Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-red-500/5 to-transparent z-0"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400/10 to-transparent rounded-full blur-3xl z-0"></div>
            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">System Active</span>
                </div>

                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                  Welcome back, Sarah
                </h1>
                <p className="text-lg text-orange-200 mb-8 max-w-lg">
                  Monitor loan performance, track key metrics, and make
                  data-driven decisions to optimize your lending portfolio.
                </p>

                <div className="flex items-center space-x-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:scale-105">
                    Create New Loan
                  </button>
                  <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200">
                    View Reports
                  </button>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-40 h-40 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Target className="w-20 h-20 text-white/80" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
              </div>
            </div>
          </div>

          {/* Loan Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loanMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl"></div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-2xl ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-6 h-6 text-orange-700" />
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${metric.color} shadow-lg`}
                      >
                        {metric.trend}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-orange-600">
                        {metric.label}
                      </h3>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold text-orange-800">
                          {metric.value}
                        </span>
                        <span className="text-sm text-orange-500">
                          {metric.unit}
                        </span>
                      </div>
                    </div>

                    {/* Mini chart */}
                    <div className="mt-4 h-12 flex items-end justify-center space-x-1">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 rounded-full bg-gradient-to-t ${metric.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                          style={{ height: `${Math.random() * 70 + 30}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Loan Performance Chart */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-orange-800 mb-1">
                    Loan Performance Analytics
                  </h3>
                  <p className="text-sm text-orange-500">
                    Monthly performance overview
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="px-4 py-2 bg-orange-100 rounded-xl">
                    <select className="text-sm font-medium text-orange-700 bg-transparent focus:outline-none">
                      <option>2025</option>
                      <option>2024</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="relative h-64 bg-gradient-to-t from-orange-50 to-transparent rounded-2xl p-4">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <defs>
                    <linearGradient
                      id="approvedGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#F97316", stopOpacity: 0.6 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#F97316", stopOpacity: 0 }}
                      />
                    </linearGradient>
                    <linearGradient
                      id="disbursedGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#EF4444", stopOpacity: 0.6 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#EF4444", stopOpacity: 0 }}
                      />
                    </linearGradient>
                  </defs>

                  {/* Approved loans line */}
                  <path
                    d="M20,140 L80,120 L140,145 L200,100 L260,125 L320,80 L380,85"
                    stroke="#F97316"
                    strokeWidth="3"
                    fill="none"
                    className="drop-shadow-sm"
                  />

                  {/* Disbursed loans line */}
                  <path
                    d="M20,150 L80,135 L140,125 L200,110 L260,145 L320,100 L380,95"
                    stroke="#EF4444"
                    strokeWidth="3"
                    fill="none"
                    className="drop-shadow-sm"
                  />
                </svg>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-medium text-orange-500">
                  {loanPerformanceData.map((data) => (
                    <span
                      key={data.month}
                      className="px-2 py-1 rounded-lg bg-white/50"
                    >
                      {data.month}
                    </span>
                  ))}
                </div>

                <div className="absolute top-4 right-4 flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-orange-600 font-medium">
                      Approved
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Disbursed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-orange-800 mb-1">
                  Risk Assessment
                </h3>
                <p className="text-sm text-orange-500">
                  Portfolio risk distribution
                </p>
              </div>

              {/* Risk Categories */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-600">
                      Low Risk
                    </span>
                    <span className="text-sm font-bold text-orange-800">
                      68%
                    </span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-3">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"
                      style={{ width: "68%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-600">
                      Medium Risk
                    </span>
                    <span className="text-sm font-bold text-orange-800">
                      25%
                    </span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-3">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-600">
                      High Risk
                    </span>
                    <span className="text-sm font-bold text-orange-800">
                      7%
                    </span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-3">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000"
                      style={{ width: "7%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Risk Score */}
              <div className="mt-8 text-center p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl">
                <div className="text-3xl font-bold text-orange-800 mb-2">
                  7.8
                </div>
                <div className="text-sm text-orange-600 font-medium">
                  Overall Risk Score
                </div>
                <div className="text-xs text-orange-500 mt-1">
                  Out of 10 (Lower is better)
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-orange-800 mb-1">
                  Recent Loan Activity
                </h3>
                <p className="text-sm text-orange-500">
                  Latest transactions and updates
                </p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "LN001",
                  borrower: "John Doe",
                  amount: "₨50,000",
                  status: "Approved",
                  time: "2 hours ago",
                  type: "Personal Loan",
                },
                {
                  id: "LN002",
                  borrower: "Jane Smith",
                  amount: "₨120,000",
                  status: "Disbursed",
                  time: "4 hours ago",
                  type: "Business Loan",
                },
                {
                  id: "LN003",
                  borrower: "Mike Johnson",
                  amount: "₨75,000",
                  status: "Under Review",
                  time: "6 hours ago",
                  type: "Home Loan",
                },
                {
                  id: "LN004",
                  borrower: "Sarah Wilson",
                  amount: "₨30,000",
                  status: "Repaid",
                  time: "1 day ago",
                  type: "Personal Loan",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-white/50 to-orange-50/30 rounded-xl border border-orange-200/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {activity.id.slice(-2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-orange-800">
                        {activity.borrower}
                      </div>
                      <div className="text-sm text-orange-600">
                        {activity.type} • {activity.id}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-800">
                      {activity.amount}
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        activity.status === "Approved"
                          ? "bg-blue-100 text-blue-700"
                          : activity.status === "Disbursed"
                          ? "bg-green-100 text-green-700"
                          : activity.status === "Repaid"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {activity.status}
                    </div>
                  </div>
                  <div className="text-xs text-orange-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
