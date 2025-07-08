import React, { useState, useEffect } from "react";
import {
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Check,
  X,
  Eye,
  Download,
  Clock,
  CheckCircle,
  XCircle as XCircleIcon,
} from "lucide-react";
import KycService from "../../services/user_Services/kyc_Service";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

interface KycDocument {
  _id: string;
  userId: string;
  nationalId?: string;
  passportPhoto?: string;
  proofOfResident?: string;
  paySlip?: string;
  proofOfEmployment?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  status?: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

interface UserDetailsModalProps {
  selectedUser: User | null;
  onClose: () => void;
}

// Utility function to decode JWT token
const decodeToken = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Utility function to get admin ID from token
const getAdminIdFromToken = (): string | null => {
  try {
    // Try different possible token storage locations
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("token") ||
      sessionStorage.getItem("authToken") ||
      sessionStorage.getItem("adminToken");

    if (!token) {
      console.error("No token found in storage");
      return null;
    }

    const decoded = decodeToken(token);
    if (!decoded) {
      console.error("Failed to decode token");
      return null;
    }

    // Try different possible field names for admin ID
    const adminId =
      decoded.id ||
      decoded.userId ||
      decoded.adminId ||
      decoded._id ||
      decoded.sub;

    if (!adminId) {
      console.error("No admin ID found in token payload:", decoded);
      return null;
    }

    return adminId;
  } catch (error) {
    console.error("Error getting admin ID from token:", error);
    return null;
  }
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  selectedUser,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"details" | "kyc">("details");
  const [kycDocuments, setKycDocuments] = useState<KycDocument[]>([]);
  const [isLoadingKyc, setIsLoadingKyc] = useState(false);
  const [processingKyc, setProcessingKyc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser && activeTab === "kyc") {
      fetchKycDocuments();
    }
  }, [selectedUser, activeTab]);

  const fetchKycDocuments = async () => {
    if (!selectedUser) return;

    setIsLoadingKyc(true);
    setError(null);

    try {
      console.log("Fetching KYC documents for user:", selectedUser._id);
      const response = await KycService.getKycByUserId(selectedUser._id);
      console.log("Full KYC API Response:", response);

      // More comprehensive response handling
      let documents = [];

      if (response) {
        // Check if response has a data property
        if (response.data) {
          if (Array.isArray(response.data)) {
            documents = response.data;
          } else if (
            response.data.documents &&
            Array.isArray(response.data.documents)
          ) {
            documents = response.data.documents;
          } else if (
            response.data.kycDocuments &&
            Array.isArray(response.data.kycDocuments)
          ) {
            documents = response.data.kycDocuments;
          } else {
            // Single document in data
            documents = [response.data];
          }
        }
        // Check if response itself is an array
        else if (Array.isArray(response)) {
          documents = response;
        }
        // Check if response has documents property
        else if (response.documents && Array.isArray(response.documents)) {
          documents = response.documents;
        }
        // Check if response has kycDocuments property
        else if (
          response.kycDocuments &&
          Array.isArray(response.kycDocuments)
        ) {
          documents = response.kycDocuments;
        }
        // Check if response has kyc property
        else if (response.kyc && Array.isArray(response.kyc)) {
          documents = response.kyc;
        }
        // If response is a single object with _id, treat it as a single document
        else if (response._id) {
          documents = [response];
        }
      }

      console.log("Processed documents:", documents);
      console.log("Documents count:", documents.length);
      console.log("Documents type:", typeof documents);

      // Validate that documents is an array
      if (!Array.isArray(documents)) {
        console.error("Documents is not an array:", documents);
        documents = [];
      }

      // Filter out any null/undefined entries
      documents = documents.filter((doc) => doc != null);

      setKycDocuments(documents);
    } catch (error) {
      console.error("Error fetching KYC documents:", error);
      setError("Failed to load KYC documents. Please try again.");
      setKycDocuments([]);
    } finally {
      setIsLoadingKyc(false);
    }
  };

  const handleKycAction = async (
    kycId: string,
    action: "approved" | "rejected"
  ) => {
    setProcessingKyc(kycId);
    setError(null);

    try {
      // Get admin ID from token
      const adminId = getAdminIdFromToken();

      if (!adminId) {
        throw new Error(
          "Unable to get admin ID from token. Please log in again."
        );
      }

      console.log("Admin ID from token:", adminId);

      const updateData = {
        status: action,
        reviewedAt: new Date().toISOString(),
        reviewedBy: adminId, // Use the actual admin ID from token
      };

      console.log("Updating KYC with data:", updateData);

      await KycService.updateKyc(kycId, updateData);

      // Update local state
      setKycDocuments((prev) =>
        prev.map((doc) =>
          doc._id === kycId
            ? {
                ...doc,
                status: action,
                reviewedAt: new Date().toISOString(),
                reviewedBy: adminId,
              }
            : doc
        )
      );

      console.log("KYC status updated successfully");
    } catch (error) {
      console.error("Error updating KYC status:", error);

      // More specific error handling
      if (error instanceof Error) {
        if (error.message.includes("token")) {
          setError("Authentication error. Please log in again.");
        } else if (error.message.includes("ObjectId")) {
          setError("Invalid admin ID format. Please contact support.");
        } else {
          setError(`Failed to update KYC status: ${error.message}`);
        }
      } else {
        setError("Failed to update KYC status. Please try again.");
      }
    } finally {
      setProcessingKyc(null);
    }
  };

  if (!selectedUser) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-yellow-600 bg-yellow-50";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const renderKycDocument = (doc: KycDocument) => {
    const documents = [
      { key: "nationalId", label: "National ID", value: doc.nationalId },
      {
        key: "passportPhoto",
        label: "Passport Photo",
        value: doc.passportPhoto,
      },
      {
        key: "proofOfResident",
        label: "Proof of Residence",
        value: doc.proofOfResident,
      },
      { key: "paySlip", label: "Pay Slip", value: doc.paySlip },
      {
        key: "proofOfEmployment",
        label: "Proof of Employment",
        value: doc.proofOfEmployment,
      },
    ];

    return (
      <div
        key={doc._id}
        className="bg-white border border-orange-200 rounded-xl p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-orange-600" />
            <h4 className="text-lg font-semibold text-orange-800">
              KYC Document #{doc._id.slice(-6)}
            </h4>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(
              doc.status
            )}`}
          >
            {getStatusIcon(doc.status)}
            <span className="capitalize">{doc.status || "pending"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((document) => (
            <div key={document.key} className="space-y-2">
              <label className="text-sm font-medium text-orange-600">
                {document.label}
              </label>
              <div className="bg-orange-50/30 p-3 rounded-lg">
                {document.value ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-800 truncate">
                      {document.value.split("/").pop() || "Document uploaded"}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(document.value, "_blank")}
                        className="p-1 text-orange-600 hover:text-orange-700 hover:bg-orange-100 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const a = window.document.createElement("a");
                          a.href = document.value!;
                          a.download = `${document.label}_${selectedUser.firstName}_${selectedUser.lastName}`;
                          a.click();
                        }}
                        className="p-1 text-orange-600 hover:text-orange-700 hover:bg-orange-100 rounded"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">Not uploaded</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-orange-200/50">
          <div className="text-sm text-orange-600">
            <p>Submitted: {formatDate(doc.createdAt)}</p>
            {doc.reviewedAt && <p>Reviewed: {formatDate(doc.reviewedAt)}</p>}
          </div>

          {doc.status === "pending" && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleKycAction(doc._id, "rejected")}
                disabled={processingKyc === doc._id}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                <span>Reject</span>
              </button>
              <button
                onClick={() => handleKycAction(doc._id, "approved")}
                disabled={processingKyc === doc._id}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>Approve</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-orange-200/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-orange-800">
              User Details - {selectedUser.firstName} {selectedUser.lastName}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-700 transition-all duration-200"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-orange-200/50">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === "details"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              User Details
            </button>
            <button
              onClick={() => setActiveTab("kyc")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === "kyc"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              KYC Documents
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "details" ? (
            <div className="p-6 space-y-6">
              {/* Profile Section */}
              <div className="flex items-center space-x-4 p-4 bg-orange-50/50 rounded-xl">
                <div className="relative">
                  {selectedUser.profilePicture ? (
                    <img
                      src={selectedUser.profilePicture}
                      alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                      {getInitials(
                        selectedUser.firstName,
                        selectedUser.lastName
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orange-800">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h4>
                  <p className="text-orange-600 font-medium">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>First Name</span>
                  </label>
                  <div className="text-lg font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                    {selectedUser.firstName}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Last Name</span>
                  </label>
                  <div className="text-lg font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                    {selectedUser.lastName}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-orange-200/50 pt-6">
                <h4 className="text-lg font-semibold text-orange-800 mb-4">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                    </label>
                    <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg break-all">
                      {selectedUser.email}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Phone Number</span>
                    </label>
                    <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                      {selectedUser.phoneNumber}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="border-t border-orange-200/50 pt-6">
                <h4 className="text-lg font-semibold text-orange-800 mb-4">
                  Address Information
                </h4>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Address</span>
                  </label>
                  <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                    {selectedUser.address}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="border-t border-orange-200/50 pt-6">
                <h4 className="text-lg font-semibold text-orange-800 mb-4">
                  Account Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Account Created</span>
                    </label>
                    <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                      {formatDate(selectedUser.createdAt)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Last Updated</span>
                    </label>
                    <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                      {formatDate(selectedUser.updatedAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* User ID */}
              <div className="border-t border-orange-200/50 pt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600">
                    User ID
                  </label>
                  <div className="text-sm font-mono text-orange-700 bg-orange-50/50 p-3 rounded-lg border border-orange-200/30">
                    {selectedUser._id}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-orange-800 mb-2">
                  KYC Documents
                </h4>
                <p className="text-orange-600 text-sm">
                  Review and manage KYC documents for {selectedUser.firstName}{" "}
                  {selectedUser.lastName}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {isLoadingKyc ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : !kycDocuments || kycDocuments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No KYC documents found for this user
                  </p>
                  <button
                    onClick={fetchKycDocuments}
                    className="mt-4 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-sm font-medium"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {kycDocuments.map(renderKycDocument)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-orange-50/50 border-t border-orange-200/50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-xl text-sm font-medium text-orange-700 transition-all duration-200"
          >
            Close
          </button>
          {activeTab === "details" && (
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl text-sm font-medium text-white transition-all duration-200">
              Edit User
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
