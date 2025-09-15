import React from "react";
import {
  Check,
  X,
  Star,
  Zap,
  Clock,
  ArrowRight,
  Crown,
  Sparkles,
} from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

const PricingPage = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [, setSelectedPlan] = React.useState("professional");
  const [] = React.useState(50000);
  const [] = React.useState(12);

  React.useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  const pricingTiers = [
    {
      id: "starter",
      name: "Starter",
      subtitle: "Perfect for first-time borrowers",
      price: "5.9%",
      period: "APR from",
      maxLoan: "$5,000",
      termRange: "3-12 months",
      processingTime: "24 hours",
      icon: <Zap className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      popular: false,
      features: [
        "Loan amounts up to $5,000",
        "Flexible 3-12 month terms",
        "24-hour processing",
        "Basic credit building",
        "Mobile app access",
        "Email support",
        "Standard security",
        "Basic financial tools",
      ],
      notIncluded: [
        "Priority support",
        "Advanced analytics",
        "Dedicated advisor",
        "Premium features",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      subtitle: "Most popular choice",
      price: "4.9%",
      period: "APR from",
      maxLoan: "$25,000",
      termRange: "6-36 months",
      processingTime: "2 hours",
      icon: <Star className="w-8 h-8" />,
      color: "from-red-500 to-yellow-500",
      popular: true,
      features: [
        "Loan amounts up to $25,000",
        "Extended 6-36 month terms",
        "2-hour express processing",
        "Advanced credit building",
        "Priority mobile app",
        "Phone & chat support",
        "Enhanced security",
        "Advanced financial tools",
        "Rate protection guarantee",
        "Early payoff rewards",
      ],
      notIncluded: ["Dedicated advisor", "White-glove service"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      subtitle: "For serious investors",
      price: "3.9%",
      period: "APR from",
      maxLoan: "$100,000",
      termRange: "12-60 months",
      processingTime: "1 hour",
      icon: <Crown className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      popular: false,
      features: [
        "Loan amounts up to $100,000",
        "Extended 12-60 month terms",
        "1-hour VIP processing",
        "Premium credit building",
        "Exclusive mobile features",
        "24/7 priority support",
        "Bank-level security",
        "Full financial suite",
        "Rate protection guarantee",
        "Early payoff rewards",
        "Dedicated relationship manager",
        "White-glove service",
        "Investment opportunities",
        "Exclusive market insights",
      ],
      notIncluded: [],
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
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Hero Section */}
      <section className="relative pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className={`text-6xl lg:text-7xl font-bold leading-tight mb-8 ${themeClasses.text}`}
            >
              Simple,
              <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                {" "}
                Transparent
              </span>
              <br />
              Pricing
            </h1>
            <p
              className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-4xl mx-auto`}
            >
              No hidden fees, no surprises. Choose the plan that fits your
              financial goals and get access to lightning-fast loans with
              competitive rates.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Choose Your
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Perfect Plan
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
            >
              All plans include our core features with no hidden fees. Upgrade
              anytime as your needs grow.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`${
                  themeClasses.cardBg
                } backdrop-blur-xl rounded-3xl p-8 border ${
                  tier.popular
                    ? "border-yellow-400/50 shadow-2xl shadow-yellow-400/20 transform scale-105"
                    : themeClasses.border
                } hover:${
                  themeClasses.borderHover
                } transition-all duration-500 relative group`}
                onClick={() => setSelectedPlan(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-red-400 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:shadow-xl transition-all duration-500`}
                  >
                    {tier.icon}
                  </div>
                  <h3
                    className={`text-2xl font-bold ${themeClasses.text} mb-2`}
                  >
                    {tier.name}
                  </h3>
                  <p className={`${themeClasses.textMuted} mb-4`}>
                    {tier.subtitle}
                  </p>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${themeClasses.text}`}>
                      {tier.price}
                    </span>
                    <span className={`${themeClasses.textSecondary} ml-2`}>
                      {tier.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className={`${themeClasses.cardBgAlt} rounded-2xl p-4`}>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className={themeClasses.textMuted}>
                          Max Loan:
                        </span>
                        <div className={`font-semibold ${themeClasses.text}`}>
                          {tier.maxLoan}
                        </div>
                      </div>
                      <div>
                        <span className={themeClasses.textMuted}>Terms:</span>
                        <div className={`font-semibold ${themeClasses.text}`}>
                          {tier.termRange}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">
                      {tier.processingTime} processing
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className={`${themeClasses.textSecondary} text-sm`}>
                        {feature}
                      </span>
                    </div>
                  ))}

                  {tier.notIncluded.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 opacity-50"
                    >
                      <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-red-400" />
                      </div>
                      <span className={`${themeClasses.textMuted} text-sm`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 ${
                    tier.popular
                      ? "bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl"
                      : `${themeClasses.cardBgAlt} border ${themeClasses.border} hover:${themeClasses.borderHover} ${themeClasses.text}`
                  }`}
                >
                  {tier.popular ? "Get Started" : "Choose Plan"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Compare
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Features
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
            >
              See what's included in each plan to make the best choice for your
              needs
            </p>
          </div>

          <div
            className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl overflow-hidden border ${themeClasses.border}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${themeClasses.cardBgAlt}`}>
                    <th
                      className={`text-left p-6 ${themeClasses.text} font-semibold`}
                    >
                      Features
                    </th>
                    {pricingTiers.map((tier) => (
                      <th key={tier.id} className="text-center p-6">
                        <div
                          className={`text-lg font-bold ${themeClasses.text}`}
                        >
                          {tier.name}
                        </div>
                        <div className={`text-sm ${themeClasses.textMuted}`}>
                          {tier.price} APR
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Maximum Loan Amount",
                      values: ["$5,000", "$25,000", "$100,000"],
                    },
                    {
                      feature: "Processing Time",
                      values: ["24 hours", "2 hours", "1 hour"],
                    },
                    { feature: "Mobile App", values: [true, true, true] },
                    { feature: "Email Support", values: [true, true, true] },
                    { feature: "Phone Support", values: [false, true, true] },
                    { feature: "24/7 Support", values: [false, false, true] },
                    {
                      feature: "Dedicated Manager",
                      values: [false, false, true],
                    },
                    {
                      feature: "Early Payoff Rewards",
                      values: [false, true, true],
                    },
                    { feature: "Rate Protection", values: [false, true, true] },
                    {
                      feature: "Investment Opportunities",
                      values: [false, false, true],
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className={`border-t ${themeClasses.border}`}>
                      <td className={`p-6 font-medium ${themeClasses.text}`}>
                        {row.feature}
                      </td>
                      {row.values.map((value, valueIdx) => (
                        <td key={valueIdx} className="text-center p-6">
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="w-5 h-5 text-green-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-400 mx-auto" />
                            )
                          ) : (
                            <span
                              className={`${themeClasses.textSecondary} font-medium`}
                            >
                              {value}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Frequently Asked
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Are there any hidden fees?",
                answer:
                  "No, absolutely not. All our fees are clearly stated upfront. What you see is what you pay - no surprises, no hidden charges.",
              },
              {
                question: "How quickly can I get approved?",
                answer:
                  "Our AI-powered system can provide instant decisions in under 60 seconds for most applications. Complex cases may take up to 24 hours for our Starter plan, but Professional and Enterprise customers get priority processing.",
              },
              {
                question: "Can I pay off my loan early?",
                answer:
                  "Yes! Professional and Enterprise customers actually earn rewards for early payoffs. Starter plan customers can pay early without penalties.",
              },
              {
                question: "What if I need to change my plan?",
                answer:
                  "You can upgrade your plan at any time. Downgrades are available at your next renewal period. Contact our support team for assistance.",
              },
              {
                question: "Is my information secure?",
                answer:
                  "We use bank-level 256-bit encryption and multi-layer security protocols. Your data is protected by the same standards used by major financial institutions.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-6 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-300`}
              >
                <h3 className={`text-lg font-bold ${themeClasses.text} mb-3`}>
                  {faq.question}
                </h3>
                <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} themeClasses={themeClasses} />
    </div>
  );
};

export default PricingPage;
