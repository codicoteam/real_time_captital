import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  CreditCard,
  RefreshCw,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
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
    } catch (err: any) {
      setError(err.message || "Failed to fetch loan applications");
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
          bgColor: "bg-green-100 border-green-200",
          icon: CheckCircle,
          text: "Approved",
          description:
            "Your loan has been approved and is ready for disbursement",
        };
      case "active":
        return {
          color: "text-blue-700",
          bgColor: "bg-blue-100 border-blue-200",
          icon: CheckCircle,
          text: "Active",
          description: "Your loan is currently active and running",
        };
      case "pending":
        return {
          color: "text-orange-700",
          bgColor: "bg-orange-100 border-orange-200",
          icon: Clock,
          text: "Pending Review",
          description: "Your application is being reviewed by our team",
        };
      case "rejected":
        return {
          color: "text-red-700",
          bgColor: "bg-red-100 border-red-200",
          icon: XCircle,
          text: "Rejected",
          description: "Unfortunately, your loan application was not approved",
        };
      case "closed":
        return {
          color: "text-gray-700",
          bgColor: "bg-gray-100 border-gray-200",
          icon: FileText,
          text: "Closed",
          description: "This loan has been completed or closed",
        };
      default:
        return {
          color: "text-gray-700",
          bgColor: "bg-gray-100 border-gray-200",
          icon: Clock,
          text: status,
          description: "Status information",
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
        return 75;
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

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-blue-600" />
              Loan Applications Status
            </h3>
            <p className="text-sm text-blue-500">
              Track your current loan applications and active loans
            </p>
            {lastUpdated && (
              <p className="text-xs text-blue-400 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          {!applications && (
            <button
              onClick={fetchApplications}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mr-3" />
          <span className="text-blue-600">
            Loading your loan applications...
          </span>
        </div>
      ) : applicationsData.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-blue-300 mx-auto mb-4" />
          <p className="text-blue-600 text-lg mb-2 font-medium">
            No loan applications found
          </p>
          <p className="text-blue-500 text-sm">
            You don't have any loan applications yet. Apply for a loan to get
            started.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {applicationsData.map((loan) => {
            const statusConfig = getStatusConfig(loan.status);
            const StatusIcon = statusConfig.icon;
            const progress = calculateProgress(loan);

            return (
              <div
                key={loan._id}
                className={`p-6 border-2 rounded-xl hover:shadow-lg transition-all duration-300 ${statusConfig.bgColor}`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900 text-lg">
                        {getProductTypeDisplay(loan.productType)}
                      </h4>
                      <p className="text-blue-700 font-semibold">
                        {formatCurrency(loan.amount)}
                      </p>
                      {loan.borrowerInfo?.firstName && (
                        <p className="text-blue-600 text-sm flex items-center mt-1">
                          <User className="w-3 h-3 mr-1" />
                          {loan.borrowerInfo.firstName}{" "}
                          {loan.borrowerInfo.surname}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-full text-sm font-bold flex items-center ${statusConfig.color} bg-white/80`}
                  >
                    <StatusIcon className="w-4 h-4 mr-2" />
                    {statusConfig.text}
                  </div>
                </div>

                {/* Status Description */}
                <div className="mb-4 p-3 bg-white/60 rounded-lg">
                  <p className="text-sm text-blue-700">
                    {statusConfig.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-700 font-medium">
                      Application Progress
                    </span>
                    <span className="text-blue-900 font-bold">{progress}%</span>
                  </div>
                  <div className="w-full bg-blue-200/60 rounded-full h-3 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 shadow-sm"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Loan Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {loan.interestRate && (
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-blue-600">Interest Rate: </span>
                      <span className="font-semibold text-blue-800 ml-1">
                        {loan.interestRate}%
                      </span>
                    </div>
                  )}

                  {loan.term && (
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-blue-600">Term: </span>
                      <span className="font-semibold text-blue-800 ml-1">
                        {loan.term} months
                      </span>
                    </div>
                  )}

                  {loan.balance !== undefined && loan.status === "active" && (
                    <div className="flex items-center text-sm">
                      <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-blue-600">Balance: </span>
                      <span className="font-semibold text-blue-800 ml-1">
                        {formatCurrency(loan.balance)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-blue-600 pt-4 border-t border-blue-200/50">
                  <span className="font-medium">
                    Application ID: {loan._id.slice(-8).toUpperCase()}
                  </span>
                  <div className="flex items-center space-x-4">
                    <span>Applied: {formatDate(loan.applicationDate)}</span>
                    {loan.approvalDate && (
                      <span>Approved: {formatDate(loan.approvalDate)}</span>
                    )}
                    {loan.startDate && (
                      <span>Started: {formatDate(loan.startDate)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
