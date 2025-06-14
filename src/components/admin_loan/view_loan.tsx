import React, { useState } from "react";
import {
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  CreditCard,
  Users,
  Briefcase,
  Home,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Interfaces based on your schema
interface Address {
  street?: string;
  city?: string;
  province?: string;
  phone?: string;
  mobile?: string;
  work?: string;
  owned?: boolean;
  rentAmount?: number;
  historyYears?: number;
}

interface Employment {
  company?: string;
  jobTitle?: string;
  address?: string;
  suburb?: string;
  city?: string;
  province?: string;
  contactEmail?: string;
  contactPhone?: string;
  salary?: number;
  from?: string;
  to?: string;
}

interface Business {
  name?: string;
  description?: string;
  multipleLocations?: boolean;
  address?: string;
  suburb?: string;
  city?: string;
  province?: string;
  leased?: boolean;
  leaseCost?: number;
  ownPremises?: boolean;
  titleDeedAttached?: boolean;
  tradingLicenseAttached?: boolean;
  netIncome?: number;
  from?: string;
  to?: string;
}

interface FinancialSummary {
  salary?: number;
  hustleProfit?: number;
  businessExpenses?: number;
  bonuses?: number;
  rent?: number;
  rentalIncome?: number;
  schoolFees?: number;
  investmentIncome?: number;
  ratesAndBills?: number;
  otherIncome?: number;
  loanRepayments?: number;
  otherDebts?: number;
  totalIncome?: number;
  totalExpenses?: number;
  netIncome?: number;
}

interface AssetLiability {
  assets?: {
    property?: string[];
    vehicles?: string[];
    furniture?: number;
    machinery?: number;
    artwork?: number;
    shares?: string[];
    pension?: number;
    mutualFunds?: number;
    total?: number;
  };
  liabilities?: {
    mortgages?: number[];
    bankLoans?: number[];
    retailLoans?: string[];
    otherDebts?: string[];
    total?: number;
  };
  net?: number;
}

interface BankReference {
  institution?: string;
  currentAccount?: string;
  savingsAccount?: string;
  loanNumber?: string;
  loanBalance?: number;
  branch?: string;
}

interface PaymentSchedule {
  dueDate?: string;
  amountDue?: number;
  amountPaid?: number;
  paidOn?: string;
  status?: "pending" | "paid" | "overdue";
}

interface Loan {
  _id: string;
  user: string;
  productType: string;
  borrowerInfo: {
    firstName?: string;
    middleNames?: string;
    surname?: string;
    alias?: string;
    idNumber?: string;
    passport?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    ecocash?: boolean;
    oneMoney?: boolean;
    innsBucks?: boolean;
    maritalStatus?: string;
    children?: number;
    childrenUnder18?: number;
    dependents?: number;
  };
  spouseInfo?: {
    employed?: boolean;
    firstName?: string;
    middleNames?: string;
    surname?: string;
    alias?: string;
    idNumber?: string;
    passport?: string;
    phone?: string;
    mobile?: string;
    email?: string;
    ecocash?: boolean;
    oneMoney?: boolean;
    innsBucks?: boolean;
  };
  residentialHistory?: {
    currentAddress?: Address;
    previousAddress?: Address;
    landlordName?: string;
    rentalCompany?: string;
  };
  borrowerEmploymentHistory?: Employment[];
  borrowerBusinessHistory?: Business[];
  spouseEmploymentHistory?: Employment[];
  spouseBusinessHistory?: Business[];
  financialSummary?: FinancialSummary;
  borrowerAssetsLiabilities?: AssetLiability;
  spouseAssetsLiabilities?: AssetLiability;
  bankReferences?: BankReference[];
  bankruptcy?: {
    hasDeclared?: boolean;
    declaredDate?: string;
  };
  status: "pending" | "approved" | "rejected" | "active" | "closed";
  applicationDate: string;
  approvalDate?: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
  interestRate?: number;
  term?: number;
  balance?: number;
  paymentSchedule?: PaymentSchedule[];
  createdAt: string;
  updatedAt: string;
}

interface LoanDetailsModalProps {
  selectedLoan: Loan | null;
  onClose: () => void;
}

const LoanDetailsModal: React.FC<LoanDetailsModalProps> = ({
  selectedLoan,
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    borrowerInfo: true,
    loanDetails: true,
  });

  if (!selectedLoan) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "active":
        return "text-green-700 bg-green-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "rejected":
        return "text-red-700 bg-red-100";
      case "closed":
        return "text-gray-700 bg-gray-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return "LN";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const CollapsibleSection = ({ title, children, sectionKey, icon }: any) => (
    <div className="border border-orange-200/50 rounded-xl overflow-hidden">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full px-4 py-3 bg-orange-50/50 hover:bg-orange-100/50 flex items-center justify-between text-left transition-colors duration-200"
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span className="font-semibold text-orange-800">{title}</span>
        </div>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-5 h-5 text-orange-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-orange-600" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="p-4 space-y-4">{children}</div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-orange-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                {getInitials(
                  selectedLoan.borrowerInfo?.firstName,
                  selectedLoan.borrowerInfo?.surname
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-800">
                  Loan Details - {selectedLoan.borrowerInfo?.firstName}{" "}
                  {selectedLoan.borrowerInfo?.surname}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                      selectedLoan.status
                    )}`}
                  >
                    {getStatusIcon(selectedLoan.status)}
                    <span className="capitalize">{selectedLoan.status}</span>
                  </span>
                  <span className="text-sm text-orange-600">
                    {selectedLoan.productType}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-700 transition-all duration-200"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Loan Overview */}
          <CollapsibleSection
            title="Loan Overview"
            sectionKey="loanDetails"
            icon={<CreditCard className="w-5 h-5 text-orange-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm font-medium">Loan Amount</span>
                </div>
                <div className="text-2xl font-bold">
                  {formatCurrency(selectedLoan.amount)}
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-medium">Interest Rate</span>
                </div>
                <div className="text-2xl font-bold">
                  {selectedLoan.interestRate || 0}%
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">Term</span>
                </div>
                <div className="text-2xl font-bold">
                  {selectedLoan.term || 0} months
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600">
                  Current Balance
                </label>
                <div className="text-lg font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                  {formatCurrency(selectedLoan.balance)}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600">
                  Application Date
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                  {formatDate(selectedLoan.applicationDate)}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Borrower Information */}
          <CollapsibleSection
            title="Borrower Information"
            sectionKey="borrowerInfo"
            icon={<User className="w-5 h-5 text-orange-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600">
                  Full Name
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                  {selectedLoan.borrowerInfo?.firstName}{" "}
                  {selectedLoan.borrowerInfo?.middleNames}{" "}
                  {selectedLoan.borrowerInfo?.surname}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600">
                  ID Number
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                  {selectedLoan.borrowerInfo?.idNumber || "N/A"}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600 flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg break-all">
                  {selectedLoan.borrowerInfo?.email || "N/A"}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600 flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>Phone</span>
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                  {selectedLoan.borrowerInfo?.phone ||
                    selectedLoan.borrowerInfo?.mobile ||
                    "N/A"}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600">
                  Marital Status
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                  {selectedLoan.borrowerInfo?.maritalStatus || "N/A"}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600 flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Children</span>
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                  {selectedLoan.borrowerInfo?.children || 0} (
                  {selectedLoan.borrowerInfo?.childrenUnder18 || 0} under 18)
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Financial Summary */}
          {selectedLoan.financialSummary && (
            <CollapsibleSection
              title="Financial Summary"
              sectionKey="financialSummary"
              icon={<TrendingUp className="w-5 h-5 text-orange-600" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600">
                    Total Income
                  </label>
                  <div className="text-lg font-semibold text-green-700 bg-green-50 p-3 rounded-lg">
                    {formatCurrency(selectedLoan.financialSummary.totalIncome)}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600">
                    Total Expenses
                  </label>
                  <div className="text-lg font-semibold text-red-700 bg-red-50 p-3 rounded-lg">
                    {formatCurrency(
                      selectedLoan.financialSummary.totalExpenses
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600">
                    Net Income
                  </label>
                  <div className="text-lg font-semibold text-blue-700 bg-blue-50 p-3 rounded-lg">
                    {formatCurrency(selectedLoan.financialSummary.netIncome)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600">
                    Salary
                  </label>
                  <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                    {formatCurrency(selectedLoan.financialSummary.salary)}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600">
                    Business Income
                  </label>
                  <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                    {formatCurrency(selectedLoan.financialSummary.hustleProfit)}
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          )}

          {/* Residential History */}
          {selectedLoan.residentialHistory && (
            <CollapsibleSection
              title="Residential History"
              sectionKey="residentialHistory"
              icon={<Home className="w-5 h-5 text-orange-600" />}
            >
              {selectedLoan.residentialHistory.currentAddress && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-600 flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>Current Address</span>
                  </label>
                  <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                    {selectedLoan.residentialHistory.currentAddress.street},{" "}
                    {selectedLoan.residentialHistory.currentAddress.city},{" "}
                    {selectedLoan.residentialHistory.currentAddress.province}
                  </div>
                </div>
              )}
            </CollapsibleSection>
          )}

          {/* Employment History */}
          {selectedLoan.borrowerEmploymentHistory &&
            selectedLoan.borrowerEmploymentHistory.length > 0 && (
              <CollapsibleSection
                title="Employment History"
                sectionKey="employmentHistory"
                icon={<Briefcase className="w-5 h-5 text-orange-600" />}
              >
                <div className="space-y-4">
                  {selectedLoan.borrowerEmploymentHistory.map(
                    (employment, index) => (
                      <div
                        key={index}
                        className="border border-orange-200/30 rounded-lg p-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-orange-600">
                              Company
                            </label>
                            <div className="text-base font-semibold text-orange-800">
                              {employment.company || "N/A"}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-orange-600">
                              Job Title
                            </label>
                            <div className="text-base font-semibold text-orange-800">
                              {employment.jobTitle || "N/A"}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-orange-600">
                              Salary
                            </label>
                            <div className="text-base font-semibold text-orange-800">
                              {formatCurrency(employment.salary)}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-orange-600">
                              Period
                            </label>
                            <div className="text-base font-semibold text-orange-800">
                              {formatDate(employment.from)} -{" "}
                              {formatDate(employment.to)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CollapsibleSection>
            )}

          {/* Bank References */}
          {selectedLoan.bankReferences &&
            selectedLoan.bankReferences.length > 0 && (
              <CollapsibleSection
                title="Bank References"
                sectionKey="bankReferences"
                icon={<Building className="w-5 h-5 text-orange-600" />}
              >
                <div className="space-y-4">
                  {selectedLoan.bankReferences.map((bank, index) => (
                    <div
                      key={index}
                      className="border border-orange-200/30 rounded-lg p-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-orange-600">
                            Institution
                          </label>
                          <div className="text-base font-semibold text-orange-800">
                            {bank.institution || "N/A"}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-orange-600">
                            Branch
                          </label>
                          <div className="text-base font-semibold text-orange-800">
                            {bank.branch || "N/A"}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-orange-600">
                            Current Account
                          </label>
                          <div className="text-base font-semibold text-orange-800">
                            {bank.currentAccount || "N/A"}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-orange-600">
                            Loan Balance
                          </label>
                          <div className="text-base font-semibold text-orange-800">
                            {formatCurrency(bank.loanBalance)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            )}

          {/* Loan ID */}
          <div className="border-t border-orange-200/50 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-orange-600">
                Loan ID
              </label>
              <div className="text-sm font-mono text-orange-700 bg-orange-50/50 p-3 rounded-lg border border-orange-200/30">
                {selectedLoan._id}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-orange-50/50 border-t border-orange-200/50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-xl text-sm font-medium text-orange-700 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailsModal;
