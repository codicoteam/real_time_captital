import React, { useState } from "react";
import { Plus, DollarSign, Send } from "lucide-react";
import LoanService from "../../services/user_Services/loan_Service";
import { jwtDecode } from "jwt-decode";

interface FormData {
  productType: string;
  amount: string;
  interestRate: string;
  term: string;

  // Borrower Info
  firstName: string;
  middleNames: string;
  surname: string;
  alias: string;
  idNumber: string;
  passport: string;
  email: string;
  phone: string;
  mobile: string;
  ecocash: boolean;
  oneMoney: boolean;
  innsBucks: boolean;
  maritalStatus: string;
  children: string;
  childrenUnder18: string;
  dependents: string;

  // Current Address
  street: string;
  city: string;
  province: string;
  addressPhone: string;
  addressMobile: string;
  work: string;
  owned: boolean;
  rentAmount: string;
  historyYears: string;

  // Employment/Business
  employmentType: string;
  company: string;
  jobTitle: string;
  employmentAddress: string;
  suburb: string;
  employmentCity: string;
  employmentProvince: string;
  contactEmail: string;
  contactPhone: string;
  salary: string;
  employmentFrom: string;
  employmentTo: string;

  // Business fields
  businessName: string;
  businessDescription: string;
  multipleLocations: boolean;
  businessAddress: string;
  businessSuburb: string;
  businessCity: string;
  businessProvince: string;
  leased: boolean;
  leaseCost: string;
  ownPremises: boolean;
  titleDeedAttached: boolean;
  tradingLicenseAttached: boolean;
  netIncome: string;
  businessFrom: string;
  businessTo: string;

  // Financial Summary
  hustleProfit: string;
  businessExpenses: string;
  bonuses: string;
  rent: string;
  rentalIncome: string;
  schoolFees: string;
  investmentIncome: string;
  ratesAndBills: string;
  otherIncome: string;
  loanRepayments: string;
  otherDebts: string;

  // Bank References
  bankInstitution: string;
  currentAccount: string;
  savingsAccount: string;
  loanNumber: string;
  loanBalance: string;
  branch: string;

  // Bankruptcy
  hasDeclaredBankruptcy: boolean;
  bankruptcyDate: string;
}

interface ProductType {
  value: string;
  label: string;
}

interface MaritalStatusOption {
  value: string;
  label: string;
}

