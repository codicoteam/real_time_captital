import React, { useState, useEffect } from "react";
import {
  Clock,
  Loader2,
  AlertCircle,
  Eye,
  X,
  Calendar,
  DollarSign,
  FileText,
  User,
  TrendingUp,
  CreditCard,
  Building,
  Car,
  GraduationCap,
  Sun,
  CheckCircle,
  XCircle,
  AlertTriangle,
  PlayCircle,
  StopCircle,
  Download,
  Trash2,
} from "lucide-react";
import LoanService from "../../services/user_Services/loan_Service"; // Adjust the import path

// Type definitions
interface HistoryApplication {
  id: string;
  productType: "education" | "vehicle" | "solar" | "building_finisher";
  type: string;
  amount: number;
  status: "approved" | "active" | "rejected" | "pending" | "closed";
  appliedDate: string;
  approvedDate?: string;
  startDate?: string;
  endDate?: string;
  interestRate?: number;
  term?: number;
  balance?: number;
  // Additional fields for detailed view
  monthlyPayment?: number;
  totalInterest?: number;
  purpose?: string;
  collateral?: string;
  creditScore?: number;
  employmentStatus?: string;
  income?: number;
  documents?: string[];
  comments?: string;
  loanOfficer?: string;
}

interface ApplicationHistoryProps {
  history?: HistoryApplication[];
  userId?: string; // Optional user ID for filtering user-specific loans
}

