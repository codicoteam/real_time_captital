import React from "react";
import { XCircle, AlertTriangle } from "lucide-react";

interface Loan {
  _id: string;
  productType: string;
  borrowerInfo: {
    firstName?: string;
    middleNames?: string;
    surname?: string;
    email?: string;
    phone?: string;
    mobile?: string;
  };
  amount?: number;
  interestRate?: number;
  term?: number;
  balance?: number;
  status: "pending" | "approved" | "rejected" | "active" | "closed";
  applicationDate: string | Date;
  approvalDate?: string | Date;
  startDate?: string | Date;
  endDate?: string | Date;
  paymentSchedule?: Array<{
    dueDate: string | Date;
    amountDue: number;
    amountPaid?: number;
    paidOn?: string | Date;
    status: "pending" | "paid" | "overdue";
  }>;
}

interface LoanDetailsModalProps {
  selectedLoan: Loan | null;
  onClose: () => void;
  getStatusBadge: (status: string, overdueDays?: number) => React.ReactNode;
  getRiskBadge?: (riskLevel: string) => React.ReactNode;
}

const LoanDetailsModal: React.FC<LoanDetailsModalProps> = ({
  selectedLoan,
  onClose,
  getStatusBadge,
}) => {
  if (!selectedLoan) return null;

  // Helper function to convert string or Date to Date object
  const parseDate = (date: string | Date | undefined): Date | null => {
    if (!date) return null;
    return typeof date === "string" ? new Date(date) : date;
  };

  const borrowerName =
    [
      selectedLoan.borrowerInfo?.firstName,
      selectedLoan.borrowerInfo?.middleNames,
      selectedLoan.borrowerInfo?.surname,
    ]
      .filter(Boolean)
      .join(" ") || "Unknown Borrower";

  // Calculate payment statistics
  const totalPayments = selectedLoan.paymentSchedule?.length || 0;
  const completedPayments =
    selectedLoan.paymentSchedule?.filter((payment) => payment.status === "paid")
      .length || 0;
  const overduePayments =
    selectedLoan.paymentSchedule?.filter(
      (payment) => payment.status === "overdue"
    ).length || 0;

  // Find next payment
  const nextPayment = selectedLoan.paymentSchedule?.find(
    (payment) => payment.status === "pending"
  );

  // Calculate overdue days for first overdue payment
  const firstOverduePayment = selectedLoan.paymentSchedule?.find(
    (payment) => payment.status === "overdue"
  );
  const overdueDays = firstOverduePayment
    ? Math.floor(
        (new Date().getTime() -
          (parseDate(firstOverduePayment.dueDate)?.getTime() || 0)) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-orange-200/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-orange-800">
              Loan Details - {selectedLoan._id}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-700"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-orange-600">
                Borrower
              </label>
              <div className="text-lg font-semibold text-orange-800">
                {borrowerName}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-orange-600">
                Product Type
              </label>
              <div className="text-lg font-semibold text-orange-800">
                {selectedLoan.productType}
              </div>
            </div>
            {selectedLoan.amount && (
              <div>
                <label className="text-sm font-medium text-orange-600">
                  Loan Amount
                </label>
                <div className="text-lg font-semibold text-orange-800">
                  ${selectedLoan.amount.toLocaleString()}
                </div>
              </div>
            )}
            {selectedLoan.interestRate && (
              <div>
                <label className="text-sm font-medium text-orange-600">
                  Interest Rate
                </label>
                <div className="text-lg font-semibold text-orange-800">
                  {selectedLoan.interestRate}%
                </div>
              </div>
            )}
            {selectedLoan.balance !== undefined && (
              <div>
                <label className="text-sm font-medium text-orange-600">
                  Outstanding Balance
                </label>
                <div className="text-lg font-semibold text-red-600">
                  ${selectedLoan.balance.toLocaleString()}
                </div>
              </div>
            )}
            {selectedLoan.term && (
              <div>
                <label className="text-sm font-medium text-orange-600">
                  Term
                </label>
                <div className="text-lg font-semibold text-orange-800">
                  {selectedLoan.term} months
                </div>
              </div>
            )}
          </div>

          {selectedLoan.paymentSchedule &&
            selectedLoan.paymentSchedule.length > 0 && (
              <div className="border-t border-orange-200/50 pt-6">
                <h4 className="text-lg font-semibold text-orange-800 mb-4">
                  Payment Status
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange-600">
                      Payment Progress
                    </span>
                    <span className="text-sm font-semibold text-orange-800">
                      {completedPayments} of {totalPayments} payments
                    </span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-3">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          totalPayments > 0
                            ? (completedPayments / totalPayments) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-center text-sm text-orange-600">
                    {totalPayments > 0
                      ? Math.round((completedPayments / totalPayments) * 100)
                      : 0}
                    % Complete
                  </div>
                </div>
              </div>
            )}

          <div className="border-t border-orange-200/50 pt-6">
            <h4 className="text-lg font-semibold text-orange-800 mb-4">
              Important Dates
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-orange-600">
                  Application Date
                </label>
                <div className="text-base font-semibold text-orange-800">
                  {parseDate(
                    selectedLoan.applicationDate
                  )?.toLocaleDateString() || "N/A"}
                </div>
              </div>
              {selectedLoan.approvalDate && (
                <div>
                  <label className="text-sm font-medium text-orange-600">
                    Approval Date
                  </label>
                  <div className="text-base font-semibold text-orange-800">
                    {parseDate(
                      selectedLoan.approvalDate
                    )?.toLocaleDateString() || "N/A"}
                  </div>
                </div>
              )}
              {selectedLoan.startDate && (
                <div>
                  <label className="text-sm font-medium text-orange-600">
                    Start Date
                  </label>
                  <div className="text-base font-semibold text-orange-800">
                    {parseDate(selectedLoan.startDate)?.toLocaleDateString() ||
                      "N/A"}
                  </div>
                </div>
              )}
              {selectedLoan.endDate && (
                <div>
                  <label className="text-sm font-medium text-orange-600">
                    End Date
                  </label>
                  <div className="text-base font-semibold text-orange-800">
                    {parseDate(selectedLoan.endDate)?.toLocaleDateString() ||
                      "N/A"}
                  </div>
                </div>
              )}
              {nextPayment && (
                <>
                  <div>
                    <label className="text-sm font-medium text-orange-600">
                      Next Payment Date
                    </label>
                    <div className="text-base font-semibold text-orange-800">
                      {parseDate(nextPayment.dueDate)?.toLocaleDateString() ||
                        "N/A"}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-orange-600">
                      Next Payment Amount
                    </label>
                    <div className="text-base font-semibold text-orange-800">
                      ${nextPayment.amountDue.toLocaleString()}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-orange-200/50 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-orange-600">
                  Current Status:
                </div>
                {getStatusBadge(selectedLoan.status, overdueDays)}
              </div>
            </div>
          </div>

          {overdueDays > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div className="text-sm font-semibold text-red-800">
                  This loan has overdue payments ({overdueDays} days overdue)
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-orange-50/50 border-t border-orange-200/50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-xl text-sm font-medium text-orange-700 transition-all duration-200"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl text-sm font-medium text-white transition-all duration-200">
            Edit Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsModal;
