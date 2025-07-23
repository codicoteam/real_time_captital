import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  CreditCard,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Eye,
} from "lucide-react";

// Import your existing LoanService
import LoanService from "../../services/user_Services/loan_Service";

// Updated type definitions based on your loan model
interface LoanApplication {
  _id: string;
  user: string;
  productType: "vehicle" | "solar" | "finishing_touch";
  status: "pending" | "approved" | "rejected" | "active" | "closed";
  applicationDate: string;
  approvalDate?: string;
  startDate?: string;
  endDate?: string;
  amount: number;
  interestRate?: number;
  term?: number;
  balance?: number;
  borrowerInfo: {
    firstName?: string;
    surname?: string;
    email?: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface StatusConfig {
  color: string;
  bgColor: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  description: string;
  gradient: string;
}

interface ApplicationStatusProps {
  applications?: LoanApplication[];
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  applications,
}) => {
  const [applicationsData, setApplicationsData] = useState<LoanApplication[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);

  // Fetch applications from API
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
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

      if (response.data) {
        setApplicationsData(response.data);
        setLastUpdated(new Date());
      } else {
        setApplicationsData([]);
      }
    } catch (err) {
      // Fix for TypeScript error: properly handle unknown error type
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch loan applications";
      setError(errorMessage);
      console.error("Error fetching applications:", err);
      setApplicationsData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (!applications) {
      fetchApplications();
    } else {
      setApplicationsData(applications);
      setLastUpdated(new Date());
    }
  }, [applications]);

  const getStatusConfig = (status: LoanApplication["status"]): StatusConfig => {
    switch (status) {
      case "approved":
        return {
          color: "text-green-700",
          bgColor: "bg-white border-gray-200",
          icon: CheckCircle,
          text: "Approved",
          description:
            "Your loan has been approved and is ready for disbursement",
          gradient: "from-green-500 to-green-600",
        };
      case "active":
        return {
          color: "text-blue-700",
          bgColor: "bg-white border-gray-200",
          icon: CheckCircle,
          text: "Active",
          description: "Your loan is currently active and running",
          gradient: "from-blue-500 to-blue-600",
        };
      case "pending":
        return {
          color: "text-orange-700",
          bgColor: "bg-white border-gray-200",
          icon: Clock,
          text: "Pending Review",
          description: "Your application is being reviewed by our team",
          gradient: "from-orange-500 to-orange-600",
        };
      case "rejected":
        return {
          color: "text-red-700",
          bgColor: "bg-white border-gray-200",
          icon: XCircle,
          text: "Rejected",
          description: "Unfortunately, your loan application was not approved",
          gradient: "from-red-500 to-red-600",
        };
      case "closed":
        return {
          color: "text-gray-700",
          bgColor: "bg-white border-gray-200",
          icon: FileText,
          text: "Closed",
          description: "This loan has been completed or closed",
          gradient: "from-gray-500 to-gray-600",
        };
      default:
        return {
          color: "text-gray-700",
          bgColor: "bg-white border-gray-200",
          icon: Clock,
          text: status,
          description: "Status information",
          gradient: "from-gray-500 to-gray-600",
        };
    }
  };

  const getProductTypeDisplay = (productType: string): string => {
    switch (productType) {
      case "vehicle":
        return "Vehicle Loan";
      case "solar":
        return "Solar Loan";
      case "finishing_touch":
        return "Finishing Touch Loan";
      default:
        return (
          productType.charAt(0).toUpperCase() + productType.slice(1) + " Loan"
        );
    }
  };

  const calculateProgress = (loan: LoanApplication): number => {
    switch (loan.status) {
      case "closed":
        return 100;
      case "active":
        // If we have balance and amount, calculate based on repayment
        if (loan.balance !== undefined && loan.amount) {
          const repaidAmount = loan.amount - loan.balance;
          return Math.round((repaidAmount / loan.amount) * 100);
        }
        return 85;
      case "approved":
        return 100;
      case "pending":
        return 25;
      case "rejected":
        return 0;
      default:
        return 10;
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-ZW", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-ZW", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatsCards = () => {
    const totalAmount = applicationsData.reduce(
      (sum, loan) => sum + loan.amount,
      0
    );
    const activeLoans = applicationsData.filter(
      (loan) => loan.status === "active"
    ).length;
    const pendingLoans = applicationsData.filter(
      (loan) => loan.status === "pending"
    ).length;

    return [
      {
        title: "Total Applied",
        value: formatCurrency(totalAmount),
        icon: DollarSign,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        title: "Active Loans",
        value: activeLoans.toString(),
        icon: TrendingUp,
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        title: "Pending Review",
        value: pendingLoans.toString(),
        icon: Clock,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
    ];
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-black mb-2 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              Loan Applications Status
            </h3>
            <p className="text-gray-600 ml-11 text-sm">
              Track your current loan applications and active loans
            </p>
            {lastUpdated && (
              <p className="text-xs text-gray-500 ml-11 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          {!applications && (
            <button
              onClick={fetchApplications}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md text-sm"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          )}
        </div>

        {/* Stats Cards - Reduced size */}
        {applicationsData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {getStatsCards().map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 font-medium">
                        {stat.title}
                      </p>
                      <p className="text-lg font-bold text-black mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                    >
                      <StatIcon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="font-medium text-sm">{error}</span>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          </div>
          <span className="text-blue-600 font-medium mt-3 text-sm">
            Loading your loan applications...
          </span>
        </div>
      ) : applicationsData.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h4 className="text-black text-lg mb-2 font-bold">
            No loan applications found
          </h4>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed text-sm">
            You don't have any loan applications yet. Apply for a loan to get
            started and track your progress here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {applicationsData.map((loan) => {
            const statusConfig = getStatusConfig(loan.status);
            const StatusIcon = statusConfig.icon;
            const progress = calculateProgress(loan);
            const isExpanded = selectedLoan === loan._id;

            return (
              <div
                key={loan._id}
                className={`relative overflow-hidden border rounded-lg hover:shadow-md transition-all duration-300 ${
                  statusConfig.bgColor
                } ${isExpanded ? "shadow-md" : "shadow-sm"}`}
              >
                {/* Main Content - Much smaller padding */}
                <div className="p-3">
                  {/* Header - Compact */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-black text-sm truncate">
                            {getProductTypeDisplay(loan.productType)}
                          </h4>
                          <div className="flex items-center space-x-2 ml-2">
                            <div
                              className={`px-2 py-1 rounded text-xs font-medium flex items-center ${statusConfig.color} bg-gray-50`}
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig.text}
                            </div>
                            <button
                              onClick={() =>
                                setSelectedLoan(isExpanded ? null : loan._id)
                              }
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Eye className="w-3 h-3 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-black font-bold text-base">
                            {formatCurrency(loan.amount)}
                          </p>
                          {loan.balance !== undefined &&
                            loan.status === "active" && (
                              <p className="text-xs text-gray-600">
                                Balance: {formatCurrency(loan.balance)}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar - Compact */}
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Progress</span>
                      <span className="text-black font-semibold text-xs">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-800 rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick Details - Compact grid */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-50 rounded p-1.5 text-center">
                      <div className="text-gray-600 text-xs">Applied</div>
                      <div className="font-semibold text-black text-xs">
                        {formatDate(loan.applicationDate)}
                      </div>
                    </div>

                    {loan.interestRate && (
                      <div className="bg-gray-50 rounded p-1.5 text-center">
                        <div className="text-gray-600 text-xs">Rate</div>
                        <div className="font-semibold text-black text-xs">
                          {loan.interestRate}%
                        </div>
                      </div>
                    )}

                    {loan.term && (
                      <div className="bg-gray-50 rounded p-1.5 text-center">
                        <div className="text-gray-600 text-xs">Term</div>
                        <div className="font-semibold text-black text-xs">
                          {loan.term}m
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <h5 className="font-semibold text-black mb-1 text-xs">
                            Contact Info
                          </h5>
                          <div className="space-y-1 text-xs">
                            <p className="text-gray-600">
                              {loan.borrowerInfo.email}
                            </p>
                            <p className="text-gray-600">
                              {loan.borrowerInfo.phone}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-black mb-1 text-xs">
                            Timeline
                          </h5>
                          <div className="space-y-1 text-xs">
                            {loan.approvalDate && (
                              <p className="text-gray-600">
                                Approved: {formatDate(loan.approvalDate)}
                              </p>
                            )}
                            {loan.startDate && (
                              <p className="text-gray-600">
                                Started: {formatDate(loan.startDate)}
                              </p>
                            )}
                            <p className="text-gray-600">
                              Updated: {formatDate(loan.updatedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status indicator bar */}
                <div
                  className={`h-0.5 bg-gradient-to-r ${statusConfig.gradient}`}
                ></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
