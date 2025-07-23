import React, { useState, useEffect } from "react";
import supabase from "../../supabaseConfig/supabaseClient";

import {
  FileText,
  Upload,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  CreditCard,
  Briefcase,
  Home,
  RefreshCw,
  X,
  Trash2,
} from "lucide-react";
import KycService from "../../services/user_Services/kyc_Service";

// KYC Document interface based on your model
interface KycDocument {
  _id: string;
  userId: string;
  nationalId: string;
  passportPhoto: string;
  proofOfResident: string;
  paySlip: string;
  proofOfEmployment: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface DocumentType {
  key: keyof Omit<
    KycDocument,
    "_id" | "userId" | "reviewedBy" | "reviewedAt" | "createdAt" | "updatedAt"
  >;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  required: boolean;
}

interface KycDocumentsProps {
  documents?: KycDocument[];
  onUpload?: (documentType: string, file: File) => Promise<void>;
  onView?: (documentUrl: string) => void;
  KycService?: any;
}

interface NotificationMessage {
  type: "success" | "error";
  text: string;
}

const KycDocuments: React.FC<KycDocumentsProps> = ({
  documents,
  onView,
}) => {
  const [kycData, setKycData] = useState<KycDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<NotificationMessage | null>(null);

  // Add debug state
  const [, setDebugInfo] = useState<{
    userId: string | null;
    token: string | null;
    apiResponse: any;
  }>({ userId: null, token: null, apiResponse: null });

  const documentTypes: DocumentType[] = [
    {
      key: "nationalId",
      label: "National ID",
      icon: CreditCard,
      description: "Upload a clear photo of your national ID",
      required: false,
    },
    {
      key: "passportPhoto",
      label: "Passport Photo",
      icon: User,
      description: "Upload a recent passport-sized photo",
      required: false,
    },
    {
      key: "proofOfResident",
      label: "Proof of Residence",
      icon: Home,
      description: "Upload utility bill or bank statement",
      required: false,
    },
    {
      key: "paySlip",
      label: "Pay Slip",
      icon: FileText,
      description: "Upload your latest pay slip",
      required: false,
    },
    {
      key: "proofOfEmployment",
      label: "Proof of Employment",
      icon: Briefcase,
      description: "Upload employment letter or contract",
      required: false,
    },
  ];

  // Function to show notification popup
  const showNotification = (type: "success" | "error", message: string) => {
    setSubmitMessage({ type, text: message });
    
    // Auto-dismiss notification
    const dismissTime = type === "success" ? 5000 : 7000;
    setTimeout(() => {
      setSubmitMessage(null);
    }, dismissTime);
  };

  // Function to upload document to Supabase
  const uploadDocumentToSupabase = async (file: File, documentType: string) => {
    try {
      if (!file) return null;

      // Check if file is an image or PDF
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Please upload an image (JPG, PNG) or PDF."
        );
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size must be less than 10MB");
      }

      // Get user ID for folder structure
      const userId = getUserId();
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      // Create a unique file name with folder structure
      const fileExtension = file.name.split(".").pop();
      const fileName = `${userId}/${documentType}_${Date.now()}.${fileExtension}`;

      console.log("Uploading file to Supabase:", fileName);

      // Upload file to the Supabase bucket
      const { data, error } = await supabase.storage
        .from("pocketkycdocs")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Supabase upload error:", error);
        throw new Error(`Error uploading file: ${error.message}`);
      }

      console.log("File uploaded successfully:", data);

      // Get the public URL of the uploaded file
      const { data: publicData } = supabase.storage
        .from("pocketkycdocs")
        .getPublicUrl(fileName);

      if (publicData) {
        console.log("Public URL generated:", publicData.publicUrl);
        return publicData.publicUrl;
      }