const ApplyNewLoan: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    productType: "",
    amount: "",
    interestRate: "",
    term: "",

    // Borrower Info
    firstName: "",
    middleNames: "",
    surname: "",
    alias: "",
    idNumber: "",
    passport: "",
    email: "",
    phone: "",
    mobile: "",
    ecocash: false,
    oneMoney: false,
    innsBucks: false,
    maritalStatus: "",
    children: "",
    childrenUnder18: "",
    dependents: "",

    // Current Address
    street: "",
    city: "",
    province: "",
    addressPhone: "",
    addressMobile: "",
    work: "",
    owned: false,
    rentAmount: "",
    historyYears: "",

    // Employment/Business
    employmentType: "",
    company: "",
    jobTitle: "",
    employmentAddress: "",
    suburb: "",
    employmentCity: "",
    employmentProvince: "",
    contactEmail: "",
    contactPhone: "",
    salary: "",
    employmentFrom: "",
    employmentTo: "",

    // Business fields
    businessName: "",
    businessDescription: "",
    multipleLocations: false,
    businessAddress: "",
    businessSuburb: "",
    businessCity: "",
    businessProvince: "",
    leased: false,
    leaseCost: "",
    ownPremises: false,
    titleDeedAttached: false,
    tradingLicenseAttached: false,
    netIncome: "",
    businessFrom: "",
    businessTo: "",

    // Financial Summary
    hustleProfit: "",
    businessExpenses: "",
    bonuses: "",
    rent: "",
    rentalIncome: "",
    schoolFees: "",
    investmentIncome: "",
    ratesAndBills: "",
    otherIncome: "",
    loanRepayments: "",
    otherDebts: "",

    // Bank References
    bankInstitution: "",
    currentAccount: "",
    savingsAccount: "",
    loanNumber: "",
    loanBalance: "",
    branch: "",

    // Bankruptcy
    hasDeclaredBankruptcy: false,
    bankruptcyDate: "",
  });

  const productTypes: ProductType[] = [
    {
      value: "Education Loan (Short Term)",
      label: "Education Loan (Short Term)",
    },
    {
      value: "Vehicle Loan (Long Term)",
      label: "Vehicle Loan (Long Term)",
    },
    {
      value: "Solar Loan (LT)",
      label: "Solar Loan (LT)",
    },
    {
      value: "Building Finisher Loan (LT)", // Added space before (LT)
      label: "Building Finisher Loan (LT)",
    },
  ];

  const maritalStatusOptions: MaritalStatusOption[] = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  const provinces: string[] = [
    "Harare",
    "Bulawayo",
    "Manicaland",
    "Mashonaland Central",
    "Mashonaland East",
    "Mashonaland West",
    "Masvingo",
    "Matabeleland North",
    "Matabeleland South",
    "Midlands",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        throw new Error("User not authenticated. Please log in and try again.");
      }

      // Decode the JWT token to get user ID
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id || decodedToken.userId || decodedToken.sub;

      console.log("Decoded token:", decodedToken); // For debugging
      console.log("User ID:", userId); // For debugging

      if (!userId) {
        throw new Error("Invalid token. Please log in again.");
      }

      const loanData = {
        user: userId,
        productType: formData.productType,
        amount: parseFloat(formData.amount),
        interestRate: parseFloat(formData.interestRate) || 0.05, // Default if not provided
        term: parseInt(formData.term),

        borrowerInfo: {
          firstName: formData.firstName,
          middleNames: formData.middleNames,
          surname: formData.surname,
          alias: formData.alias,
          idNumber: formData.idNumber,
          passport: formData.passport,
          email: formData.email,
          phone: formData.phone,
          mobile: formData.mobile,
          ecocash: formData.ecocash,
          oneMoney: formData.oneMoney,
          innsBucks: formData.innsBucks,
          maritalStatus: formData.maritalStatus,
          children: parseInt(formData.children) || 0,
          childrenUnder18: parseInt(formData.childrenUnder18) || 0,
          dependents: parseInt(formData.dependents) || 0,
        },

        residentialHistory: {
          currentAddress: {
            street: formData.street,
            city: formData.city,
            province: formData.province,
            phone: formData.addressPhone,
            mobile: formData.addressMobile,
            work: formData.work,
            owned: formData.owned,
            rentAmount: parseFloat(formData.rentAmount) || 0,
            historyYears: parseInt(formData.historyYears) || 0,
          },
        },

        borrowerEmploymentHistory:
          formData.employmentType === "employed"
            ? [
                {
                  company: formData.company,
                  jobTitle: formData.jobTitle,
                  address: formData.employmentAddress,
                  suburb: formData.suburb,
                  city: formData.employmentCity,
                  province: formData.employmentProvince,
                  contactEmail: formData.contactEmail,
                  contactPhone: formData.contactPhone,
                  salary: parseFloat(formData.salary) || 0,
                  from: formData.employmentFrom,
                  to: formData.employmentTo,
                },
              ]
            : [],

        borrowerBusinessHistory:
          formData.employmentType === "self-employed" ||
          formData.employmentType === "business"
            ? [
                {
                  businessName: formData.businessName,
                  businessDescription: formData.businessDescription,
                  multipleLocations: formData.multipleLocations,
                  address: formData.businessAddress,
                  suburb: formData.businessSuburb,
                  city: formData.businessCity,
                  province: formData.businessProvince,
                  leased: formData.leased,
                  leaseCost: parseFloat(formData.leaseCost) || 0,
                  ownPremises: formData.ownPremises,
                  titleDeedAttached: formData.titleDeedAttached,
                  tradingLicenseAttached: formData.tradingLicenseAttached,
                  netIncome: parseFloat(formData.netIncome) || 0,
                  from: formData.businessFrom,
                  to: formData.businessTo,
                },
              ]
            : [],

        financialSummary: {
          salary: parseFloat(formData.salary) || 0,
          hustleProfit: parseFloat(formData.hustleProfit) || 0,
          businessExpenses: parseFloat(formData.businessExpenses) || 0,
          bonuses: parseFloat(formData.bonuses) || 0,
          rent: parseFloat(formData.rent) || 0,
          rentalIncome: parseFloat(formData.rentalIncome) || 0,
          schoolFees: parseFloat(formData.schoolFees) || 0,
          investmentIncome: parseFloat(formData.investmentIncome) || 0,
          ratesAndBills: parseFloat(formData.ratesAndBills) || 0,
          otherIncome: parseFloat(formData.otherIncome) || 0,
          loanRepayments: parseFloat(formData.loanRepayments) || 0,
          otherDebts: parseFloat(formData.otherDebts) || 0,
        },

        bankReferences: [
          {
            institution: formData.bankInstitution,
            currentAccount: formData.currentAccount,
            savingsAccount: formData.savingsAccount,
            loanNumber: formData.loanNumber,
            loanBalance: parseFloat(formData.loanBalance) || 0,
            branch: formData.branch,
          },
        ],

        bankruptcy: {
          hasDeclared: formData.hasDeclaredBankruptcy,
          declaredDate: formData.bankruptcyDate,
        },

        status: "pending",
        applicationDate: new Date().toISOString().split("T")[0],
      };

      const response = await LoanService.createLoan(loanData);
      setSubmitMessage({
        type: "success",
        text: "Loan application submitted successfully!",
      });
      console.log("Application submitted:", response);
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text:
          typeof error === "string"
            ? error
            : "Failed to submit loan application. Please try again.",
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-2 flex items-center">
          <Plus className="w-6 h-6 mr-2 text-orange-500" />
          Apply for New Loan
        </h3>
        <p className="text-sm text-gray-600">
          Fill out the comprehensive loan application form
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Information */}
        <div className="bg-blue-50/50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-black mb-4">
            Product Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Product Type *
              </label>
              <select
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.productType}
                onChange={(e) =>
                  setFormData({ ...formData, productType: e.target.value })
                }
                required
              >
                <option value="">Select product type</option>
                {productTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Loan Amount *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Term (months) *
              </label>
              <input
                type="number"
                placeholder="Loan term"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.term}
                onChange={(e) =>
                  setFormData({ ...formData, term: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        {/* Borrower Information */}
        <div className="bg-green-50/50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-black mb-4">
            Borrower Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                First Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Middle Names
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.middleNames}
                onChange={(e) =>
                  setFormData({ ...formData, middleNames: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Surname *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.surname}
                onChange={(e) =>
                  setFormData({ ...formData, surname: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                ID Number *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.idNumber}
                onChange={(e) =>
                  setFormData({ ...formData, idNumber: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email *
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Mobile *
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Marital Status
              </label>
              <select
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.maritalStatus}
                onChange={(e) =>
                  setFormData({ ...formData, maritalStatus: e.target.value })
                }
              >
                <option value="">Select status</option>
                {maritalStatusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Children
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.children}
                onChange={(e) =>
                  setFormData({ ...formData, children: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Dependents
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.dependents}
                onChange={(e) =>
                  setFormData({ ...formData, dependents: e.target.value })
                }
              />
            </div>
          </div>

          {/* Mobile Money Options */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-black mb-2">
              Mobile Money Services
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-gray-600"
                  checked={formData.ecocash}
                  onChange={(e) =>
                    setFormData({ ...formData, ecocash: e.target.checked })
                  }
                />
                EcoCash
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-gray-600"
                  checked={formData.oneMoney}
                  onChange={(e) =>
                    setFormData({ ...formData, oneMoney: e.target.checked })
                  }
                />
                OneMoney
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-gray-600"
                  checked={formData.innsBucks}
                  onChange={(e) =>
                    setFormData({ ...formData, innsBucks: e.target.checked })
                  }
                />
                InnsBucks
              </label>
            </div>
          </div>
        </div>

        {/* Current Address */}
        <div className="bg-purple-50/50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-black mb-4">
            Current Address
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                City *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Province *
              </label>
              <select
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.province}
                onChange={(e) =>
                  setFormData({ ...formData, province: e.target.value })
                }
                required
              >
                <option value="">Select province</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Years at Address
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.historyYears}
                onChange={(e) =>
                  setFormData({ ...formData, historyYears: e.target.value })
                }
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 text-gray-600"
                checked={formData.owned}
                onChange={(e) =>
                  setFormData({ ...formData, owned: e.target.checked })
                }
              />
              <label className="text-sm font-medium text-gray-700">
                Own Property
              </label>
            </div>

            {!formData.owned && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Monthly Rent
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.rentAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, rentAmount: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* Employment/Business Information */}
        <div className="bg-yellow-50/50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-black mb-4">
            Employment/Business Information
          </h4>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Employment Type *
            </label>
            <select
              className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={formData.employmentType}
              onChange={(e) =>
                setFormData({ ...formData, employmentType: e.target.value })
              }
              required
            >
              <option value="">Select type</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self Employed</option>
              <option value="business">Business Owner</option>
            </select>
          </div>

          {formData.employmentType === "employed" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Salary *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                  <input
                    type="number"
                    className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {(formData.employmentType === "self-employed" ||
            formData.employmentType === "business") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Business Description
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.businessDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessDescription: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Monthly Net Income *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                  <input
                    type="number"
                    className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={formData.netIncome}
                    onChange={(e) =>
                      setFormData({ ...formData, netIncome: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-gray-600"
                  checked={formData.ownPremises}
                  onChange={(e) =>
                    setFormData({ ...formData, ownPremises: e.target.checked })
                  }
                />
                <label className="text-sm font-medium text-black">
                  Own Business Premises
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Bank References */}
        <div className="bg-indigo-50/50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-black mb-4">
            Bank References
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Bank Institution
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.bankInstitution}
                onChange={(e) =>
                  setFormData({ ...formData, bankInstitution: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Current Account Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.currentAccount}
                onChange={(e) =>
                  setFormData({ ...formData, currentAccount: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Branch
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.branch}
                onChange={(e) =>
                  setFormData({ ...formData, branch: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Existing Loan Balance
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.loanBalance}
                  onChange={(e) =>
                    setFormData({ ...formData, loanBalance: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bankruptcy Declaration */}
        <div className="bg-red-50/50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-black mb-4">
            Bankruptcy Declaration
          </h4>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2 text-graye-600"
              checked={formData.hasDeclaredBankruptcy}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hasDeclaredBankruptcy: e.target.checked,
                })
              }
            />
            <label className="text-sm font-medium text-gray-700">
              Have you ever declared bankruptcy?
            </label>
          </div>

          {formData.hasDeclaredBankruptcy && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Bankruptcy Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-orage-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.bankruptcyDate}
                onChange={(e) =>
                  setFormData({ ...formData, bankruptcyDate: e.target.value })
                }
              />
            </div>
          )}
        </div>

        {/* Financial Summary */}
        <div className="bg-emerald-50/50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-black mb-4">
            Financial Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Monthly Rental Income
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.rentalIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, rentalIncome: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Income
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.investmentIncome}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      investmentIncome: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Income
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.otherIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, otherIncome: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Monthly Rent Payment
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orang-500" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.rent}
                  onChange={(e) =>
                    setFormData({ ...formData, rent: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                School Fees
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.schoolFees}
                  onChange={(e) =>
                    setFormData({ ...formData, schoolFees: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Rates and Bills
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.ratesAndBills}
                  onChange={(e) =>
                    setFormData({ ...formData, ratesAndBills: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Current Loan Repayments
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.loanRepayments}
                  onChange={(e) =>
                    setFormData({ ...formData, loanRepayments: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Other Debts
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.otherDebts}
                  onChange={(e) =>
                    setFormData({ ...formData, otherDebts: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Business Expenses
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-300" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.businessExpenses}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessExpenses: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:via-orange-600 hover:to-yellow-600  transform hover:scale-105"
            } text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl`}
          >
            <Send className="w-5 h-5" />
            <span>
              {isSubmitting ? "Submitting..." : "Submit Loan Application"}
            </span>
          </button>
          {submitMessage && (
            <div
              className={`mb-4 p-4 rounded-xl ${
                submitMessage.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {submitMessage.text}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplyNewLoan;
