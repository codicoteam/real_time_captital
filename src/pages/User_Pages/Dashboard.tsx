import { useState, useEffect } from "react";
import {
  DollarSign,
  Percent,
  Clock,
  Menu,
  Search,
  ChevronDown,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Download,
  Loader2,
  Bell,
} from "lucide-react";
import Sidebar from "../../components/User_Sidebar";
import NotificationBell from "../../components/Notificationsbell";
import LoanService from "../../services/user_Services/loan_Service"; // Adjust path as needed

interface Loan {
  _id: string;
  productType: string;
  borrowerInfo: {
    firstName: string;
    surname: string;
    email: string;
  };
  amount: number;
  interestRate: number;
  term: number;
  balance: number;
  status: string;
  startDate?: string;
  applicationDate: string;
  paymentSchedule: PaymentScheduleItem[];
}

interface PaymentScheduleItem {
  dueDate: string;
  amountDue: number;
  amountPaid: number;
  paidOn?: string;
  status: "pending" | "paid" | "overdue";
}

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(0);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Updated useEffect for fetching loans by user ID
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("userToken");

        if (!token) {
          setError("No authentication token found");
          return;
        }

        // Decode the token to get user ID
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;

        // Use getLoansByUserId instead of getAllLoans
        const response = await LoanService.getLoansByUserId(userId);

        // Get user's loans only
        const userLoans = response.data || [];

        setLoans(userLoans);

        if (userLoans.length === 0) {
          setError("No loans found");
        }
      } catch (err: any) {
        console.error("Error fetching loans:", err);
        setError(err.message || "Failed to fetch loans");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Return early if loading or error
  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-blue-600">Loading loans...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || loans.length === 0) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
                  className="lg:hidden mr-4 p-2 rounded-xl bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 transition-all duration-200"
                >
                  <Menu className="w-5 h-5 text-white" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600">Dashboard</span>
                    <span className="text-gray-400">›</span>
                    <span className="text-black font-medium">Loan Details</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search loans..."
                    className="pl-10 pr-4 py-2 w-64 bg-gray-100/50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-200"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-xl bg-gray-100/50 hover:bg-gray-200/50 transition-all duration-200 group">
                  <Bell className="w-5 h-5 text-gray-600 group-hover:text-black" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">3</span>
                  </div>
                </button>

                <NotificationBell />

                {/* User Profile */}
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-semibold text-black">User</div>
                    <div className="text-xs text-gray-600">Borrower</div>
                  </div>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                      <span className="text-white font-semibold text-sm">
                        U
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          </header>

          {/* No Loans Content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <AlertCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-blue-800 mb-2">
                No Active Loans
              </h2>
              <p className="text-blue-600">
                {error || "You don't have any active loans at the moment."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentLoan = loans[selectedLoan];

  // Generate payment schedule for the selected loan
  const generatePaymentSchedule = (loan: Loan) => {
    // If loan has existing payment schedule, use it
    if (loan.paymentSchedule && loan.paymentSchedule.length > 0) {
      return loan.paymentSchedule.slice(0, 12).map((payment, index) => ({
        month: index + 1,
        date: payment.dueDate,
        emi: payment.amountDue,
        principal: payment.amountDue * 0.7, // Approximate - you may need actual calculation
        interest: payment.amountDue * 0.3, // Approximate - you may need actual calculation
        balance: loan.balance - payment.amountPaid * (index + 1),
        status:
          payment.status === "paid"
            ? "Paid"
            : payment.status === "overdue"
            ? "Overdue"
            : index === 0
            ? "Due"
            : "Upcoming",
      }));
    }

    // Generate schedule if not available
    const schedule = [];
    const monthlyRate = (loan.interestRate || 0) / 100 / 12;
    const totalPayments = loan.term || 12;
    let balance = loan.amount || 0;

    // Calculate EMI using standard formula
    const emi =
      monthlyRate > 0
        ? (balance * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
          (Math.pow(1 + monthlyRate, totalPayments) - 1)
        : balance / totalPayments;

    const startDate = new Date(loan.startDate || loan.applicationDate);

    for (let i = 1; i <= Math.min(12, totalPayments); i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i - 1);

      schedule.push({
        month: i,
        date: paymentDate.toISOString().split("T")[0],
        emi: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
        status: "Upcoming",
      });
    }
    return schedule;
  };

  const paymentSchedule = generatePaymentSchedule(currentLoan);

  const formatCurrency = (amount: number | undefined) => {
    if (!amount && amount !== 0) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getProgressPercentage = (loan: Loan) => {
    if (!loan.amount || !loan.balance) return 0;
    return ((loan.amount - loan.balance) / loan.amount) * 100;
  };

  const getPaymentsCompleted = (loan: Loan) => {
    if (loan.paymentSchedule) {
      return loan.paymentSchedule.filter((p) => p.status === "paid").length;
    }
    return 0;
  };

  const getTotalPaid = (loan: Loan) => {
    if (loan.paymentSchedule) {
      return loan.paymentSchedule
        .filter((p) => p.status === "paid")
        .reduce((sum, p) => sum + p.amountPaid, 0);
    }
    return loan.amount - loan.balance;
  };

  const getNextPaymentDate = (loan: Loan) => {
    if (loan.paymentSchedule) {
      const nextPayment = loan.paymentSchedule.find(
        (p) => p.status === "pending"
      );
      return nextPayment?.dueDate;
    }
    return undefined;
  };

  const getMonthlyEMI = (loan: Loan) => {
    if (loan.paymentSchedule && loan.paymentSchedule.length > 0) {
      return loan.paymentSchedule[0].amountDue;
    }

    // Calculate EMI if not available
    const monthlyRate = (loan.interestRate || 0) / 100 / 12;
    const totalPayments = loan.term || 12;
    const principal = loan.amount || 0;

    if (monthlyRate > 0) {
      return (
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
      );
    }
    return principal / totalPayments;
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
                className="lg:hidden mr-4 p-2 rounded-xl bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600">Dashboard</span>
                  <span className="text-gray-400">›</span>
                  <span className="text-black font-medium">Loan Details</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search loans..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-100/50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-200"
                />
              </div>

              <NotificationBell />

              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-black">
                    {currentLoan?.borrowerInfo?.firstName}{" "}
                    {currentLoan?.borrowerInfo?.surname}
                  </div>
                  <div className="text-xs text-gray-600">Borrower</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <span className="text-white font-semibold text-sm">
                      {currentLoan?.borrowerInfo?.firstName?.[0]}
                      {currentLoan?.borrowerInfo?.surname?.[0]}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Loan Selection */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <h2 className="text-lg font-bold text-black mb-3">
              Select Loan Account
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {loans.map((loan, index) => (
                <div
                  key={loan._id}
                  onClick={() => setSelectedLoan(index)}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                    selectedLoan === index
                      ? "border-green-500 bg-green-50 shadow-lg"
                      : "border-gray-300 bg-white/50 hover:border-green-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-black">
                      {loan._id.slice(-6).toUpperCase()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        loan.status === "active"
                          ? "bg-green-100 text-green-700"
                          : loan.status === "approved"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </div>
                  <div className="text-base font-bold text-black mb-2">
                    {loan.borrowerInfo?.firstName} {loan.borrowerInfo?.surname}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {loan.productType}
                    </div>
                    <div className="text-sm font-semibold text-black">
                      {formatCurrency(loan.balance)} remaining
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-red-100">
                  <DollarSign className="w-5 h-5 text-red-700" />
                </div>
                <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  Original
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-600">
                  Loan Amount
                </h3>
                <div className="text-xl font-bold text-black">
                  {formatCurrency(currentLoan.amount)}
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-green-100">
                  <TrendingUp className="w-5 h-5 text-green-700" />
                </div>
                <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  Current
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-600">
                  Outstanding Balance
                </h3>
                <div className="text-xl font-bold text-black">
                  {formatCurrency(currentLoan.balance)}
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-green-100">
                  <Percent className="w-5 h-5 text-green-700" />
                </div>
                <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  Rate
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-600">
                  Interest Rate
                </h3>
                <div className="text-xl font-bold text-black">
                  {currentLoan.interestRate || 0}%
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-green-100">
                  <CreditCard className="w-5 h-5 text-green-700" />
                </div>
                <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  Monthly
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-600">
                  EMI Amount
                </h3>
                <div className="text-xl font-bold text-black">
                  {formatCurrency(getMonthlyEMI(currentLoan))}
                </div>
              </div>
            </div>
          </div>

          {/* Loan Progress and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loan Progress */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-1">
                  Loan Progress
                </h3>
                <p className="text-sm text-gray-600">
                  Repayment status and timeline
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Repayment Progress
                  </span>
                  <span className="text-sm font-bold text-black">
                    {getProgressPercentage(currentLoan).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-full transition-all duration-1000 relative"
                    style={{ width: `${getProgressPercentage(currentLoan)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-lg font-bold text-black">
                    {getPaymentsCompleted(currentLoan)}
                  </div>
                  <div className="text-sm text-gray-600">Payments Made</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                  <div className="text-lg font-bold text-black">
                    {(currentLoan.term || 0) -
                      getPaymentsCompleted(currentLoan)}
                  </div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>

              {/* Key Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Total Paid</span>
                  <span className="font-semibold text-black">
                    {formatCurrency(getTotalPaid(currentLoan))}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Next Payment</span>
                  <span className="font-semibold text-black">
                    {formatDate(getNextPaymentDate(currentLoan))}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Loan Tenure</span>
                  <span className="font-semibold text-black">
                    {currentLoan.term || 0} months
                  </span>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-1">
                  Loan Details
                </h3>
                <p className="text-sm text-gray-600">
                  Complete loan information
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Loan ID
                    </label>
                    <div className="text-base font-bold text-black">
                      {currentLoan._id.slice(-8).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Borrower
                    </label>
                    <div className="text-base font-bold text-black">
                      {currentLoan.borrowerInfo?.firstName}{" "}
                      {currentLoan.borrowerInfo?.surname}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Loan Type
                    </label>
                    <div className="text-base font-bold text-black">
                      {currentLoan.productType}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <div className="text-base font-bold text-black">
                      {currentLoan.borrowerInfo?.email || "N/A"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Start Date
                    </label>
                    <div className="text-base font-bold text-black">
                      {formatDate(
                        currentLoan.startDate || currentLoan.applicationDate
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <div className="text-base font-bold text-green-600 capitalize">
                      {currentLoan.status}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-xl text-sm font-medium hover:from-green-600 hover:via-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Make Payment</span>
                  </button>
                  <button className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Schedule */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-black mb-1">
                  Payment Schedule
                </h3>
                <p className="text-sm text-gray-600">
                  Upcoming and past payments
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white rounded-xl text-sm font-medium hover:from-green-600 hover:via-green-700 hover:to-green-800 transition-all duration-200">
                  View All
                </button>
              </div>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-7 gap-4 mb-4 pb-3 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <div>Month</div>
              <div>Due Date</div>
              <div>EMI Amount</div>
              <div>Principal</div>
              <div>Interest</div>
              <div>Balance</div>
              <div>Status</div>
            </div>

            {/* Payment Schedule Rows */}
            <div className="space-y-3">
              {paymentSchedule.slice(0, 6).map((payment, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 bg-white/50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex md:block items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 md:hidden">
                      Month:
                    </span>
                    <span className="text-sm font-semibold text-black">
                      {payment.month}
                    </span>
                  </div>
                  <div className="flex md:block items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 md:hidden">
                      Due Date:
                    </span>
                    <span className="text-sm font-semibold text-black">
                      {formatDate(payment.date)}
                    </span>
                  </div>
                  <div className="flex md:block items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 md:hidden">
                      EMI Amount:
                    </span>
                    <span className="text-sm font-bold text-black">
                      {formatCurrency(payment.emi)}
                    </span>
                  </div>
                  <div className="flex md:block items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 md:hidden">
                      Principal:
                    </span>
                    <span className="text-sm text-gray-700">
                      {formatCurrency(payment.principal)}
                    </span>
                  </div>
                  <div className="flex md:block items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 md:hidden">
                      Interest:
                    </span>
                    <span className="text-sm text-gray-700">
                      {formatCurrency(payment.interest)}
                    </span>
                  </div>
                  <div className="flex md:block items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 md:hidden">
                      Balance:
                    </span>
                    <span className="text-sm text-gray-700">
                      {formatCurrency(payment.balance)}
                    </span>
                  </div>
                  <div className="flex md:block items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 md:hidden">
                      Status:
                    </span>
                    <div className="flex items-center">
                      {payment.status === "Paid" && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            Paid
                          </span>
                        </div>
                      )}
                      {payment.status === "Due" && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            Due
                          </span>
                        </div>
                      )}
                      {payment.status === "Overdue" && (
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium text-red-600">
                            Overdue
                          </span>
                        </div>
                      )}
                      {payment.status === "Upcoming" && (
                        <span className="text-sm font-medium text-gray-600">
                          Upcoming
                        </span>
                      )}
                </div>
                  </div>
                </div>
              ))}
            </div>

            {paymentSchedule.length > 6 && (
              <div className="text-center mt-4">
                <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all duration-200">
                  Load More Payments
                </button>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-black mb-1">
                Recent Activity
              </h3>
              <p className="text-sm text-gray-600">
                Latest transactions and updates
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  type: "payment",
                  message: "Payment received",
                  amount: formatCurrency(getMonthlyEMI(currentLoan)),
                  date: formatDate(getNextPaymentDate(currentLoan)),
                  status: "success",
                },
                {
                  type: "reminder",
                  message: "Payment reminder sent",
                  amount: null,
                  date: new Date().toLocaleDateString(),
                  status: "info",
                },
                {
                  type: "update",
                  message: "Account statement generated",
                  amount: null,
                  date: new Date(Date.now() - 86400000).toLocaleDateString(),
                  status: "info",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-gray-200"
                >
                  <div
                    className={`p-2 rounded-xl ${
                      activity.status === "success"
                        ? "bg-green-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {activity.type === "payment" && (
                      <DollarSign
                        className={`w-5 h-5 ${
                          activity.status === "success"
                            ? "text-green-700"
                            : "text-blue-700"
                        }`}
                      />
                    )}
                    {activity.type === "reminder" && (
                      <Bell className="w-5 h-5 text-blue-700" />
                    )}
                    {activity.type === "update" && (
                      <CheckCircle className="w-5 h-5 text-blue-700" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-black">
                      {activity.message}
                    </div>
                    <div className="text-xs text-gray-600">{activity.date}</div>
                  </div>
                  {activity.amount && (
                    <div className="text-sm font-bold text-green-600">
                      {activity.amount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;