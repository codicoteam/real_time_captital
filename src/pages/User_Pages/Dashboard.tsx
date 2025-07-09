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
  Calculator,
  Loader2,
} from "lucide-react";
import Sidebar from "../../components/User_Sidebar";
import NotificationBell from '../../components/Notificationsbell';
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

  // Fetch loans from backend
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const response = await LoanService.getAllLoans();

        // Get all loans without filtering
        const allLoans = response.data || [];

        setLoans(allLoans);

        if (allLoans.length === 0) {
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
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              No Active Loans
            </h2>
            <p className="text-blue-600">
              {error || "You don't have any active loans at the moment."}
            </p>
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
            
              <NotificationBell />


              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-4 border-l border-blue-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-blue-700">
                    {currentLoan?.borrowerInfo?.firstName}{" "}
                    {currentLoan?.borrowerInfo?.surname}
                  </div>
                  <div className="text-xs text-blue-500">Borrower</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <span className="text-white font-semibold text-sm">
                      {currentLoan?.borrowerInfo?.firstName?.[0]}
                      {currentLoan?.borrowerInfo?.surname?.[0]}
                    </span>
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
                  key={loan._id}
                  onClick={() => setSelectedLoan(index)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                    selectedLoan === index
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-blue-200/50 bg-white/50 hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-800">
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
                  <div className="text-lg font-bold text-blue-900">
                    {loan.borrowerInfo?.firstName} {loan.borrowerInfo?.surname}
                  </div>
                  <div className="text-sm text-blue-600">
                    {loan.productType}
                  </div>
                  <div className="text-sm font-semibold text-blue-800 mt-2">
                    {formatCurrency(loan.balance)} remaining
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
                  {formatCurrency(currentLoan.amount)}
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
                  {formatCurrency(currentLoan.balance)}
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
                  {currentLoan.interestRate || 0}%
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
                  {formatCurrency(getMonthlyEMI(currentLoan))}
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
                    {getPaymentsCompleted(currentLoan)}
                  </div>
                  <div className="text-sm text-blue-600">Payments Made</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-800">
                    {(currentLoan.term || 0) -
                      getPaymentsCompleted(currentLoan)}
                  </div>
                  <div className="text-sm text-purple-600">Remaining</div>
                </div>
              </div>

              {/* Key Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-sm text-blue-600">Total Paid</span>
                  <span className="font-semibold text-blue-800">
                    {formatCurrency(getTotalPaid(currentLoan))}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-sm text-blue-600">Next Payment</span>
                  <span className="font-semibold text-blue-800">
                    {formatDate(getNextPaymentDate(currentLoan))}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-blue-600">Loan Tenure</span>
                  <span className="font-semibold text-blue-800">
                    {currentLoan.term || 0} months
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
                      {currentLoan._id.slice(-8).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Borrower
                    </label>
                    <div className="text-lg font-bold text-blue-800">
                      {currentLoan.borrowerInfo?.firstName}{" "}
                      {currentLoan.borrowerInfo?.surname}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Loan Type
                    </label>
                    <div className="text-lg font-bold text-blue-800">
                      {currentLoan.productType}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Email
                    </label>
                    <div className="text-lg font-bold text-blue-800">
                      {currentLoan.borrowerInfo?.email || "N/A"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Start Date
                    </label>
                    <div className="text-lg font-bold text-blue-800">
                      {formatDate(
                        currentLoan.startDate || currentLoan.applicationDate
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">
                      Status
                    </label>
                    <div className="text-lg font-bold text-green-600 capitalize">
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
                              : payment.status === "Overdue"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Payment Schedule Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-600">Next Payment</div>
                    <div className="text-lg font-bold text-blue-800">
                      {formatDate(getNextPaymentDate(currentLoan))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-green-600">Payments Made</div>
                    <div className="text-lg font-bold text-green-800">
                      {getPaymentsCompleted(currentLoan)} /{" "}
                      {currentLoan.term || 0}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-purple-600">Total Paid</div>
                    <div className="text-lg font-bold text-purple-800">
                      {formatCurrency(getTotalPaid(currentLoan))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