      return null;
    } catch (error) {
      console.error("Error in document upload:", error);
      throw error;
    }
  };

  // Function to delete document from Supabase
  const deleteDocumentFromSupabase = async (documentUrl: string) => {
    try {
      if (!documentUrl) return;

      // Extract file path from URL
      const urlParts = documentUrl.split("/");
      const bucketIndex = urlParts.findIndex(
        (part) => part === "pocketkycdocs"
      );

      if (bucketIndex === -1) {
        console.log("Not a Supabase URL, skipping deletion");
        return;
      }

      const filePath = urlParts.slice(bucketIndex + 1).join("/");
      console.log("Deleting file from Supabase:", filePath);

      const { error } = await supabase.storage
        .from("pocketkycdocs")
        .remove([filePath]);

      if (error) {
        console.error("Error deleting file from Supabase:", error);
        // Don't throw error here as the main document deletion should continue
      } else {
        console.log("File deleted successfully from Supabase");
      }
    } catch (error) {
      console.error("Error in file deletion:", error);
      // Don't throw error here as the main document deletion should continue
    }
  };

  // Enhanced getUserId function with better error handling
  const getUserId = () => {
    try {
      const token = localStorage.getItem("userToken");
      console.log("Raw token:", token ? "Found" : "Not found");

      if (!token) {
        setError("No authentication token found. Please log in again.");
        return null;
      }

      // Check if token has the correct format (JWT has 3 parts separated by dots)
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        setError("Invalid token format. Please log in again.");
        return null;
      }

      const payload = JSON.parse(atob(tokenParts[1]));
      console.log("Token payload:", payload);

      // Check if the token has expired
      if (payload.exp && payload.exp < Date.now() / 1000) {
        setError("Token has expired. Please log in again.");
        return null;
      }

      // Try different possible user ID fields
      const userId =
        payload.id || payload.userId || payload.sub || payload.user_id;
      console.log("Extracted userId:", userId);

      if (!userId) {
        setError("User ID not found in token. Please log in again.");
        return null;
      }

      return userId;
    } catch (error) {
      console.error("Error decoding token:", error);
      setError("Invalid token. Please log in again.");
      return null;
    }
  };

  // Enhanced fetch function with better error handling and debugging
  const fetchKycDocuments = async () => {
    console.log("Starting to fetch KYC documents...");
    setLoading(true);
    setError(null);

    try {
      const userId = getUserId();
      const token = localStorage.getItem("userToken");

      // Update debug info
      setDebugInfo((prev) => ({
        ...prev,
        userId,
        token: token ? `${token.substring(0, 20)}...` : null,
      }));

      if (!userId) {
        console.log("No userId found, cannot fetch documents");
        return;
      }

      console.log("Fetching KYC documents for userId:", userId);
      const response = await KycService.getKycByUserId(userId);
      console.log("API Response:", response);

      // Update debug info with response
      setDebugInfo((prev) => ({
        ...prev,
        apiResponse: response,
      }));

      // Handle different response structures
      if (response.success && response.data) {
        // If the response has a success flag and data property
        setKycData(response.data);
        console.log("KYC data set from response.data:", response.data);
      } else if (response.data && Array.isArray(response.data)) {
        // If data is an array, take the first item
        setKycData(response.data[0] || null);
        console.log("KYC data set from array:", response.data[0]);
      } else if (response.data) {
        // If data is directly the KYC object
        setKycData(response.data);
        console.log("KYC data set directly:", response.data);
      } else if (Array.isArray(response)) {
        // If response is directly an array
        setKycData(response[0] || null);
        console.log("KYC data set from direct array:", response[0]);
      } else {
        // If response is directly the KYC object
        setKycData(response || null);
        console.log("KYC data set from direct response:", response);
      }

      setLastUpdated(new Date());

      // Clear any previous errors
      setError(null);
    } catch (err: any) {
      console.error("Error fetching KYC documents:", err);

      // Enhanced error handling
      let errorMessage = "Failed to fetch KYC documents";

      if (err.response) {
        // Server responded with error status
        console.error("Server error response:", err.response);
        if (err.response.status === 404) {
          // KYC not found is not necessarily an error - user might not have uploaded documents yet
          setKycData(null);
          console.log("KYC not found - user hasn't uploaded documents yet");
          setError(null); // Don't show error for 404
          return;
        }
        errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response received:", err.request);
        errorMessage = "No response from server. Please check your connection.";
      } else if (err.message) {
        // Something else happened
        errorMessage = err.message;
      }

      setError(errorMessage);

      // Update debug info with error
      setDebugInfo((prev) => ({
        ...prev,
        apiResponse: { error: err.message, details: err.response?.data },
      }));
    } finally {
      setLoading(false);
    }
  };

  // Create KYC document with all required fields
  const createKycDocument = async (documentData: Partial<KycDocument>) => {
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("No authentication token found");
      }

      // Ensure all required fields are present for initial creation
      const kycPayload = {
        userId,
        nationalId: documentData.nationalId || "",
        passportPhoto: documentData.passportPhoto || "",
        proofOfResident: documentData.proofOfResident || "",
        paySlip: documentData.paySlip || "",
        proofOfEmployment: documentData.proofOfEmployment || "",
        // reviewedBy: null, // Set to null initially since no admin has reviewed it yet
        ...documentData, // Override with actual data
      };

      console.log("Creating KYC document with payload:", kycPayload);
      const response = await KycService.createKyc(kycPayload);
      console.log("Create response:", response);

      setSuccess("KYC document created successfully");
      return response.data || response;
    } catch (err: any) {
      console.error("Error creating KYC document:", err);

      // More specific error handling
      if (err.response?.data?.error) {
        const errorMsg = err.response.data.error;
        if (errorMsg.includes("validation failed")) {
          throw new Error("Please ensure all required fields are filled");
        }
      }

      throw new Error(err.message || "Failed to create KYC document");
    }
  };

  // Update KYC document
  const updateKycDocument = async (documentData: Partial<KycDocument>) => {
    try {
      if (!kycData?._id) {
        throw new Error("No KYC document found to update");
      }

      console.log(
        "Updating KYC document with ID:",
        kycData._id,
        "Data:",
        documentData
      );
      const response = await KycService.updateKyc(kycData._id, documentData);
      console.log("Update response:", response);

      setSuccess("KYC document updated successfully");
      return response.data || response;
    } catch (err: any) {
      console.error("Error updating KYC document:", err);
      throw new Error(err.message || "Failed to update KYC document");
    }
  };

  // Delete KYC document
  const deleteKycDocument = async () => {
    if (!kycData?._id) {
      setError("No KYC document found to delete");
      return;
    }

    setDeleting(kycData._id);
    try {
      console.log("Deleting KYC document with ID:", kycData._id);

      // Delete associated files from Supabase first
      const documentsToDelete = [
        kycData.nationalId,
        kycData.passportPhoto,
        kycData.proofOfResident,
        kycData.paySlip,
        kycData.proofOfEmployment,
      ].filter(Boolean); // Remove empty strings

      // Delete files from Supabase
      for (const docUrl of documentsToDelete) {
        await deleteDocumentFromSupabase(docUrl);
      }

      // Delete from database
      await KycService.deleteKyc(kycData._id);
      setKycData(null);
      setSuccess("KYC document deleted successfully");
    } catch (err: any) {
      console.error("Error deleting KYC document:", err);
      setError(err.message || "Failed to delete KYC document");
    } finally {
      setDeleting(null);
    }
  };

  // Handle file upload with Supabase integration
  const handleFileUpload = async (file: File) => {
    if (!selectedDocType) return;

    setUploading(selectedDocType);
    setError(null);
    setSuccess(null);

    const documentLabel = documentTypes.find((d) => d.key === selectedDocType)?.label;

    try {
      console.log("Starting file upload for:", selectedDocType);

      // Upload file to Supabase and get the URL
      const uploadedFileUrl = await uploadDocumentToSupabase(
        file,
        selectedDocType
      );

      if (!uploadedFileUrl) {
        throw new Error("Failed to upload file to storage");
      }

      console.log("File uploaded successfully, URL:", uploadedFileUrl);

      // If there's an existing document with this type, delete the old file
      if (kycData && kycData[selectedDocType as keyof KycDocument]) {
        const oldFileUrl = kycData[
          selectedDocType as keyof KycDocument
        ] as string;
        if (oldFileUrl) {
          console.log("Deleting old file:", oldFileUrl);
          await deleteDocumentFromSupabase(oldFileUrl);
        }
      }

      // Update the document data with the new URL
      const documentUpdate = {
        [selectedDocType]: uploadedFileUrl,
      };

      if (kycData) {
        // Update existing document
        await updateKycDocument(documentUpdate);
      } else {
        // Create new document
        const baseDocument = {
          nationalId: selectedDocType === "nationalId" ? uploadedFileUrl : "",
          passportPhoto:
            selectedDocType === "passportPhoto" ? uploadedFileUrl : "",
          proofOfResident:
            selectedDocType === "proofOfResident" ? uploadedFileUrl : "",
          paySlip: selectedDocType === "paySlip" ? uploadedFileUrl : "",
          proofOfEmployment:
            selectedDocType === "proofOfEmployment" ? uploadedFileUrl : "",
        };
        await createKycDocument(baseDocument);
      }

      // Refresh the data after successful upload
      await fetchKycDocuments();
      setShowUploadModal(false);
      setSelectedDocType(null);

      // Show success notification
      showNotification("success", `${documentLabel} has been uploaded successfully! Your document is now under review.`);

    } catch (err: any) {
      console.error("Error in file upload:", err);
      setError(err.message || "Failed to upload document");
      
      // Show error notification
      showNotification("error", `Failed to upload ${documentLabel}. ${err.message || "Please try again or contact support if the problem persists."}`);
    } finally {
      setUploading(null);
    }
  };

  // Handle document view
  const handleViewDocument = (documentUrl: string) => {
    if (onView) {
      onView(documentUrl);
    } else {
      window.open(documentUrl, "_blank");
    }
  };

  // Get document status
  const getDocumentStatus = (docType: DocumentType) => {
    if (!kycData)
      return { status: "missing", color: "text-red-600", bgColor: "bg-red-50" };

    const docValue = kycData[docType.key];
    if (docValue) {
      if (kycData.reviewedAt) {
        return {
          status: "approved",
          color: "text-green-600",
          bgColor: "bg-green-50",
        };
      }
      return {
        status: "pending",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      };
    }
    return { status: "missing", color: "text-red-600", bgColor: "bg-red-50" };
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Clear messages
  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  useEffect(() => {
    console.log("Component mounted or documents prop changed");
    if (!documents) {
      fetchKycDocuments();
    } else {
      console.log("Using provided documents:", documents);
      setKycData(documents[0] || null);
      setLastUpdated(new Date());
    }
  }, [documents]);

  const completedDocs = documentTypes.filter(
    (docType) => kycData && kycData[docType.key]
  ).length;

  const progress = Math.round((completedDocs / documentTypes.length) * 100);

  // Notification styles
  const notificationStyles = (
    <style>{`
      @keyframes shrink {
        from { width: 100%; }
        to { width: 0%; }
      }
      
      .animate-in {
        animation: slideInFromTop 0.5s ease-out;
      }
      
      @keyframes slideInFromTop {
        from {
          opacity: 0;
          transform: translateY(-50px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `}</style>
  );

  return (
    <>
      {notificationStyles}
      <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">KYC Documents</h2>
            <p className="text-gray-600">
              Complete your Know Your Customer verification
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={fetchKycDocuments}
              disabled={loading}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            {kycData && (
              <button
                onClick={deleteKycDocument}
                disabled={deleting !== null}
                className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {completedDocs}/{documentTypes.length} documents
            </span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-800">{error}</span>
              </div>
              <button
                onClick={clearMessages}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800">{success}</span>
              </div>
              <button
                onClick={clearMessages}
                className="text-green-600 hover:text-green-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center">
              <RefreshCw className="w-5 h-5 text-blue-600 mr-2 animate-spin" />
              <span className="text-blue-800">Loading KYC documents...</span>
            </div>
          </div>
        )}

        {/* Document List */}
        <div className="space-y-4">
          {documentTypes.map((docType) => {
            const status = getDocumentStatus(docType);
            const docValue = kycData?.[docType.key];

            return (
              <div
                key={docType.key}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  status.bgColor
                } ${
                  status.status === "approved"
                    ? "border-green-300"
                    : status.status === "pending"
                    ? "border-orange-300"
                    : "border-red-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${status.bgColor}`}>
                      <docType.icon className={`w-5 h-5 ${status.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {docType.label}
                        {docType.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {docType.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`flex items-center space-x-1 ${status.color}`}
                    >
                      {getStatusIcon(status.status)}
                      <span className="text-sm font-medium capitalize">
                        {status.status}
                      </span>
                    </div>

                    {docValue && (
                      <button
                        onClick={() => handleViewDocument(docValue)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                        title="View document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSelectedDocType(docType.key);
                        setShowUploadModal(true);
                      }}
                      disabled={uploading === docType.key}
                      className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                      title={docValue ? "Replace document" : "Upload document"}
                    >
                      {uploading === docType.key ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Upload{" "}
                  {documentTypes.find((d) => d.key === selectedDocType)?.label}
                </h3>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedDocType(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(file);
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, PDF up to 10MB
                  </span>
                </label>
              </div>

              {uploading && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center">
                    <RefreshCw className="w-4 h-4 text-blue-600 mr-2 animate-spin" />
                    <span className="text-blue-800 text-sm">
                      Uploading document...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Info */}
        {lastUpdated && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          </div>
        )}
        {/* Notification Popup */}
        {submitMessage && (
          <div className="fixed top-4 right-4 z-50 animate-in">
            <div 
              className={`
                max-w-md p-4 rounded-lg shadow-lg border-l-4 backdrop-blur-sm
                ${submitMessage.type === 'success' 
                  ? 'bg-green-50/95 border-green-500 text-green-800' 
                  : 'bg-red-50/95 border-red-500 text-red-800'
                }
              `}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {submitMessage.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">
                    {submitMessage.type === 'success' ? 'Success!' : 'Error!'}
                  </p>
                  <p className="text-sm mt-1 pr-8">
                    {submitMessage.text}
                  </p>
                  {/* Progress bar for auto-dismiss */}
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className={`
                        h-1 rounded-full animate-shrink
                        ${submitMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
                      `}
                      style={{
                        animationDuration: submitMessage.type === 'success' ? '5s' : '7s',
                        animationTimingFunction: 'linear'
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setSubmitMessage(null)}
                  className={`
                    ml-2 flex-shrink-0 p-1 rounded-md hover:bg-opacity-20
                    ${submitMessage.type === 'success' 
                      ? 'text-green-600 hover:bg-green-600' 
                      : 'text-red-600 hover:bg-red-600'
                    }
                  `}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default KycDocuments;