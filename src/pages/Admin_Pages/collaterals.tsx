import React, { useState, useMemo } from "react";
import Sidebar from "../../components/Sidebar";

import {
  Search,
  Filter,
  Eye,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  X,
} from "lucide-react";

// Types
interface Collateral {
  id: string;
  loanId: string;
  clientName: string;
  clientId: string;
  itemType: string;
  itemDescription: string;
  estimatedValue: number;
  appraisalValue: number;
  depositDate: string;
  loanAmount: number;
  loanStatus: "pending" | "active" | "completed" | "defaulted";
  collateralStatus: "deposited" | "returned" | "seized";
  condition: string;
  location: string;
  documents: string[];
  dueDate: string;
  notes?: string;
}

const CollateralManagement: React.FC = () => {
  // Mock data - replace with actual API calls
  const mockCollaterals: Collateral[] = [
    {
      id: "COL001",
      loanId: "LN001",
      clientName: "John Doe",
      clientId: "CLI001",
      itemType: "Vehicle",
      itemDescription: "2020 Toyota Camry - License: ABC123",
      estimatedValue: 25000,
      appraisalValue: 22000,
      depositDate: "2024-01-15",
      loanAmount: 18000,
      loanStatus: "active",
      collateralStatus: "deposited",
      condition: "Good",
      location: "Vault A-12",
      documents: ["vehicle_registration.pdf", "appraisal_report.pdf"],
      dueDate: "2024-07-15",
      notes: "Regular maintenance required",
    },
    {
      id: "COL002",
      loanId: "LN002",
      clientName: "Jane Smith",
      clientId: "CLI002",
      itemType: "Jewelry",
      itemDescription: "Gold necklace with diamonds",
      estimatedValue: 8000,
      appraisalValue: 7200,
      depositDate: "2024-02-20",
      loanAmount: 5000,
      loanStatus: "completed",
      collateralStatus: "returned",
      condition: "Excellent",
      location: "Vault B-05",
      documents: ["jewelry_appraisal.pdf"],
      dueDate: "2024-06-20",
      notes: "Returned to client on 2024-06-18",
    },
    {
      id: "COL003",
      loanId: "LN003",
      clientName: "Mike Johnson",
      clientId: "CLI003",
      itemType: "Electronics",
      itemDescription: 'MacBook Pro 16" 2023',
      estimatedValue: 3000,
      appraisalValue: 2800,
      depositDate: "2024-03-10",
      loanAmount: 2200,
      loanStatus: "defaulted",
      collateralStatus: "seized",
      condition: "Fair",
      location: "Storage C-08",
      documents: ["purchase_receipt.pdf", "condition_report.pdf"],
      dueDate: "2024-06-10",
      notes: "Client defaulted, item seized for auction",
    },
    {
      id: "COL004",
      loanId: "LN004",
      clientName: "Sarah Wilson",
      clientId: "CLI004",
      itemType: "Real Estate",
      itemDescription: "Property deed - 123 Main St",
      estimatedValue: 150000,
      appraisalValue: 145000,
      depositDate: "2024-04-05",
      loanAmount: 100000,
      loanStatus: "pending",
      collateralStatus: "deposited",
      condition: "N/A",
      location: "Document Safe D-01",
      documents: ["property_deed.pdf", "valuation_report.pdf"],
      dueDate: "2024-10-05",
      notes: "Pending loan approval",
    },
  ];

  const [collaterals] = useState<Collateral[]>(mockCollaterals);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [collateralFilter, setCollateralFilter] = useState<string>("all");
  const [selectedCollateral, setSelectedCollateral] =
    useState<Collateral | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Filter and search logic
  const filteredCollaterals = useMemo(() => {
    return collaterals.filter((collateral) => {
      const matchesSearch =
        collateral.clientName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        collateral.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collateral.itemDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || collateral.loanStatus === statusFilter;
      const matchesCollateral =
        collateralFilter === "all" ||
        collateral.collateralStatus === collateralFilter;

      return matchesSearch && matchesStatus && matchesCollateral;
    });
  }, [collaterals, searchTerm, statusFilter, collateralFilter]);

  // Status badge component
  const StatusBadge: React.FC<{
    status: string;
    type: "loan" | "collateral";
  }> = ({ status, type }) => {
    const getStatusColor = (status: string, type: "loan" | "collateral") => {
      if (type === "loan") {
        switch (status) {
          case "pending":
            return "bg-yellow-100 text-yellow-700 border border-yellow-200";
          case "active":
            return "bg-green-100 text-green-700 border border-green-200";
          case "completed":
            return "bg-blue-100 text-blue-700 border border-blue-200";
          case "defaulted":
            return "bg-red-100 text-red-700 border border-red-200";
          default:
            return "bg-gray-100 text-gray-700 border border-gray-200";
        }
      } else {
        switch (status) {
          case "deposited":
            return "bg-blue-100 text-blue-700 border border-blue-200";
          case "returned":
            return "bg-green-100 text-green-700 border border-green-200";
          case "seized":
            return "bg-red-100 text-red-700 border border-red-200";
          default:
            return "bg-gray-100 text-gray-700 border border-gray-200";
        }
      }
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
          status,
          type
        )}`}
      >
        {status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
        {status === "defaulted" && <AlertCircle className="w-3 h-3 mr-1" />}
        {status === "pending" && <Clock className="w-3 h-3 mr-1" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Statistics component
  const Statistics: React.FC = () => {
    const stats = useMemo(() => {
      const total = collaterals.length;
      const deposited = collaterals.filter(
        (c) => c.collateralStatus === "deposited"
      ).length;
      const returned = collaterals.filter(
        (c) => c.collateralStatus === "returned"
      ).length;
      const seized = collaterals.filter(
        (c) => c.collateralStatus === "seized"
      ).length;
      const totalValue = collaterals.reduce(
        (sum, c) => sum + c.appraisalValue,
        0
      );

      return { total, deposited, returned, seized, totalValue };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collaterals]);

    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Collaterals
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Deposited</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.deposited}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{stats.seized}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
              <span className="text-white font-bold text-lg">Rs</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Disbursed
              </p>
              <p className="text-2xl font-bold text-orange-600">
                Rs{(stats.totalValue / 1000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg">
              <span className="text-white font-bold text-lg">Rs</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-yellow-600">
                Rs{((stats.totalValue * 0.8) / 1000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const formatCurrency = (amount: number) => {
    return `Rs${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRiskLevel = (collateral: Collateral) => {
    if (collateral.loanStatus === "defaulted") return "High Risk";
    if (collateral.loanStatus === "pending") return "Low Risk";
    return "Low Risk";
  };

  const getRiskColor = (risk: string) => {
    if (risk === "High Risk") return "text-red-600 font-semibold";
    return "text-green-600 font-semibold";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-orange-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-700">
                  Collateral Management
                </h1>
                <p className="text-sm text-orange-600">
                  Track and manage loan collaterals
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setCollateralFilter("all");
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Filter className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Statistics */}
          <Statistics />

          {/* Filter Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-white/90 backdrop-blur-sm p-1 rounded-xl shadow-md border border-orange-100">
              {["all", "deposited", "returned", "seized"].map((status) => (
                <button
                  key={status}
                  onClick={() => setCollateralFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    collateralFilter === status
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  {status === "all"
                    ? "All Collaterals"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md border border-orange-100 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search collaterals..."
                  className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Collaterals Table */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-orange-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
              <h2 className="text-lg font-semibold text-orange-700">
                Collateral Tracking
              </h2>
              <p className="text-sm text-orange-600">
                {filteredCollaterals.length} collaterals found
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-100 to-red-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                      Collateral ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                      Outstanding
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                      Next Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                      Risk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/70 backdrop-blur-sm divide-y divide-orange-100">
                  {filteredCollaterals.map((collateral) => (
                    <tr
                      key={collateral.id}
                      className="hover:bg-orange-50/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {collateral.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {collateral.clientName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-orange-600 font-medium">
                            {collateral.itemType}
                          </div>
                          <div className="text-sm text-gray-500">
                            {collateral.itemDescription.substring(0, 30)}...
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(collateral.appraisalValue)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(collateral.loanAmount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge
                          status={collateral.loanStatus}
                          type="loan"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">
                            {formatDate(collateral.dueDate)}
                          </div>
                          <div className="text-xs text-gray-400">
                            {collateral.loanStatus === "pending"
                              ? "Pending"
                              : "Next Payment"}
                          </div>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${getRiskColor(
                          getRiskLevel(collateral)
                        )}`}
                      >
                        {getRiskLevel(collateral)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedCollateral(collateral);
                              setShowDetails(true);
                            }}
                            className="text-orange-500 hover:text-orange-700 p-1 rounded-full hover:bg-orange-50 transition-all duration-200"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              alert("Download feature coming soon!")
                            }
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-all duration-200"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCollaterals.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-12 text-gray-500"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Package className="w-12 h-12 text-gray-300" />
                          <div className="text-lg font-medium">
                            No collaterals found
                          </div>
                          <div className="text-sm">
                            Try adjusting your search or filters
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Details Modal */}
        {showDetails && selectedCollateral && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative mx-4 border border-orange-200">
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                aria-label="Close details"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-orange-700 mb-2">
                  Collateral Details
                </h3>
                <div className="text-orange-600 font-medium">
                  {selectedCollateral.id}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-2">
                      Client Information
                    </h4>
                    <p className="text-gray-700">
                      {selectedCollateral.clientName}
                    </p>
                    <p className="text-sm text-gray-500">
                      ID: {selectedCollateral.clientId}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-2">
                      Item Details
                    </h4>
                    <p className="text-gray-700 font-medium">
                      {selectedCollateral.itemType}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      {selectedCollateral.itemDescription}
                    </p>
                    <p className="text-gray-700">
                      Condition:{" "}
                      <span className="font-medium">
                        {selectedCollateral.condition}
                      </span>
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-2">
                      Values
                    </h4>
                    <div className="space-y-1">
                      <p className="text-gray-700">
                        Estimated Value:{" "}
                        <span className="font-medium">
                          {formatCurrency(selectedCollateral.estimatedValue)}
                        </span>
                      </p>
                      <p className="text-gray-700">
                        Appraisal Value:{" "}
                        <span className="font-medium">
                          {formatCurrency(selectedCollateral.appraisalValue)}
                        </span>
                      </p>
                      <p className="text-gray-700">
                        Loan Amount:{" "}
                        <span className="font-medium">
                          {formatCurrency(selectedCollateral.loanAmount)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-2">
                      Status Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700">Loan Status:</span>
                        <StatusBadge
                          status={selectedCollateral.loanStatus}
                          type="loan"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700">
                          Collateral Status:
                        </span>
                        <StatusBadge
                          status={selectedCollateral.collateralStatus}
                          type="collateral"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-2">
                      Dates & Location
                    </h4>
                    <div className="space-y-1">
                      <p className="text-gray-700">
                        Deposit Date:{" "}
                        <span className="font-medium">
                          {formatDate(selectedCollateral.depositDate)}
                        </span>
                      </p>
                      <p className="text-gray-700">
                        Due Date:{" "}
                        <span className="font-medium">
                          {formatDate(selectedCollateral.dueDate)}
                        </span>
                      </p>
                      <p className="text-gray-700">
                        Location:{" "}
                        <span className="font-medium">
                          {selectedCollateral.location}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-2">
                      Documents
                    </h4>
                    <div className="space-y-1">
                      {selectedCollateral.documents.map((doc, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span
                            className="text-orange-600 hover:text-orange-700 cursor-pointer hover:underline text-sm"
                            onClick={() => alert(`Open document: ${doc}`)}
                          >
                            {doc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {selectedCollateral.notes && (
                <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-700 mb-2">Notes</h4>
                  <p className="text-gray-700">{selectedCollateral.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollateralManagement;