const ApplicationHistory: React.FC<ApplicationHistoryProps> = ({
  history,
  userId,
}) => {
  const [historyData, setHistoryData] = useState<HistoryApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<HistoryApplication | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<HistoryApplication | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // Function to map backend data to our interface
  const mapBackendDataToHistory = (
    backendData: any[]
  ): HistoryApplication[] => {
    return backendData.map((loan: any) => ({
      id: loan._id || loan.id,
      productType: mapProductType(loan.productType),
      type: loan.productType || "Loan",
      amount: loan.amount || 0,
      status: mapStatus(loan.status),
      appliedDate: loan.applicationDate || loan.createdAt,
      approvedDate: loan.approvalDate,
      startDate: loan.startDate,
      endDate: loan.endDate,
      interestRate: loan.interestRate,
      term: loan.term,
      balance: loan.balance,
      // Additional fields
      monthlyPayment: loan.monthlyPayment,
      totalInterest: loan.totalInterest,
      purpose: loan.purpose,
      collateral: loan.collateral,
      creditScore: loan.creditScore,
      employmentStatus: loan.employmentStatus,
      income: loan.income,
      documents: loan.documents || [],
      comments: loan.comments,
      loanOfficer: loan.loanOfficer,
    }));
  };

  // Helper function to map product types based on the schema enum values
  const mapProductType = (
    type: string
  ): "education" | "vehicle" | "solar" | "building_finisher" => {
    const cleanType = type?.toLowerCase().trim() || "";

    if (cleanType.includes("education")) {
      return "education";
    }
    if (cleanType.includes("vehicle")) {
      return "vehicle";
    }
    if (cleanType.includes("solar")) {
      return "solar";
    }
    if (cleanType.includes("building") || cleanType.includes("finisher")) {
      return "building_finisher";
    }
    return "education"; // default
  };

  // Helper function to map status based on the schema enum values
  const mapStatus = (
    status: string
  ): "approved" | "active" | "rejected" | "pending" | "closed" => {
    const lowerStatus = status?.toLowerCase() || "";

    if (lowerStatus === "approved") return "approved";
    if (lowerStatus === "active") return "active";
    if (lowerStatus === "rejected") return "rejected";
    if (lowerStatus === "pending") return "pending";
    if (lowerStatus === "closed") return "closed";

    return "pending"; // default
  };

  // Fetch data from backend
  const fetchApplicationHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (userId) {
        // If userId is provided, fetch specific user's loans
        response = await LoanService.getLoanById(userId);
      } else {
        // Otherwise, fetch all loans
        response = await LoanService.getAllLoans();
      }

      // Handle different response structures
      let loansData = [];
      if (response.data && Array.isArray(response.data)) {
        loansData = response.data;
      } else if (response.loans && Array.isArray(response.loans)) {
        loansData = response.loans;
      } else if (Array.isArray(response)) {
        loansData = response;
      } else if (response.data && !Array.isArray(response.data)) {
        // Single loan object
        loansData = [response.data];
      } else if (response) {
        loansData = [response];
      }

      const mappedHistory = mapBackendDataToHistory(loansData);
      setHistoryData(mappedHistory);
    } catch (err: any) {
      console.error("Failed to fetch application history:", err);
      setError(err.message || "Failed to load application history");
      // Set empty array on error instead of mock data
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    if (history) {
      // If history is provided as prop, use it directly
      setHistoryData(history);
      setLoading(false);
    } else {
      // Otherwise, fetch from backend
      fetchApplicationHistory();
    }
  }, [history, userId]);

  const getStatusStyles = (status: HistoryApplication["status"]): string => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "active":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "closed":
        return "bg-slate-100 text-slate-800 border border-slate-200";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getStatusIcon = (status: HistoryApplication["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "active":
        return <PlayCircle className="w-4 h-4" />;
      case "closed":
        return <StopCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getProductIcon = (productType: string) => {
    switch (productType) {
      case "education":
        return <GraduationCap className="w-5 h-5" />;
      case "vehicle":
        return <Car className="w-5 h-5" />;
      case "solar":
        return <Sun className="w-5 h-5" />;
      case "building_finisher":
        return <Building className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getProductGradient = (productType: string): string => {
    switch (productType) {
      case "education":
        return "from-purple-500 to-indigo-600";
      case "vehicle":
        return "from-blue-500 to-cyan-600";
      case "solar":
        return "from-yellow-500 to-orange-600";
      case "building_finisher":
        return "from-green-500 to-emerald-600";
      default:
        return "from-gray-500 to-slate-600";
    }
  };

  const formatStatus = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const formatProductType = (productType: string): string => {
    switch (productType) {
      case "education":
        return "Education Loan (Short Term)";
      case "vehicle":
        return "Vehicle Loan (Long Term)";
      case "solar":
        return "Solar Energy Loan";
      case "building_finisher":
        return "Building Finisher Loan";
      default:
        return productType;
    }
  };

  // Calculate loan progress for active loans
  const calculateProgress = (application: HistoryApplication): number => {
    if (
      application.status !== "active" ||
      !application.startDate ||
      !application.endDate
    ) {
      return 0;
    }

    const startDate = new Date(application.startDate);
    const endDate = new Date(application.endDate);
    const currentDate = new Date();

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = currentDate.getTime() - startDate.getTime();

    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  };

  // Check if a loan can be deleted (only pending and rejected loans typically)
  const canDeleteLoan = (application: HistoryApplication): boolean => {
    return (
      application.status === "pending" || application.status === "rejected"
    );
  };

  // Retry function for error state
  const handleRetry = () => {
    fetchApplicationHistory();
  };

  // Handle view details
  const handleViewDetails = (application: HistoryApplication) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  // Close details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedApplication(null);
  };

  // Handle delete loan
  const handleDeleteLoan = (application: HistoryApplication) => {
    setApplicationToDelete(application);
    setShowDeleteModal(true);
  };

  // Confirm delete loan
  const confirmDeleteLoan = async () => {
    if (!applicationToDelete) return;

    try {
      setDeleteLoading(true);

      // Call the delete service
      await LoanService.deleteLoan(applicationToDelete.id);

      // Remove the deleted loan from the state
      setHistoryData((prevData) =>
        prevData.filter((loan) => loan.id !== applicationToDelete.id)
      );

      // Close the modal
      setShowDeleteModal(false);
      setApplicationToDelete(null);

      // You could also show a success message here
      console.log("Loan deleted successfully");
    } catch (err: any) {
      console.error("Failed to delete loan:", err);
      setError(err.message || "Failed to delete loan");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setApplicationToDelete(null);
  };

  // Delete Confirmation Modal Component
  const DeleteConfirmationModal = () => {
    if (!applicationToDelete) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-2xl mx-auto w-fit mb-4">
                <Trash2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Delete Application
              </h2>
              <p className="text-slate-600">
                Are you sure you want to delete this loan application? This
                action cannot be undone.
              </p>
            </div>

            {/* Application Details */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-2xl border border-red-100 mb-6">
              <div className="flex items-center mb-2">
                {getProductIcon(applicationToDelete.productType)}
                <span className="ml-2 font-semibold text-slate-800">
                  {formatProductType(applicationToDelete.productType)}
                </span>
              </div>
              <div className="text-sm text-slate-600">
                <p>
                  Amount:{" "}
                  <span className="font-semibold">
                    ${applicationToDelete.amount.toLocaleString()}
                  </span>
                </p>
                <p>
                  Status:{" "}
                  <span className="font-semibold">
                    {formatStatus(applicationToDelete.status)}
                  </span>
                </p>
                <p>
                  Applied:{" "}
                  <span className="font-semibold">
                    {formatDate(applicationToDelete.appliedDate)}
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={cancelDelete}
                disabled={deleteLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-500 to-slate-600 text-white rounded-2xl hover:from-gray-600 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteLoan}
                disabled={deleteLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {deleteLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Details Modal Component
  const DetailsModal = () => {
    if (!selectedApplication) return null;

    const progress = calculateProgress(selectedApplication);

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
          {/* Header with gradient background */}
          <div
            className={`bg-gradient-to-r ${getProductGradient(
              selectedApplication.productType
            )} px-8 py-6 rounded-t-3xl`}
          >
            <div className="flex justify-between items-start">
              <div className="text-white">
                <div className="flex items-center mb-2">
                  {getProductIcon(selectedApplication.productType)}
                  <h2 className="text-2xl font-bold ml-3">
                    {formatProductType(selectedApplication.productType)}
                  </h2>
                </div>
                <p className="text-white/90 text-lg">
                  ${selectedApplication.amount.toLocaleString()}
                </p>
                <p className="text-white/80 text-sm">
                  Application ID: {selectedApplication.id}
                </p>
              </div>
              <button
                onClick={closeDetailsModal}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="mt-4">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30`}
              >
                {getStatusIcon(selectedApplication.status)}
                <span className="ml-2">
                  {formatStatus(selectedApplication.status)}
                </span>
              </span>
            </div>
          </div>

          <div className="p-8">
            {/* Progress Bar for Active Loans */}
            {selectedApplication.status === "active" &&
              selectedApplication.startDate &&
              selectedApplication.endDate && (
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Loan Progress
                    </h3>
                    <span className="text-blue-600 font-bold">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>
                      Started: {formatDate(selectedApplication.startDate)}
                    </span>
                    <span>Ends: {formatDate(selectedApplication.endDate)}</span>
                  </div>
                </div>
              )}

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {selectedApplication.interestRate && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">
                        Interest Rate
                      </p>
                      <p className="text-2xl font-bold text-green-800">
                        {selectedApplication.interestRate}%
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              )}

              {selectedApplication.term && (
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">
                        Loan Term
                      </p>
                      <p className="text-2xl font-bold text-purple-800">
                        {selectedApplication.term}{" "}
                        <span className="text-lg">months</span>
                      </p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              )}

              {selectedApplication.monthlyPayment && (
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">
                        Monthly Payment
                      </p>
                      <p className="text-2xl font-bold text-orange-800">
                        ${selectedApplication.monthlyPayment.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <CreditCard className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Outstanding Balance */}
            {selectedApplication.balance !== undefined &&
              selectedApplication.balance > 0 && (
                <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-1 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Outstanding Balance
                      </h3>
                      <p className="text-3xl font-bold text-red-700">
                        ${selectedApplication.balance.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-red-100 p-4 rounded-xl">
                      <DollarSign className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                </div>
              )}

            {/* Information Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Application Timeline */}
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Application Timeline
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-white rounded-xl border border-slate-200">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        Applied
                      </p>
                      <p className="text-slate-800 font-semibold">
                        {formatDate(selectedApplication.appliedDate)}
                      </p>
                    </div>
                  </div>

                  {selectedApplication.approvedDate && (
                    <div className="flex items-center p-3 bg-white rounded-xl border border-slate-200">
                      <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Approved
                        </p>
                        <p className="text-green-700 font-semibold">
                          {formatDate(selectedApplication.approvedDate)}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedApplication.startDate && (
                    <div className="flex items-center p-3 bg-white rounded-xl border border-slate-200">
                      <div className="bg-purple-100 p-2 rounded-lg mr-4">
                        <PlayCircle className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Started
                        </p>
                        <p className="text-purple-700 font-semibold">
                          {formatDate(selectedApplication.startDate)}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedApplication.endDate && (
                    <div className="flex items-center p-3 bg-white rounded-xl border border-slate-200">
                      <div className="bg-orange-100 p-2 rounded-lg mr-4">
                        <StopCircle className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          End Date
                        </p>
                        <p className="text-orange-700 font-semibold">
                          {formatDate(selectedApplication.endDate)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Applicant Information */}
              {(selectedApplication.income ||
                selectedApplication.employmentStatus ||
                selectedApplication.creditScore) && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-800 mb-6 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Applicant Profile
                  </h3>

                  <div className="space-y-4">
                    {selectedApplication.income && (
                      <div className="flex items-center p-3 bg-white rounded-xl border border-blue-200">
                        <div className="bg-green-100 p-2 rounded-lg mr-4">
                          <DollarSign className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600">
                            Annual Income
                          </p>
                          <p className="text-blue-800 font-semibold">
                            ${selectedApplication.income.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedApplication.employmentStatus && (
                      <div className="flex items-center p-3 bg-white rounded-xl border border-blue-200">
                        <div className="bg-blue-100 p-2 rounded-lg mr-4">
                          <Building className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600">
                            Employment
                          </p>
                          <p className="text-blue-800 font-semibold">
                            {selectedApplication.employmentStatus}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedApplication.creditScore && (
                      <div className="flex items-center p-3 bg-white rounded-xl border border-blue-200">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600">
                            Credit Score
                          </p>
                          <p className="text-blue-800 font-semibold text-xl">
                            {selectedApplication.creditScore}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Details */}
            {(selectedApplication.purpose ||
              selectedApplication.collateral ||
              selectedApplication.comments) && (
              <div className="mt-8 bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-100">
                <h3 className="text-lg font-semibold text-amber-800 mb-6">
                  Additional Information
                </h3>

                <div className="space-y-4">
                  {selectedApplication.purpose && (
                    <div>
                      <label className="text-sm font-semibold text-amber-700 block mb-2">
                        Purpose
                      </label>
                      <p className="text-amber-800 bg-white p-3 rounded-xl border border-amber-200">
                        {selectedApplication.purpose}
                      </p>
                    </div>
                  )}

                  {selectedApplication.collateral && (
                    <div>
                      <label className="text-sm font-semibold text-amber-700 block mb-2">
                        Collateral
                      </label>
                      <p className="text-amber-800 bg-white p-3 rounded-xl border border-amber-200">
                        {selectedApplication.collateral}
                      </p>
                    </div>
                  )}

                  {selectedApplication.comments && (
                    <div>
                      <label className="text-sm font-semibold text-amber-700 block mb-2">
                        Comments
                      </label>
                      <p className="text-amber-800 bg-white p-3 rounded-xl border border-amber-200">
                        {selectedApplication.comments}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Documents Section */}
            {selectedApplication.documents &&
              selectedApplication.documents.length > 0 && (
                <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-6 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Submitted Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedApplication.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-white rounded-xl border border-indigo-200"
                      >
                        <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                          <FileText className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="text-indigo-800 font-medium flex-1">
                          {doc}
                        </span>
                        <button className="p-1 hover:bg-indigo-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-indigo-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Loan Officer Information */}
            {selectedApplication.loanOfficer && (
              <div className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl border border-teal-100">
                <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Loan Officer
                </h3>
                <div className="flex items-center p-3 bg-white rounded-xl border border-teal-200">
                  <div className="bg-teal-100 p-2 rounded-lg mr-3">
                    <User className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-teal-800 font-medium">
                    {selectedApplication.loanOfficer}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={closeDetailsModal}
                className="px-8 py-3 bg-gradient-to-r from-slate-600 to-gray-700 text-white rounded-2xl hover:from-slate-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-slate-600 mt-4 text-lg">
            Loading application history...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && historyData.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-2xl mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Failed to Load History
          </h3>
          <p className="text-slate-600 text-center mb-6 max-w-md">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (historyData.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-gradient-to-r from-slate-400 to-gray-500 p-4 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            No Applications Found
          </h3>
          <p className="text-slate-600 text-center max-w-md">
            {userId
              ? "This user hasn't submitted any loan applications yet."
              : "No loan applications have been submitted yet."}
          </p>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black mb-1">
              Application History
            </h2>
            <p className="text-gray-700">
              {historyData.length}{" "}
              {historyData.length === 1 ? "application" : "applications"} found
            </p>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl">
            <Clock className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="p-8">
        <div className="space-y-6">
          {historyData.map((application) => {
            const progress = calculateProgress(application);

            return (
              <div
                key={application.id}
                className="group bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Left Side - Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start mb-4">
                      {/* Product Icon */}
                      <div
                        className={`bg-gradient-to-r ${getProductGradient(
                          application.productType
                        )} p-3 rounded-xl mr-4 flex-shrink-0`}
                      >
                        {getProductIcon(application.productType)}
                      </div>

                      {/* Application Details */}
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-800">
                            {formatProductType(application.productType)}
                          </h3>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                              application.status
                            )}`}
                          >
                            {getStatusIcon(application.status)}
                            <span className="ml-1">
                              {formatStatus(application.status)}
                            </span>
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span className="font-semibold text-slate-800">
                              ${application.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              Applied {formatDate(application.appliedDate)}
                            </span>
                          </div>
                          {application.interestRate && (
                            <div className="flex items-center">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              <span>{application.interestRate}% APR</span>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar for Active Loans */}
                        {application.status === "active" &&
                          application.startDate &&
                          application.endDate && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-700">
                                  Loan Progress
                                </span>
                                <span className="text-sm font-bold text-blue-600">
                                  {Math.round(progress)}%
                                </span>
                              </div>
                              <div className="w-full bg-blue-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                        {/* Outstanding Balance */}
                        {application.balance !== undefined &&
                          application.balance > 0 && (
                            <div className="mt-3 p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
                              <div className="flex items-center">
                                <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                                <span className="text-sm text-red-700">
                                  Outstanding Balance:{" "}
                                  <span className="font-bold">
                                    ${application.balance.toLocaleString()}
                                  </span>
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex items-center space-x-3 mt-4 lg:mt-0 lg:ml-6">
                    <button
                      onClick={() => handleViewDetails(application)}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-orange-300 hover:to-orange-5000 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>

                    {canDeleteLoan(application) && (
                      <button
                        onClick={() => handleDeleteLoan(application)}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {showDetailsModal && <DetailsModal />}
      {showDeleteModal && <DeleteConfirmationModal />}
    </div>
  );
};

export default ApplicationHistory;
