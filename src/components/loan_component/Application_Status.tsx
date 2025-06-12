import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import LoanService from "../../services/user_Services/loan_Service"; // Adjust the import path as needed

// Type definitions
interface Application {
  id: string;
  productType: "vehicle" | "solar" | "finishing_touch";
  type: string;
  amount: number;
  status: "approved" | "pending" | "under_review" | "rejected";
  date: string;
  progress: number;
}

interface StatusConfig {
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

interface ApplicationStatusProps {
  applications?: Application[];
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  applications,
}) => {
  const [applicationsData, setApplicationsData] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch applications from API
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await LoanService.getAllLoans();
      // Transform API response to match Application interface
      const transformedData: Application[] =
        response.data?.map((loan: any) => ({
          id: loan.id || loan._id,
          productType: mapProductType(loan.loanType || loan.type),
          type: loan.loanType || loan.type || "Loan",
          amount: loan.amount || 0,
          status: mapStatus(loan.status),
          date: loan.createdAt || loan.date || new Date().toISOString(),
          progress: calculateProgress(loan.status, loan.stage),
        })) || [];

      setApplicationsData(transformedData);
    } catch (err) {
      setError("Failed to fetch applications");
      console.error("Error fetching applications:", err);
      setApplicationsData([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to map loan types to product types
  const mapProductType = (
    loanType: string
  ): "vehicle" | "solar" | "finishing_touch" => {
    const type = loanType?.toLowerCase();
    if (
      type?.includes("vehicle") ||
      type?.includes("car") ||
      type?.includes("auto")
    ) {
      return "vehicle";
    }
    if (type?.includes("solar")) {
      return "solar";
    }
    return "finishing_touch";
  };

  // Helper function to map API status to component status
  const mapStatus = (
    apiStatus: string
  ): "approved" | "pending" | "under_review" | "rejected" => {
    const status = apiStatus?.toLowerCase();
    switch (status) {
      case "approved":
      case "active":
        return "approved";
      case "pending":
        return "pending";
      case "review":
      case "under_review":
      case "processing":
        return "under_review";
      case "rejected":
      case "declined":
        return "rejected";
      default:
        return "pending";
    }
  };

  // Helper function to calculate progress based on status and stage
  const calculateProgress = (status: string, stage?: string): number => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "approved":
      case "active":
        return 100;
      case "under_review":
      case "processing":
        return 60;
      case "pending":
        return 30;
      case "rejected":
      case "declined":
        return 0;
      default:
        return 20;
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (!applications) {
      fetchApplications();
    } else {
      setApplicationsData(applications);
    }
  }, [applications]);

  const getStatusConfig = (status: Application["status"]): StatusConfig => {
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
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-blue-600" />
              Application Status
            </h3>
            <p className="text-sm text-blue-500">
              Track your current loan applications
            </p>
          </div>
          {!applications && (
            <button
              onClick={fetchApplications}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          )}
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mr-2" />
          <span className="text-blue-600">Loading applications...</span>
        </div>
      ) : applicationsData.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-blue-300 mx-auto mb-4" />
          <p className="text-blue-600 text-lg mb-2">No applications found</p>
          <p className="text-blue-500 text-sm">
            You don't have any loan applications yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applicationsData.map((app) => {
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
                      <h4 className="font-semibold text-blue-800">
                        {app.type}
                      </h4>
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
                  <span>
                    Applied: {new Date(app.date).toLocaleDateString()}
                  </span>
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
