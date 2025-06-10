import { useState } from "react";
import {
  DollarSign,
  Percent,
  Clock,
  Menu,
  Bell,
  Search,
  ChevronDown,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Download,
  Calculator,
} from "lucide-react";
import Sidebar from "../../components/User_Sidebar"; // Import the ModernSidebar component

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(0);

  const loans = [
    {
      id: "LN001",
      borrower: "John Doe",
      loanAmount: 500000,
      interestRate: 8.5,
      tenure: 60,
      loanType: "Home Loan",
      disbursedDate: "2024-01-15",
      currentBalance: 425000,
      monthlyEMI: 10247,
      nextPaymentDate: "2025-07-15",
      status: "Active",
      totalPaid: 75000,
      paymentsCompleted: 6,
      creditScore: 750,
    },
    {
      id: "LN002",
      borrower: "Jane Smith",
      loanAmount: 200000,
      interestRate: 12.0,
      tenure: 36,
      loanType: "Business Loan",
      disbursedDate: "2024-03-10",
      currentBalance: 165000,
      monthlyEMI: 6645,
      nextPaymentDate: "2025-07-10",
      status: "Active",
      totalPaid: 35000,
      paymentsCompleted: 4,
      creditScore: 720,
    },
    {
      id: "LN003",
      borrower: "Mike Johnson",
      loanAmount: 75000,
      interestRate: 15.5,
      tenure: 24,
      loanType: "Personal Loan",
      disbursedDate: "2024-05-20",
      currentBalance: 68500,
      monthlyEMI: 3742,
      nextPaymentDate: "2025-07-20",
      status: "Active",
      totalPaid: 6500,
      paymentsCompleted: 2,
      creditScore: 680,
    },
  ];

  const currentLoan = loans[selectedLoan];

  // Generate payment schedule for the selected loan
  const generatePaymentSchedule = (loan: {
    id?: string;
    borrower?: string;
    loanAmount: any;
    interestRate: any;
    tenure: any;
    loanType?: string;
    disbursedDate: any;
    currentBalance?: number;
    monthlyEMI: any;
    nextPaymentDate?: string;
    status?: string;
    totalPaid?: number;
    paymentsCompleted: any;
    creditScore?: number;
  }) => {
    const schedule = [];
    const monthlyRate = loan.interestRate / 100 / 12;
    const totalPayments = loan.tenure;
    let balance = loan.loanAmount;

    for (let i = 1; i <= Math.min(12, totalPayments); i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = loan.monthlyEMI - interestPayment;
      balance -= principalPayment;

      const paymentDate = new Date(loan.disbursedDate);
      paymentDate.setMonth(paymentDate.getMonth() + i - 1);

      schedule.push({
        month: i,
        date: paymentDate.toISOString().split("T")[0],
        emi: loan.monthlyEMI,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance,
        status:
          i <= loan.paymentsCompleted
            ? "Paid"
            : i === loan.paymentsCompleted + 1
            ? "Due"
            : "Upcoming",
      });
    }
    return schedule;
  };

  const paymentSchedule = generatePaymentSchedule(currentLoan);

  const formatCurrency = (amount: number | bigint) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getProgressPercentage = (loan: {
    id?: string;
    borrower?: string;
    loanAmount: any;
    interestRate?: number;
    tenure?: number;
    loanType?: string;
    disbursedDate?: string;
    currentBalance: any;
    monthlyEMI?: number;
    nextPaymentDate?: string;
    status?: string;
    totalPaid?: number;
    paymentsCompleted?: number;
    creditScore?: number;
  }) => {
    return ((loan.loanAmount - loan.currentBalance) / loan.loanAmount) * 100;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
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
                    Loan Details
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search loans..."
                  className="pl-10 pr-4 py-2 w-64 bg-blue-100/50 border border-blue-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl bg-blue-100/50 hover:bg-blue-200/50 transition-all duration-200 group">
                <Bell className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">3</span>
                </div>
              </button>

              {/* User Profile */}
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

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Loan Selection */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Select Loan Account
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loans.map((loan, index) => (
                <div
                  key={loan.id}
                  onClick={() => setSelectedLoan(index)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                    selectedLoan === index
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-blue-200/50 bg-white/50 hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-800">
                      {loan.id}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        loan.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-blue-900">
                    {loan.borrower}
                  </div>
                  <div className="text-sm text-blue-600">{loan.loanType}</div>
                  <div className="text-sm font-semibold text-blue-800 mt-2">
                    {formatCurrency(loan.currentBalance)} remaining
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-blue-100">
                  <DollarSign className="w-6 h-6 text-blue-700" />
                </div>
                <div className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  Original
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-blue-600">
                  Loan Amount
                </h3>
                <div className="text-2xl font-bold text-blue-800">
                  {formatCurrency(currentLoan.loanAmount)}
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-green-100">
                  <TrendingUp className="w-6 h-6 text-green-700" />
                </div>
                <div className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Current
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-green-600">
                  Outstanding Balance
                </h3>
                <div className="text-2xl font-bold text-green-800">
                  {formatCurrency(currentLoan.currentBalance)}
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-purple-100">
                  <Percent className="w-6 h-6 text-purple-700" />
                </div>
                <div className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  Rate
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-purple-600">
                  Interest Rate
                </h3>
                <div className="text-2xl font-bold text-purple-800">
                  {currentLoan.interestRate}%
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-orange-100">
                  <CreditCard className="w-6 h-6 text-orange-700" />
                </div>
                <div className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                  Monthly
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-orange-600">
                  EMI Amount
                </h3>
                <div className="text-2xl font-bold text-orange-800">
                  {formatCurrency(currentLoan.monthlyEMI)}
                </div>
              </div>
            </div>
          </div>

          {/* Loan Progress and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Loan Progress */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-1">
                  Loan Progress
                </h3>
                <p className="text-sm text-blue-500">
                  Repayment status and timeline
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-blue-600">
                    Repayment Progress
                  </span>
                  <span className="text-sm font-bold text-blue-800">
                    {getProgressPercentage(currentLoan).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-4">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 relative"
                    style={{ width: `${getProgressPercentage(currentLoan)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-800">
                    {currentLoan.paymentsCompleted}
                  </div>
                  <div className="text-sm text-blue-600">Payments Made</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-800">
                    {currentLoan.tenure - currentLoan.paymentsCompleted}
                  </div>
                  <div className="text-sm text-purple-600">Remaining</div>
                </div>
              </div>

              {/* Key Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-sm text-blue-600">Total Paid</span>
                  <span className="font-semibold text-blue-800">
                    {formatCurrency(currentLoan.totalPaid)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-sm text-blue-600">Next Payment</span>
                  <span className="font-semibold text-blue-800">
                    {formatDate(currentLoan.nextPaymentDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-blue-600">Loan Tenure</span>
                  <span className="font-semibold text-blue-800">
                    {currentLoan.tenure} months
                  </span>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-1">
                  Loan Details
                </h3>
                <p className="text-sm text-blue-500">
                  Complete loan information
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Loan ID
                    </label>
                    <div className="text-lg font-bold text-blue-800">
                      {currentLoan.id}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Borrower
                    </label>
                    <div className="text-lg font-bold text-blue-800">
                      {currentLoan.borrower}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Loan Type
                    </label>
                    <div className="text-lg font-bold text-blue-800">
                      {currentLoan.loanType}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Credit Score
                    </label>
                    <div className="text-lg font-bold text-blue-800">
                      {currentLoan.creditScore}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Disbursed Date
                    </label>
                    <div className="text-lg font-bold text-blue-800">
                      {formatDate(currentLoan.disbursedDate)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Status
                    </label>
                    <div className="text-lg font-bold text-green-600">
                      {currentLoan.status}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Calculator className="w-4 h-4" />
                    <span>EMI Calculator</span>
                  </button>
                  <button className="flex-1 px-4 py-3 bg-white border border-blue-300 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Schedule */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-1">
                  Payment Schedule
                </h3>
                <p className="text-sm text-blue-500">
                  Upcoming payments and history
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200 transition-all duration-200">
                  View All
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                  Export Schedule
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-blue-700">
                      Month
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-blue-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-blue-700">
                      EMI Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-blue-700">
                      Principal
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-blue-700">
                      Interest
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-blue-700">
                      Balance
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-blue-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentSchedule.map((payment, index) => (
                    <tr
                      key={index}
                      className="border-b border-blue-100 hover:bg-blue-50/50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 text-sm font-medium text-blue-800">
                        {payment.month}
                      </td>
                      <td className="py-4 px-4 text-sm text-blue-700">
                        {formatDate(payment.date)}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-blue-800">
                        {formatCurrency(payment.emi)}
                      </td>
                      <td className="py-4 px-4 text-sm text-blue-700">
                        {formatCurrency(payment.principal)}
                      </td>
                      <td className="py-4 px-4 text-sm text-blue-700">
                        {formatCurrency(payment.interest)}
                      </td>
                      <td className="py-4 px-4 text-sm text-blue-700">
                        {formatCurrency(payment.balance)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            payment.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : payment.status === "Due"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {payment.status === "Paid" && (
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                          )}
                          {payment.status === "Due" && (
                            <AlertCircle className="w-3 h-3 inline mr-1" />
                          )}
                          {payment.status === "Upcoming" && (
                            <Clock className="w-3 h-3 inline mr-1" />
                          )}
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
