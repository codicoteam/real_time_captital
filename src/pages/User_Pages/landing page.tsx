import React from "react";
import {
  Menu,
  X,
  DollarSign,
  Shield,
  Users,
  ArrowRight,
  Star,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Target,
  Globe,
  Clock,
  CheckCircle,
  LogIn,
  Link,
  Sun,
  Moon,
} from "lucide-react";

// Add this import at the top with other imports
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

    const handleClick = () => {
    navigate('/adminlogin');
  };
  // Theme-aware classes
  const themeClasses = {
    bg: isDarkMode ? "bg-gray-950" : "bg-gray-50",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-500",
    navBg: isDarkMode ? "bg-black/20" : "bg-white/20",
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
      <nav
        className={`relative z-50 ${themeClasses.navBg} backdrop-blur-xl border-b ${themeClasses.border} fixed w-full top-0 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div
                className="flex-shrink-0 flex items-center cursor-pointer"
                onClick={() => scrollToSection("hero")}
              >
                <div
                  className={`relative w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg ${themeClasses.glowEffect}`}
                >
                  <div className="w-5 h-5 border-2 border-white rounded-sm transform rotate-45"></div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl blur opacity-30 animate-pulse"></div>
                </div>
                <span
                  className={`ml-3 text-2xl font-bold ${
                    isDarkMode
                      ? "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                      : "text-gray-900"
                  }`}
                >
                  Pocket
                </span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  { name: "About", id: "about" },
                  { name: "Features", id: "features" },
                  { name: "How It Works", id: "how-it-works" },
                  { name: "Stats", id: "stats" },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`${themeClasses.textSecondary} hover:${themeClasses.text} px-3 py-2 text-sm font-medium transition-all duration-300 relative group`}
                  >
                    {item.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl ${themeClasses.textSecondary} hover:${themeClasses.text} ${themeClasses.hoverBg} transition-all duration-300`}
                title={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => navigate("/userlogin")}
                className={`${themeClasses.textSecondary} hover:${themeClasses.text} px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>

              <button
                onClick={() => navigate("/usersignup")}
                className={`relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 shadow-lg ${themeClasses.glowEffect} overflow-hidden group`}
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden ${themeClasses.cardBg} backdrop-blur-xl border-t ${themeClasses.border}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { name: "About", id: "about" },
                { name: "Features", id: "features" },
                { name: "How It Works", id: "how-it-works" },
                { name: "Stats", id: "stats" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
                >
                  {item.name}
                </button>
              ))}
              <div
                className={`flex flex-col space-y-2 pt-4 border-t ${themeClasses.border} mt-4`}
              >
                <button
                  onClick={() => navigate("/userlogin")}
                  className={`${themeClasses.textSecondary} hover:${themeClasses.text} px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center`}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </button>
                <button
                  onClick={() => navigate("/usersignup")}
                  className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white px-4 py-2 rounded-xl font-medium"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative py-32 mt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left relative z-10">
              <div
                className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${
                  isDarkMode
                    ? "from-red-500/20 to-yellow-500/20 border-red-500/30"
                    : "from-red-500/10 to-yellow-500/10 border-red-500/20"
                } rounded-full border backdrop-blur-sm mb-8`}
              >
                <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                <span
      onClick={handleClick}
      className="text-sm font-semibold text-yellow-400 tracking-wide uppercase cursor-pointer"
    >
      POCKET FINANCE
    </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">
                <span className={themeClasses.text}>The smartest way to</span>
                <br />
                <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                  manage loans
                </span>
              </h1>

              <p
                className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-lg`}
              >
                Experience next-generation loan management with AI-powered
                approvals, real-time tracking, and unmatched security. Your
                financial future starts here.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={() => navigate("/userlogin")}
                  className={`relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-110 shadow-2xl ${themeClasses.glowEffect} overflow-hidden group`}
                >
                  <span className="relative z-10 flex items-center">
                    Login
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>

                <button
                  onClick={() => scrollToSection("about")}
                  className={`border-2 ${
                    isDarkMode
                      ? "border-white/20 hover:border-white/40 text-white hover:bg-white/10"
                      : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
                  } px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm`}
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div
                  className={`${themeClasses.cardBgAlt} backdrop-blur-xl rounded-3xl shadow-2xl p-8 border ${themeClasses.border} transform hover:scale-105 transition-all duration-700 hover:shadow-red-500/25`}
                >
                  <div
                    className={`w-full h-72 bg-gradient-to-br ${
                      isDarkMode
                        ? "from-red-500/20 to-yellow-500/20"
                        : "from-red-500/10 to-yellow-500/10"
                    } rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        isDarkMode
                          ? "from-red-500/10 to-yellow-500/10"
                          : "from-red-500/5 to-yellow-500/5"
                      } animate-pulse`}
                    ></div>
                    <div className="text-center relative z-10">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${themeClasses.glowEffect}`}
                      >
                        <DollarSign className="w-10 h-10 text-white" />
                      </div>
                      <div
                        className={`text-4xl font-bold ${themeClasses.text} mb-2`}
                      >
                        $50,000
                      </div>
                      <div className={`text-sm ${themeClasses.textMuted}`}>
                        Available Credit
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: "Interest Rate",
                        value: "4.5% APR",
                        color: "text-green-400",
                      },
                      {
                        label: "Term",
                        value: "24 months",
                        color: themeClasses.text,
                      },
                      {
                        label: "Status",
                        value: "Approved",
                        color: "text-green-400",
                        badge: true,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center p-3 ${
                          isDarkMode ? "bg-white/5" : "bg-gray-100/50"
                        } rounded-xl backdrop-blur-sm`}
                      >
                        <span className={`text-sm ${themeClasses.textMuted}`}>
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">
                            {item.value}
                          </span>
                        ) : (
                          <span className={`font-semibold ${item.color}`}>
                            {item.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-red-400 to-yellow-400 rounded-full opacity-30 animate-bounce"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-yellow-400 to-red-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-1/2 -right-16 w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full opacity-40 animate-ping"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              About
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Pocket
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto mb-16`}
            >
              We're revolutionizing the financial landscape with cutting-edge
              technology, making loans accessible, transparent, and
              lightning-fast for everyone.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border}`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${themeClasses.text}`}>
                    Our Mission
                  </h3>
                </div>
                <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                  To democratize access to financial services through innovative
                  technology, ensuring everyone has the opportunity to achieve
                  their financial goals with transparency, speed, and security
                  at the core of everything we do.
                </p>
              </div>

              <div
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border}`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${themeClasses.text}`}>
                    Our Vision
                  </h3>
                </div>
                <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                  To become the global leader in AI-powered financial solutions,
                  creating a world where financial services are instant,
                  intelligent, and inclusive for all individuals and businesses
                  worldwide.
                </p>
              </div>
            </div>

            <div className="relative">
              <div
                className={`${themeClasses.cardBgAlt} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border}`}
              >
                <h3
                  className={`text-3xl font-bold ${themeClasses.text} mb-8 text-center`}
                >
                  Why Choose Pocket?
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Clock className="w-5 h-5" />,
                      title: "Instant Decisions",
                      description: "AI-powered approvals in under 60 seconds",
                    },
                    {
                      icon: <Shield className="w-5 h-5" />,
                      title: "Bank-Level Security",
                      description:
                        "256-bit encryption and multi-layer security",
                    },
                    {
                      icon: <TrendingUp className="w-5 h-5" />,
                      title: "Competitive Rates",
                      description:
                        "Dynamic pricing based on real-time market data",
                    },
                    {
                      icon: <CheckCircle className="w-5 h-5" />,
                      title: "Transparent Process",
                      description:
                        "No hidden fees, clear terms, honest communication",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-4 p-4 ${
                        isDarkMode ? "bg-white/5" : "bg-gray-100/50"
                      } rounded-xl backdrop-blur-sm`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4
                          className={`font-semibold ${themeClasses.text} mb-1`}
                        >
                          {item.title}
                        </h4>
                        <p className={`${themeClasses.textMuted} text-sm`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Powerful
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Features
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
            >
              Experience the future of financial technology with our
              revolutionary platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "AI-powered instant approvals in under 60 seconds",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Best Rates",
                description:
                  "Dynamic rates that adapt to market conditions in real-time",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Award Winning",
                description:
                  "Recognized as the #1 fintech platform by industry leaders",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "24/7 Support",
                description: "Expert support team available around the clock",
                color: "from-pink-500 to-rose-500",
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "No Hidden Fees",
                description:
                  "Transparent pricing with no surprise charges ever",
                color: "from-indigo-500 to-purple-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group hover:transform hover:scale-110 transition-all duration-500 cursor-pointer"
              >
                <div
                  className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10`}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:shadow-lg transition-all duration-500 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold ${themeClasses.text} mb-4 text-center`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`${themeClasses.textMuted} leading-relaxed text-center`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 relative">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            isDarkMode
              ? "from-red-500/10 to-yellow-500/10"
              : "from-red-500/5 to-yellow-500/5"
          }`}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Our
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Impact
              </span>
            </h2>
            <p className={`text-xl ${themeClasses.textMuted}`}>
              Numbers that speak to our commitment and success
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              {
                number: "500K+",
                label: "Happy Customers",
                icon: <Users className="w-6 h-6" />,
              },
              {
                number: "$10B+",
                label: "Loans Processed",
                icon: <DollarSign className="w-6 h-6" />,
              },
              {
                number: "4.9",
                label: "App Store Rating",
                icon: <Star className="w-6 h-6" />,
              },
              {
                number: "99.99%",
                label: "Uptime SLA",
                icon: <Shield className="w-6 h-6" />,
              },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div
                  className={`${
                    isDarkMode ? "bg-black/20" : "bg-white/30"
                  } backdrop-blur-xl rounded-2xl p-8 border ${
                    themeClasses.border
                  } hover:${
                    themeClasses.borderHover
                  } transition-all duration-500 hover:transform hover:scale-105`}
                >
                  <div className="flex justify-center mb-4 text-yellow-400">
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className={`${themeClasses.textMuted} font-medium`}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              How It
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Works
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
            >
              Get approved for your loan in three simple steps
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Apply Online",
                description:
                  "Fill out our simple application form in just 2 minutes. Our smart form adapts to your needs.",
                icon: <Link className="w-8 h-8" />,
                color: "from-red-500 to-orange-500",
              },
              {
                step: "02",
                title: "Instant Review",
                description:
                  "Our AI analyzes your application instantly using advanced algorithms and real-time data.",
                icon: <Zap className="w-8 h-8" />,
                color: "from-yellow-500 to-orange-500",
              },
              {
                step: "03",
                title: "Get Funded",
                description:
                  "Receive your funds directly in your account within 24 hours of approval.",
                icon: <CheckCircle className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500",
              },
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div
                  className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl`}
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl transition-all duration-500`}
                    >
                      {step.icon}
                    </div>
                    <div
                      className={`text-6xl font-bold ${
                        isDarkMode ? "text-white/10" : "text-gray-200"
                      } mb-4`}
                    >
                      {step.step}
                    </div>
                    <h3
                      className={`text-2xl font-bold ${themeClasses.text} mb-4`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`${themeClasses.textSecondary} leading-relaxed`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connection line */}
                {index < 2 && (
                  <div
                    className={`hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-red-400 to-yellow-400 transform -translate-y-1/2`}
                  >
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            isDarkMode
              ? "from-red-500/20 via-yellow-500/20 to-red-500/20"
              : "from-red-500/10 via-yellow-500/10 to-red-500/10"
          }`}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className={`text-6xl font-bold ${themeClasses.text} mb-8`}>
            Ready to
            <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
              {" "}
              Transform
            </span>
            <br />
            Your Financial Future?
          </h2>
          <p
            className={`text-2xl ${themeClasses.textSecondary} mb-12 leading-relaxed`}
          >
            Join hundreds of thousands of satisfied customers who've already
            experienced the Pocket difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/usersignup")}
              className={`relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-12 py-5 rounded-2xl text-lg font-bold transition-all transform hover:scale-110 shadow-2xl ${themeClasses.glowEffect} overflow-hidden group`}
            >
              <span className="relative z-10 flex items-center justify-center">
                Get Started Now
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`border-2 ${
                isDarkMode
                  ? "border-white/30 hover:border-white/50 text-white hover:bg-white/10"
                  : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
              } px-12 py-5 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm`}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${themeClasses.cardBg} backdrop-blur-xl border-t ${themeClasses.border} py-16`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <div
                  className={`relative w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg ${themeClasses.glowEffect}`}
                >
                  <div className="w-6 h-6 border-2 border-white rounded-sm transform rotate-45"></div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl blur opacity-30 animate-pulse"></div>
                </div>
                <span
                  className={`ml-3 text-3xl font-bold ${
                    isDarkMode
                      ? "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                      : "text-gray-900"
                  }`}
                >
                  Pocket
                </span>
              </div>
              <p
                className={`${themeClasses.textSecondary} mb-6 max-w-md leading-relaxed`}
              >
                Revolutionizing financial services through innovative
                technology, making loans accessible, transparent, and
                lightning-fast for everyone.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Star className="w-5 h-5" />, label: "4.9 Rating" },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    label: "Bank-Level Security",
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    label: "24/7 Support",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 ${themeClasses.textMuted} text-sm`}
                  >
                    <div className="text-yellow-400">{item.icon}</div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold ${themeClasses.text} mb-6`}>
                Quick Links
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "About Us", action: () => scrollToSection("about") },
                  {
                    name: "Features",
                    action: () => scrollToSection("features"),
                  },
                  {
                    name: "How It Works",
                    action: () => scrollToSection("how-it-works"),
                  },
                  {
                    name: "Statistics",
                    action: () => scrollToSection("stats"),
                  },
                ].map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className={`${themeClasses.textSecondary} hover:${themeClasses.text} hover:text-yellow-400 transition-colors`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-semibold ${themeClasses.text} mb-6`}>
                Get Started
              </h3>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => navigate("/userlogin")}
                    className={`${themeClasses.textSecondary} hover:${themeClasses.text} hover:text-yellow-400 transition-colors`}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/usersignup")}
                    className={`${themeClasses.textSecondary} hover:${themeClasses.text} hover:text-yellow-400 transition-colors`}
                  >
                    Sign Up
                  </button>
                </li>
                <li>
                  <span
                    className={`${themeClasses.textSecondary} hover:${themeClasses.text} hover:text-yellow-400 transition-colors cursor-pointer`}
                  >
                    Contact Support
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`border-t ${themeClasses.border} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}
          >
            <p className={`${themeClasses.textMuted} text-sm`}>
              © 2025 Pocket Finance. All rights reserved.
            </p>
            <div
              className={`flex space-x-6 ${themeClasses.textMuted} text-sm mt-4 md:mt-0`}
            >
              <span className="hover:text-yellow-400 transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:text-yellow-400 transition-colors cursor-pointer">
                Terms of Service
              </span>
              <span className="hover:text-yellow-400 transition-colors cursor-pointer">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
