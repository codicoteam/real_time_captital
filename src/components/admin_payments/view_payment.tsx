import React from "react";
import {
  X,
  Calendar,
  CreditCard,
  User,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: {
    _id: string;
    loan: {
      _id: string;
      loanAmount: number;
      loanType: string;
    };
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    amountPaid: number;
    paymentDate: string;
    paymentMethod: string;
    paymentReference: string;
    forInstallmentDate: string;
    status: "confirmed" | "pending" | "failed";
    notes?: string;
    createdAt: string;
    updatedAt: string;
  };
}

const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({
  isOpen,
  onClose,
  payment,
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Payment Details</h2>
              <p className="text-white/90 text-sm mt-1">
                Reference: {payment.paymentReference}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                {getStatusIcon(payment.status)}
                <span className="text-sm font-medium text-gray-600">
                  Status
                </span>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  payment.status
                )}`}
              >
                {payment.status.charAt(0).toUpperCase() +
                  payment.status.slice(1)}
              </span>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-600">
                  Amount Paid
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(payment.amountPaid)}
              </p>
            </div>
          </div>

          {/* User Information */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <User className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                User Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-800">
                  {payment.user.firstName} {payment.user.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">
                  {payment.user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <CreditCard className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Payment Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium text-gray-800">
                  {payment.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Date</p>
                <p className="font-medium text-gray-800">
                  {formatDate(payment.paymentDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">For Installment Date</p>
                <p className="font-medium text-gray-800">
                  {formatDate(payment.forInstallmentDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reference</p>
                <p className="font-medium text-gray-800 break-all">
                  {payment.paymentReference}
                </p>
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Loan Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Loan ID</p>
                <p className="font-medium text-gray-800">{payment.loan._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Loan Amount</p>
                <p className="font-medium text-gray-800">
                  {formatCurrency(payment.loan.loanAmount)}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Loan Type</p>
                <p className="font-medium text-gray-800">
                  {payment.loan.loanType}
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {payment.notes && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
              </div>
              <p className="text-gray-700">{payment.notes}</p>
            </div>
          )}

          {/* Timestamps */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Timestamps
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Created At</p>
                <p className="font-medium text-gray-800">
                  {formatDate(payment.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Updated At</p>
                <p className="font-medium text-gray-800">
                  {formatDate(payment.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded-lg hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-lg">
              Edit Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
