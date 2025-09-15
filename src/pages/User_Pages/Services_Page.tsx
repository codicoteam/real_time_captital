import React from "react";
import {
  Building2,
  Users,
  CreditCard,
  Car,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  DollarSign,
  FileText,
  TrendingUp,
  User,
  Percent,
} from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

const ServicesPage = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [expandedService, setExpandedService] = React.useState<number | null>(
    null
  );
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  // Theme-aware classes
  const themeClasses = {
    bg: isDarkMode ? "bg-gray-950" : "bg-gray-50",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-500",
    cardBg: isDarkMode ? "bg-black/30" : "bg-white/30",
    cardBgAlt: isDarkMode ? "bg-black/40" : "bg-white/40",
    border: isDarkMode ? "border-white/10" : "border-gray-200/30",
    borderHover: isDarkMode ? "border-white/20" : "border-gray-300/50",
    backgroundGradient: isDarkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black"
      : "bg-gradient-to-br from-gray-100 via-white to-gray-200",
    glowEffect: isDarkMode ? "shadow-red-500/25" : "shadow-red-500/15",
    hoverBg: isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100/50",
  };

  const services = [
    {
      id: "business-loans",
      title: "Business Loans",
      icon: <Building2 className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      shortDescription:
        "Fuel your business growth with flexible financing solutions tailored for entrepreneurs and established businesses.",
      fullDescription:
        "These are loans for registered businesses, designed to help expand operations, purchase equipment, manage cash flow, or invest in new opportunities. Our business loans come with competitive rates and flexible repayment terms.",
      color: "from-blue-500 to-indigo-500",
      features: [
        "Quick approval process",
        "Flexible repayment terms",
        "Competitive interest rates",
        "No hidden fees",
        "Business growth support",
      ],
      requirements: [
        "Valid business registration",
        "Business financial statements",
        "Bank statements (6 months)",
        "Business plan",
        "Collateral (if applicable)",
      ],
      loanAmount: "$5,000 - $500,000",
      interestRate: "8% - 15% per annum",
      repaymentPeriod: "6 months - 5 years",
    },
    {
      id: "civil-servants-loans",
      title: "Civil Servants/SSB Loans",
      icon: <Users className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      shortDescription:
        "Specialized loans for government employees with competitive rates and salary-based repayments.",
      fullDescription:
        "These are loans for government employees and are based on one's salary with repayments being made directly from the government's Salary Services Bureau. Mainly targeting individuals employed by the government of Zimbabwe whose primary source of repayment is their monthly salary. Facility is only available for civil servants.",
      color: "from-green-500 to-emerald-500",
      features: [
        "Salary-based repayments",
        "Direct deduction from payroll",
        "Preferential rates for government employees",
        "Quick processing",
        "Minimal documentation",
      ],
      requirements: [
        "Government employment certificate",
        "Salary slips (3 months)",
        "National ID",
        "Bank statements",
        "Service letter",
      ],
      loanAmount: "$1,000 - $50,000",
      interestRate: "6% - 12% per annum",
      repaymentPeriod: "12 months - 4 years",
    },
    {
      id: "salary-based-loans",
      title: "Salary Based Loans",
      icon: <CreditCard className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c58e9c9d?w=600&h=400&fit=crop",
      shortDescription:
        "Quick personal loans based on your monthly salary with instant approval and competitive rates.",
      fullDescription:
        "Quick loans based on your monthly salary with instant approval and competitive interest rates for salaried employees. Perfect for personal expenses, emergencies, or planned purchases.",
      color: "from-purple-500 to-pink-500",
      features: [
        "Instant approval",
        "Based on salary multiples",
        "Quick disbursement",
        "Online application",
        "Flexible use of funds",
      ],
      requirements: [
        "Employment letter",
        "Salary slips (3 months)",
        "Bank statements",
        "National ID",
        "Proof of address",
      ],
      loanAmount: "$500 - $25,000",
      interestRate: "10% - 18% per annum",
      repaymentPeriod: "6 months - 3 years",
    },
    {
      id: "asset-finance",
      title: "Asset Finance",
      icon: <Car className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      shortDescription:
        "Finance your valuable assets including vehicles, property, and equipment with competitive terms.",
      fullDescription:
        "Loans financing against your valuable assets including vehicles, property, and equipment as collateral. Perfect for acquiring business assets or personal property with the asset serving as security.",
      color: "from-orange-500 to-red-500",
      features: [
        "Asset as collateral",
        "Lower interest rates",
        "Longer repayment terms",
        "Retain asset ownership",
        "Quick valuation process",
      ],
      requirements: [
        "Asset valuation report",
        "Proof of ownership",
        "Insurance documents",
        "Income verification",
        "National ID",
      ],
      loanAmount: "$10,000 - $1,000,000",
      interestRate: "7% - 14% per annum",
      repaymentPeriod: "1 year - 7 years",
    },
    {
      id: "collateral-loans",
      title: "Collateral Loans",
      icon: <Shield className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=600&h=400&fit=crop",
      shortDescription:
        "Secure loans backed by valuable assets with lower interest rates and flexible repayment terms.",
      fullDescription:
        "Secure loans backed by your valuable assets. Lower interest rates with flexible repayment terms using property, vehicles, or other valuable assets as security for the loan.",
      color: "from-teal-500 to-cyan-500",
      features: [
        "Lower interest rates",
        "Higher loan amounts",
        "Flexible terms",
        "Multiple collateral options",
        "Quick approval with collateral",
      ],
      requirements: [
        "Collateral documents",
        "Asset valuation",
        "Proof of ownership",
        "Insurance coverage",
        "Income proof",
      ],
      loanAmount: "$15,000 - $2,000,000",
      interestRate: "5% - 12% per annum",
      repaymentPeriod: "1 year - 10 years",
    },
    {
      id: "pensioner-loans",
      title: "Pensioner Loans",
      icon: <User className="w-8 h-8" />,
      image:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop",
      shortDescription:
        "Specialized loans for retirees with pension-backed security and favorable terms.",
      fullDescription:
        "These are loans specifically designed for retirees with pension-backed security and favorable terms. Perfect for pensioners who need financial assistance with guaranteed pension income as security.",
      color: "from-indigo-500 to-purple-500",
      features: [
        "Pension-backed security",
        "Senior-friendly terms",
        "Lower documentation",
        "Favorable interest rates",
        "Flexible repayment",
      ],
      requirements: [
        "Pension certificate",
        "Pension slips (6 months)",
        "National ID",
        "Bank statements",
        "Medical certificate",
      ],
      loanAmount: "$1,000 - $30,000",
      interestRate: "8% - 15% per annum",
      repaymentPeriod: "12 months - 5 years",
    },
  ];

  return (
    <div
      className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-hidden transition-colors duration-300`}
    >
      {/* Animated Background */}
      <div
        className={`fixed inset-0 ${themeClasses.backgroundGradient} transition-all duration-300`}
      >
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent_50%)]"
          }`}
        ></div>
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.1),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.05),transparent_50%)]"
          }`}
        ></div>
        <div
          className={`absolute w-96 h-96 bg-gradient-to-r ${
            isDarkMode
              ? "from-red-500/20 to-yellow-500/20"
              : "from-red-500/10 to-yellow-500/10"
          } rounded-full blur-3xl transition-all duration-1000 ease-out`}
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        // scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <section className="relative pt-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center ">
            <h1
              className={`text-6xl lg:text-7xl font-bold leading-tight mb-8 ${themeClasses.text}`}
            >
              Our
              <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                {" "}
                Services
              </span>
            </h1>
            <p
              className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-4xl mx-auto`}
            >
              Discover our comprehensive range of financial solutions designed
              to meet your unique needs. From business growth to personal goals,
              we have the perfect loan product for you.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl overflow-hidden border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10`}
              >
                {/* Service Header */}
                <div className="grid lg:grid-cols-3 gap-8 p-8">
                  {/* Service Image */}
                  <div className="lg:col-span-1">
                    <div className="relative h-64 lg:h-full min-h-[250px] rounded-2xl overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`}
                      ></div>
                      <div className="absolute top-4 left-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                        >
                          {service.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3
                        className={`text-3xl font-bold ${themeClasses.text} mb-4`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`${themeClasses.textSecondary} text-lg leading-relaxed mb-6`}
                      >
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Key Details */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div
                        className={`${
                          isDarkMode ? "bg-white/5" : "bg-gray-100/50"
                        } rounded-xl p-4 backdrop-blur-sm`}
                      >
                        <div className="flex items-center mb-2">
                          <DollarSign className="w-5 h-5 text-green-400 mr-2" />
                          <span
                            className={`text-sm font-semibold ${themeClasses.text}`}
                          >
                            Loan Amount
                          </span>
                        </div>
                        <p className={`${themeClasses.textMuted} text-sm`}>
                          {service.loanAmount}
                        </p>
                      </div>
                      <div
                        className={`${
                          isDarkMode ? "bg-white/5" : "bg-gray-100/50"
                        } rounded-xl p-4 backdrop-blur-sm`}
                      >
                        <div className="flex items-center mb-2">
                          <Percent className="w-5 h-5 text-blue-400 mr-2" />
                          <span
                            className={`text-sm font-semibold ${themeClasses.text}`}
                          >
                            Interest Rate
                          </span>
                        </div>
                        <p className={`${themeClasses.textMuted} text-sm`}>
                          {service.interestRate}
                        </p>
                      </div>
                      <div
                        className={`${
                          isDarkMode ? "bg-white/5" : "bg-gray-100/50"
                        } rounded-xl p-4 backdrop-blur-sm`}
                      >
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 text-orange-400 mr-2" />
                          <span
                            className={`text-sm font-semibold ${themeClasses.text}`}
                          >
                            Repayment
                          </span>
                        </div>
                        <p className={`${themeClasses.textMuted} text-sm`}>
                          {service.repaymentPeriod}
                        </p>
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={() => toggleService(index)}
                      className={`w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r ${service.color} text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg`}
                    >
                      {expandedService === index ? (
                        <>
                          Less Details <ChevronUp className="ml-2 w-5 h-5" />
                        </>
                      ) : (
                        <>
                          More Details <ChevronDown className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedService === index && (
                  <div
                    className={`border-t ${themeClasses.border} p-8 ${
                      isDarkMode ? "bg-white/5" : "bg-gray-100/30"
                    } backdrop-blur-sm`}
                  >
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Full Description */}
                      <div className="lg:col-span-3 mb-8">
                        <h4
                          className={`text-xl font-semibold ${themeClasses.text} mb-4`}
                        >
                          What is a {service.title}?
                        </h4>
                        <p
                          className={`${themeClasses.textSecondary} leading-relaxed`}
                        >
                          {service.fullDescription}
                        </p>
                      </div>

                      {/* Features */}
                      <div>
                        <h4
                          className={`text-lg font-semibold ${themeClasses.text} mb-4 flex items-center`}
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className={`flex items-start ${themeClasses.textSecondary} text-sm`}
                            >
                              <div className="w-2 h-2 bg-gradient-to-br from-red-400 to-yellow-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h4
                          className={`text-lg font-semibold ${themeClasses.text} mb-4 flex items-center`}
                        >
                          <FileText className="w-5 h-5 text-blue-400 mr-2" />
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {service.requirements.map((requirement, idx) => (
                            <li
                              key={idx}
                              className={`flex items-start ${themeClasses.textSecondary} text-sm`}
                            >
                              <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Application Process */}
                      <div>
                        <h4
                          className={`text-lg font-semibold ${themeClasses.text} mb-4 flex items-center`}
                        >
                          <TrendingUp className="w-5 h-5 text-yellow-400 mr-2" />
                          How to Apply
                        </h4>
                        <div className="space-y-3">
                          {[
                            "Complete online application",
                            "Submit required documents",
                            "Wait for instant review",
                            "Receive approval decision",
                            "Get funds disbursed",
                          ].map((step, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center ${themeClasses.textSecondary} text-sm`}
                            >
                              <div
                                className={`w-6 h-6 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0`}
                              >
                                {idx + 1}
                              </div>
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="mt-8 text-center">
                      <button
                        className={`bg-gradient-to-r ${service.color} text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg`}
                      >
                        Apply for {service.title}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            isDarkMode
              ? "from-red-500/20 via-yellow-500/20 to-red-500/20"
              : "from-red-500/10 via-yellow-500/10 to-red-500/10"
          }`}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className={`text-5xl font-bold ${themeClasses.text} mb-8`}>
            Ready to
            <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
              {" "}
              Get Started?
            </span>
          </h2>
          <p
            className={`text-xl ${themeClasses.textSecondary} mb-12 leading-relaxed`}
          >
            Choose the loan that fits your needs and start your application
            today. Our team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              className={`relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-110 shadow-2xl ${themeClasses.glowEffect}`}
            >
              Start Application
            </button>
            <button
              className={`border-2 ${
                isDarkMode
                  ? "border-white/30 hover:border-white/50 text-white hover:bg-white/10"
                  : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
              } px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm`}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} themeClasses={themeClasses} />
    </div>
  );
};

export default ServicesPage;
