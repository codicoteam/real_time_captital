import { useState, type JSX } from "react";
import {
  CreditCard,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  Menu,
  Bell,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Building2,
  Smartphone,
  Settings,
  Shield,
  Info,
  Download,
  Banknote,
} from "lucide-react";
import Sidebar from "../../components/User_Sidebar";
import NotificationBell from '../../components/Notificationsbell';

const Payment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("make-payment");
  const [selectedLoan, setSelectedLoan] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Ecocash");
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [paymentReference, setPaymentReference] = useState("");
  const [notes, setNotes] = useState("");

  const loans = [
    {
      _id: "64a5f123456789abcdef0001",
      loanId: "LN001",
      borrower: "John Doe",
      loanType: "Home Loan",
      currentBalance: 425000,
      monthlyEMI: 10247,
      nextPaymentDate: "2025-07-15",
      dueAmount: 10247,
    },
    {
      _id: "64a5f123456789abcdef0002",
      loanId: "LN002",
      borrower: "Jane Smith",
      loanType: "Business Loan",
      currentBalance: 165000,
      monthlyEMI: 6645,
      nextPaymentDate: "2025-07-10",
      dueAmount: 6645,
    },
    {
      _id: "64a5f123456789abcdef0003",
      loanId: "LN003",
      borrower: "Mike Johnson",
      loanType: "Personal Loan",
      currentBalance: 68500,
      monthlyEMI: 3742,
      nextPaymentDate: "2025-07-20",
      dueAmount: 3742,
    },
  ];

  const paymentHistory = [
    {
      _id: "64a5f123456789abcdef1001",
      loan: "64a5f123456789abcdef0001",
      loanId: "LN001",
      user: "64a5f123456789abcdef2001",
      amountPaid: 10247,
      paymentDate: "2025-06-15",
      paymentMethod: "Ecocash",
      paymentReference: "EC123456789",
      forInstallmentDate: "2025-06-15",
      status: "confirmed",
      notes: "Monthly EMI payment",
      createdAt: "2025-06-15T08:30:00Z",
      updatedAt: "2025-06-15T08:35:00Z",
    },
    {
      _id: "64a5f123456789abcdef1002",
      loan: "64a5f123456789abcdef0001",
      loanId: "LN001",
      user: "64a5f123456789abcdef2001",
      amountPaid: 10247,
      paymentDate: "2025-05-15",
      paymentMethod: "BankTransfer",
      paymentReference: "BT987654321",
      forInstallmentDate: "2025-05-15",
      status: "confirmed",
      notes: "Monthly EMI payment via bank transfer",
      createdAt: "2025-05-15T09:15:00Z",
      updatedAt: "2025-05-15T09:20:00Z",
    },
    {
      _id: "64a5f123456789abcdef1003",
      loan: "64a5f123456789abcdef0002",
      loanId: "LN002",
      user: "64a5f123456789abcdef2002",
      amountPaid: 6645,
      paymentDate: "2025-06-10",
      paymentMethod: "Card",
      paymentReference: "CD456789123",
      forInstallmentDate: "2025-06-10",
      status: "confirmed",
      notes: "Business loan EMI",
      createdAt: "2025-06-10T14:22:00Z",
      updatedAt: "2025-06-10T14:25:00Z",
    },
    {
      _id: "64a5f123456789abcdef1004",
      loan: "64a5f123456789abcdef0003",
      loanId: "LN003",
      user: "64a5f123456789abcdef2003",
      amountPaid: 5000,
      paymentDate: "2025-06-08",
      paymentMethod: "OneMoney",
      paymentReference: "OM789123456",
      forInstallmentDate: "2025-06-08",
      status: "failed",
      notes: "Partial payment attempt",
      createdAt: "2025-06-08T11:45:00Z",
      updatedAt: "2025-06-08T11:50:00Z",
    },
    {
      _id: "64a5f123456789abcdef1005",
      loan: "64a5f123456789abcdef0001",
      loanId: "LN001",
      user: "64a5f123456789abcdef2001",
      amountPaid: 10247,
      paymentDate: "2025-04-15",
      paymentMethod: "Innsbucks",
      paymentReference: "IB321654987",
      forInstallmentDate: "2025-04-15",
      status: "confirmed",
      notes: "Regular monthly payment",
      createdAt: "2025-04-15T16:30:00Z",
      updatedAt: "2025-04-15T16:35:00Z",
    },
  ];

  const currentLoan = loans[selectedLoan];

  const formatCurrency = (amount: number | bigint) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString: string | number | Date) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusIcon = (status: string) => {
    const icons: { [key: string]: JSX.Element } = {
      confirmed: <CheckCircle className="w-4 h-4 text-green-600" />,
      failed: <XCircle className="w-4 h-4 text-red-600" />,
      pending: <Clock className="w-4 h-4 text-yellow-600" />,
    };
    return icons[status] || <AlertCircle className="w-4 h-4 text-gray-600" />;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      confirmed: "bg-green-100 text-green-700 border-green-200",
      failed: "bg-red-100 text-red-700 border-red-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const filteredHistory = paymentHistory.filter(
    (payment) =>
      filterStatus === "all" || payment.status.toLowerCase() === filterStatus
  );

  const handlePayment = () => {
    if (!paymentReference.trim()) {
      alert("Please enter a payment reference number");
      return;
    }
    alert(
      `Processing payment of ${formatCurrency(
        parseFloat(paymentAmount) || currentLoan.dueAmount
      )} via ${paymentMethod} with reference: ${paymentReference}`
    );
  };

  const tabs = [
    { id: "make-payment", label: "Make Payment", icon: CreditCard },
    { id: "history", label: "Payment History", icon: Clock },
    { id: "auto-pay", label: "Auto Payment", icon: Settings },
  ];

  const paymentMethods = [
    { id: "Ecocash", label: "Ecocash", icon: Smartphone },
    { id: "OneMoney", label: "OneMoney", icon: Smartphone },
    { id: "Innsbucks", label: "Innsbucks", icon: Wallet },
    { id: "BankTransfer", label: "Bank Transfer", icon: Building2 },
    { id: "Cash", label: "Cash", icon: Banknote },
    { id: "Card", label: "Card", icon: CreditCard },
  ];

  const summaryCards = [
    {
      title: "Confirmed Payments",
      value: paymentHistory.filter((p) => p.status === "confirmed").length,
      icon: CheckCircle,
      color: "green",
      arrow: ArrowUpRight,
    },
    {
      title: "Failed Payments",
      value: paymentHistory.filter((p) => p.status === "failed").length,
      icon: XCircle,
      color: "red",
      arrow: ArrowDownLeft,
    },
    {
      title: "Total Paid",
      value: formatCurrency(
        paymentHistory
          .filter((p) => p.status === "confirmed")
          .reduce((sum, p) => sum + p.amountPaid, 0)
      ),
      icon: DollarSign,
      color: "blue",
      arrow: ArrowUpRight,
    },
    {
      title: "This Month",
      value: paymentHistory.filter(
        (p) => new Date(p.paymentDate).getMonth() === new Date().getMonth()
      ).length,
      icon: Calendar,
      color: "purple",
      arrow: Info,
    },
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
                  <span className="text-blue-500">Payments</span>
                  <span className="text-blue-300">›</span>
                  <span className="text-blue-700 font-medium">
                    Payment Management
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  className="pl-10 pr-4 py-2 w-64 bg-blue-100/50 border border-blue-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200"
                />
              </div>
            <NotificationBell />
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

        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Tab Navigation */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50">
            <div className="flex space-x-2">
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
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Make Payment Tab */}
          {activeTab === "make-payment" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">
                    Select Loan Account
                  </h3>
                  <div className="space-y-3">
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
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-semibold text-blue-800">
                            {loan.loanId}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                        <div className="text-lg font-bold text-blue-900 mb-1">
                          {loan.borrower}
                        </div>
                        <div className="text-sm text-blue-600 mb-2">
                          {loan.loanType}
                        </div>
                        <div className="text-sm font-semibold text-red-600">
                          Due: {formatCurrency(loan.dueAmount)}
                        </div>
                        <div className="text-xs text-blue-500 mt-1">
                          Next Payment: {formatDate(loan.nextPaymentDate)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">
                      Payment Details
                    </h3>
                    <p className="text-sm text-blue-500">
                      Make a payment for loan {currentLoan.loanId}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium text-red-700">
                          Amount Due
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-red-800">
                        {formatCurrency(currentLoan.dueAmount)}
                      </div>
                      <div className="text-xs text-red-600 mt-1">
                        Due on {formatDate(currentLoan.nextPaymentDate)}
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">
                          Outstanding Balance
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-blue-800">
                        {formatCurrency(currentLoan.currentBalance)}
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        Total remaining amount
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-3">
                        Payment Amount
                      </label>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                          onClick={() =>
                            setPaymentAmount(currentLoan.dueAmount.toString())
                          }
                          className="p-3 border-2 border-blue-200 rounded-xl text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                        >
                          <div className="text-sm font-medium text-blue-700">
                            Pay EMI Amount
                          </div>
                          <div className="text-lg font-bold text-blue-800">
                            {formatCurrency(currentLoan.dueAmount)}
                          </div>
                        </button>
                        <button
                          onClick={() => setPaymentAmount("")}
                          className="p-3 border-2 border-purple-200 rounded-xl text-center hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                        >
                          <div className="text-sm font-medium text-purple-700">
                            Custom Amount
                          </div>
                          <div className="text-lg font-bold text-purple-800">
                            Enter Amount
                          </div>
                        </button>
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          placeholder="Enter payment amount"
                          className="w-full pl-12 pr-4 py-4 bg-white border border-blue-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-3">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {paymentMethods.map((method) => {
                          const IconComponent = method.icon;
                          return (
                            <button
                              key={method.id}
                              onClick={() => setPaymentMethod(method.id)}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                paymentMethod === method.id
                                  ? "border-blue-500 bg-blue-50 shadow-lg"
                                  : "border-blue-200 hover:border-blue-300 hover:bg-blue-50/50"
                              }`}
                            >
                              <IconComponent className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                              <div className="text-sm font-medium text-blue-700">
                                {method.label}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-3">
                        Payment Reference{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={paymentReference}
                        onChange={(e) => setPaymentReference(e.target.value)}
                        placeholder="Enter payment reference number"
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                        required
                      />
                      <p className="text-xs text-blue-500 mt-1">
                        Required: Transaction ID or reference number from your
                        payment provider
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-3">
                        Notes (Optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any additional notes about this payment"
                        rows={3}
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                      />
                    </div>

                    <div className="pt-4 border-t border-blue-200">
                      <button
                        onClick={handlePayment}
                        className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
                      >
                        <Shield className="w-5 h-5" />
                        <span>
                          Pay{" "}
                          {formatCurrency(
                            parseFloat(paymentAmount) || currentLoan.dueAmount
                          )}{" "}
                          Securely
                        </span>
                      </button>
                      <div className="flex items-center justify-center space-x-1 mt-3 text-xs text-blue-500">
                        <Shield className="w-3 h-3" />
                        <span>256-bit SSL encrypted • PCI DSS compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === "history" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {summaryCards.map((card, index) => {
                  const IconComponent = card.icon;
                  const ArrowComponent = card.arrow;
                  return (
                    <div
                      key={index}
                      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-${card.color}-100`}>
                          <IconComponent
                            className={`w-6 h-6 text-${card.color}-700`}
                          />
                        </div>
                        <ArrowComponent
                          className={`w-4 h-4 text-${card.color}-600`}
                        />
                      </div>
                      <div className="space-y-2">
                        <h3
                          className={`text-sm font-medium text-${card.color}-600`}
                        >
                          {card.title}
                        </h3>
                        <div
                          className={`text-2xl font-bold text-${card.color}-800`}
                        >
                          {card.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-1">
                      Payment History
                    </h3>
                    <p className="text-sm text-blue-500">
                      Complete transaction history
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 bg-white border border-blue-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="all">All Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="failed">Failed</option>
                      <option value="pending">Pending</option>
                    </select>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200 transition-all duration-200">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-200">
                        {[
                          "Payment Reference",
                          "Loan ID",
                          "Amount Paid",
                          "Payment Date",
                          "Method",
                          "For Installment",
                          "Status",
                          "Notes",
                        ].map((header) => (
                          <th
                            key={header}
                            className="text-left py-3 px-4 text-sm font-semibold text-blue-700"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.map((payment, index) => (
                        <tr
                          key={index}
                          className="border-b border-blue-100 hover:bg-blue-50/50 transition-colors duration-200"
                        >
                          <td className="py-4 px-4 text-sm font-medium text-blue-800">
                            {payment.paymentReference}
                          </td>
                          <td className="py-4 px-4 text-sm text-blue-700">
                            {payment.loanId}
                          </td>
                          <td className="py-4 px-4 text-sm font-semibold text-blue-800">
                            {formatCurrency(payment.amountPaid)}
                          </td>
                          <td className="py-4 px-4 text-sm text-blue-700">
                            {formatDate(payment.paymentDate)}
                          </td>
                          <td className="py-4 px-4 text-sm text-blue-700">
                            {payment.paymentMethod}
                          </td>
                          <td className="py-4 px-4 text-sm text-blue-700">
                            {formatDate(payment.forInstallmentDate)}
                          </td>
                          <td className="py-4 px-4">
                            <div
                              className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                payment.status
                              )}`}
                            >
                              {getStatusIcon(payment.status)}
                              <span className="capitalize">
                                {payment.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-blue-700 max-w-xs truncate">
                            {payment.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredHistory.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                    <p className="text-blue-500 text-lg font-medium">
                      No payments found
                    </p>
                    <p className="text-blue-400 text-sm">
                      Try adjusting your filter settings
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Auto Payment Tab */}
          {activeTab === "auto-pay" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    Auto Payment Settings
                  </h3>
                  <p className="text-sm text-blue-500">
                    Set up automatic payments for your loans
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                    <div>
                      <h4 className="text-lg font-semibold text-blue-800">
                        Enable Auto Payment
                      </h4>
                      <p className="text-sm text-blue-600">
                        Automatically pay your EMI on due date
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoPayEnabled}
                        onChange={(e) => setAutoPayEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {autoPayEnabled && (
                    <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-3">
                          Select Loan for Auto Payment
                        </label>
                        <select className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
                          {loans.map((loan) => (
                            <option key={loan._id} value={loan._id}>
                              {loan.loanId} - {loan.borrower} ({loan.loanType})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-3">
                          Payment Method
                        </label>
                        <select className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
                          {paymentMethods.map((method) => (
                            <option key={method.id} value={method.id}>
                              {method.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-3">
                          Payment Date Preference
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="p-3 border-2 border-blue-500 bg-blue-50 rounded-xl text-center">
                            <div className="text-sm font-medium text-blue-700">
                              On Due Date
                            </div>
                            <div className="text-xs text-blue-600 mt-1">
                              Pay exactly on due date
                            </div>
                          </button>
                          <button className="p-3 border-2 border-blue-200 rounded-xl text-center hover:border-blue-300">
                            <div className="text-sm font-medium text-blue-700">
                              3 Days Early
                            </div>
                            <div className="text-xs text-blue-600 mt-1">
                              Pay 3 days before due
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2">
                          <CheckCircle className="w-5 h-5" />
                          <span>Save Auto Payment Settings</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    Benefits of Auto Payment
                  </h3>
                  <p className="text-sm text-blue-500">
                    Why you should enable automatic payments
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: CheckCircle,
                      title: "Never Miss a Payment",
                      description:
                        "Automatic payments ensure you never miss your EMI due date",
                    },
                    {
                      icon: Shield,
                      title: "Secure & Reliable",
                      description:
                        "Bank-grade security with automated transaction processing",
                    },
                    {
                      icon: Clock,
                      title: "Save Time",
                      description:
                        "No need to manually process payments every month",
                    },
                    {
                      icon: DollarSign,
                      title: "Avoid Late Fees",
                      description:
                        "Prevent penalty charges from delayed payments",
                    },
                  ].map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
                      >
                        <div className="p-2 bg-green-100 rounded-xl">
                          <IconComponent className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-green-800 mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-xs text-green-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-800 mb-1">
                        Important Note
                      </h4>
                      <p className="text-xs text-yellow-700">
                        Ensure sufficient balance in your selected payment
                        method before the auto-debit date. You can disable auto
                        payment anytime from this settings page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Payment;
