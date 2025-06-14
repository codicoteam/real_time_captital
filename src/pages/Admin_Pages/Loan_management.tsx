import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  Plus,
  Clock,
  Menu,
  Bell,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import LoanService from "../../services/admin_Services/loan_Service"; // Adjust path as needed
import LoanDetailsModal from "../../components/admin_loan/view_loan";

interface LoanApplication {
  id: string;
  applicant: string;
  email: string;
  phone: string;
  loanType: string;
  amount: string;
  status: string;
  appliedDate: string;
  documents: number;
  creditScore: number;
  monthlyIncome: string;
  purpose: string;
}

const LoanManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch loans from backend
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await LoanService.getAllLoans();

        // Transform the backend data to match your UI structure
        const transformedLoans: LoanApplication[] =
          response.data?.map((loan: any) => ({
            id: loan._id || loan.id || "",
            applicant:
              `${loan.borrowerInfo?.firstName || ""} ${
                loan.borrowerInfo?.surname || ""
              }`.trim() || "Unknown",
            email: loan.borrowerInfo?.email || "",
            phone: loan.borrowerInfo?.phone || loan.borrowerInfo?.mobile || "",
            loanType: loan.productType || "Unknown",
            amount: loan.amount ? `₨${loan.amount.toLocaleString()}` : "₨0",
            status: loan.status || "pending",
            appliedDate: loan.applicationDate
              ? new Date(loan.applicationDate).toISOString().split("T")[0]
              : "",
            documents: 0, // You'll need to determine how to count documents
            creditScore: 750, // This might need to be calculated or stored separately
            monthlyIncome: loan.financialSummary?.salary
              ? `₨${loan.financialSummary.salary.toLocaleString()}`
              : "₨0",
            purpose: loan.productType || "Not specified",
          })) || [];

        setLoanApplications(transformedLoans);
      } catch (err: any) {
        const errorMessage = err?.message || err || "Failed to fetch loans";
        setError(errorMessage);
        console.error("Error fetching loans:", err);

        // Fallback to empty array to prevent UI crashes
        setLoanApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "active":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "closed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "under_review":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending";
      case "active":
        return "Active";
      case "closed":
        return "Closed";
      case "under_review":
        return "Under Review";
      default:
        return "Unknown";
    }
  };

  const filterOptions = [
    { value: "all", label: "All Applications" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "active", label: "Active" },
    { value: "closed", label: "Closed" },
  ];

  const filteredApplications = loanApplications.filter((app) => {
    const matchesFilter =
      selectedFilter === "all" ||
      app.status.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch =
      app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.loanType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApprove = async (loanId: string) => {
    try {
      await LoanService.updateLoan(loanId, { status: "approved" });
      // Refresh the data
      setLoanApplications((prev) =>
        prev.map((loan) =>
          loan.id === loanId ? { ...loan, status: "approved" } : loan
        )
      );
    } catch (err) {
      console.error("Error approving loan:", err);
    }
  };

  const handleReject = async (loanId: string) => {
    try {
      await LoanService.updateLoan(loanId, { status: "rejected" });
      // Refresh the data
      setLoanApplications((prev) =>
        prev.map((loan) =>
          loan.id === loanId ? { ...loan, status: "rejected" } : loan
        )
      );
    } catch (err) {
      console.error("Error rejecting loan:", err);
    }
  };

  // const handleViewDocuments = (loanId: string) => {
  //   console.log(`Viewing documents for loan: ${loanId}`);
  //   // Modal will be implemented later
  // };

  // const handleAddDocuments = (loanId: string) => {
  //   console.log(`Adding documents for loan: ${loanId}`);
  //   // Modal will be implemented later
  // };

  const handleViewDetails = async (loanId: string) => {
    try {
      // Fetch the full loan details from the backend
      const response = await LoanService.getLoanById(loanId);
      setSelectedLoan(response.data);
      setShowDetailsModal(true);
    } catch (err) {
      console.error("Error fetching loan details:", err);
      // Fallback: use the loan from the current list if API call fails
      const loan = loanApplications.find((app) => app.id === loanId);
      if (loan) {
        // Transform the loan application back to the expected format
        const transformedLoan = {
          _id: loan.id,
          status: loan.status,
          productType: loan.loanType,
          applicationDate: loan.appliedDate,
          amount: parseFloat(loan.amount.replace("₨", "").replace(",", "")),
          borrowerInfo: {
            firstName: loan.applicant.split(" ")[0],
            surname: loan.applicant.split(" ").slice(1).join(" "),
            email: loan.email,
            phone: loan.phone,
          },
          financialSummary: {
            salary: parseFloat(
              loan.monthlyIncome.replace("₨", "").replace(",", "")
            ),
          },
          createdAt: loan.appliedDate,
          updatedAt: loan.appliedDate,
        };
        setSelectedLoan(transformedLoan);
        setShowDetailsModal(true);
      }
    }
  };
  // Add this function to close the modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedLoan(null);
  };

  const getPendingReviewCount = () => {
    return loanApplications.filter(
      (app) =>
        app.status.toLowerCase() === "pending" ||
        app.status.toLowerCase() === "under_review" ||
        app.status.toLowerCase() === "active"
    ).length;
  };

  const getApprovedCount = () => {
    return loanApplications.filter(
      (app) => app.status.toLowerCase() === "approved"
    ).length;
  };

  const getRejectedCount = () => {
    return loanApplications.filter(
      (app) => app.status.toLowerCase() === "rejected"
    ).length;
  };

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
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-orange-100/50 border border-orange-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-200"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl bg-orange-100/50 hover:bg-orange-200/50 transition-all duration-200 group">
                <Bell className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">3</span>
                </div>
              </button>

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

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-orange-800 mb-2">
                Loan Management
              </h1>
              <p className="text-orange-600">
                Manage loan applications, approve or reject requests, and handle
                documentation
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-orange-100/60 text-orange-700 rounded-xl font-medium hover:bg-orange-200/60 transition-all duration-200 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Application</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                <span>Error: {error}</span>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-orange-600 flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
                <span>Loading loan applications...</span>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 font-medium">
                      Total Applications
                    </p>
                    <p className="text-2xl font-bold text-orange-800">
                      {loanApplications.length}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-600 font-medium">
                      Pending Review
                    </p>
                    <p className="text-2xl font-bold text-yellow-800">
                      {getPendingReviewCount()}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">
                      Approved
                    </p>
                    <p className="text-2xl font-bold text-green-800">
                      {getApprovedCount()}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">Rejected</p>
                    <p className="text-2xl font-bold text-red-800">
                      {getRejectedCount()}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-xl">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filters and Controls */}
          {!loading && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">
                      Filter by:
                    </span>
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-3 py-2 bg-orange-100/50 border border-orange-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50"
                  >
                    {filterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-sm text-orange-600">
                  Showing {filteredApplications.length} of{" "}
                  {loanApplications.length} applications
                </div>
              </div>
            </div>
          )}

          {/* Applications Table */}
          {!loading && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-orange-100/50 to-red-100/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                        Application
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                        Loan Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                        Status
                      </th>
                      {/* <th className="px-6 py-4 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                        Documents
                      </th> */}
                      <th className="px-6 py-4 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-200/30">
                    {filteredApplications.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-8 text-center text-orange-600"
                        >
                          {error
                            ? "Unable to load applications"
                            : "No loan applications found"}
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((application) => (
                        <tr
                          key={application.id}
                          className="hover:bg-orange-50/30 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-sm">
                                  {application.id.slice(-2)}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-orange-800">
                                  {application.id}
                                </div>
                                <div className="text-xs text-orange-600">
                                  {application.appliedDate}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-orange-800">
                                {application.applicant}
                              </div>
                              <div className="text-xs text-orange-600">
                                {application.email}
                              </div>
                              <div className="text-xs text-orange-500">
                                {application.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-orange-800">
                                {application.loanType}
                              </div>
                              <div className="text-sm text-orange-600 font-semibold">
                                {application.amount}
                              </div>
                              <div className="text-xs text-orange-500">
                                Credit: {application.creditScore}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                                application.status
                              )}`}
                            >
                              {getStatusText(application.status)}
                            </span>
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <FileText className="w-4 h-4 text-orange-600" />
                                <span className="text-sm text-orange-700">
                                  {application.documents}
                                </span>
                              </div>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() =>
                                    handleViewDocuments(application.id)
                                  }
                                  className="p-1 text-orange-600 hover:text-orange-700 hover:bg-orange-100 rounded transition-colors duration-200"
                                  title="View Documents"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleAddDocuments(application.id)
                                  }
                                  className="p-1 text-orange-600 hover:text-orange-700 hover:bg-orange-100 rounded transition-colors duration-200"
                                  title="Add Documents"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleViewDetails(application.id)
                                }
                                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {(application.status.toLowerCase() ===
                                "pending" ||
                                application.status.toLowerCase() ===
                                  "under_review") && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleApprove(application.id)
                                    }
                                    className="p-2 text-green-600 hover:text-green-700 hover:bg-green-100 rounded-lg transition-colors duration-200"
                                    title="Approve"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleReject(application.id)}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                    title="Reject"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              <div className="relative">
                                <button className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-100 rounded-lg transition-colors duration-200">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredApplications.length > 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-orange-600">
                  Showing 1 to {filteredApplications.length} of{" "}
                  {filteredApplications.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-sm font-medium text-orange-600 bg-orange-100/50 border border-orange-200/50 rounded-lg hover:bg-orange-200/50 transition-colors duration-200">
                    Previous
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                    1
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-orange-600 bg-orange-100/50 border border-orange-200/50 rounded-lg hover:bg-orange-200/50 transition-colors duration-200">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Loan Details Modal */}
      {showDetailsModal && (
        <LoanDetailsModal
          selectedLoan={selectedLoan}
          onClose={handleCloseDetailsModal}
        />
      )}
    </div>
  );
};

export default LoanManagement;
