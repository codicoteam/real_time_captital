import React from "react";
import {
  DollarSign,
  Shield,
  Users,
  ArrowRight,
  Star,
  Sparkles,
  Zap,
  Target,
  Globe,
  CheckCircle,
  Link,
} from "lucide-react";
import Footer from "../../components/Footer";

import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";

const LandingPage = () => {
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 8000); // Change slide every  seconds
    return () => clearInterval(interval);
  }, []);

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

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  const handleClick = () => {
    navigate("/adminlogin");
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
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        // scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      {/* Hero Section */}
      <section id="hero" className="relative h-screen mt- overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* Slide 1 Background */}
          <div
            className={`w-full h-full transition-opacity duration-1000 ${
              currentSlide === 0 ? "opacity-100" : "opacity-0"
            } absolute inset-0`}
          >
            <div
              className={`w-full h-full bg-gradient-to-r ${
                isDarkMode
                  ? "from-gray-900/80 via-gray-800/60 to-gray-900/80"
                  : "from-gray-100/80 via-white/60 to-gray-100/80"
              }`}
            >
              <img
                src="https://www.shutterstock.com/image-photo/medical-coding-bill-billing-codes-600nw-2494681123.jpg"
                alt="Loan Management Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? "bg-gradient-to-r from-black/70 via-black/50 to-black/70"
                  : "bg-gradient-to-r from-white/70 via-white/50 to-white/70"
              }`}
            ></div>
          </div>

          {/* Slide 2 Background */}
          <div
            className={`w-full h-full transition-opacity duration-1000 ${
              currentSlide === 1 ? "opacity-100" : "opacity-0"
            } absolute inset-0`}
          >
            <div
              className={`w-full h-full bg-gradient-to-r ${
                isDarkMode
                  ? "from-gray-900/80 via-gray-800/60 to-gray-900/80"
                  : "from-gray-100/80 via-white/60 to-gray-100/80"
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=1080&fit=crop"
                alt="Fast Approval Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? "bg-gradient-to-r from-black/70 via-black/50 to-black/70"
                  : "bg-gradient-to-r from-white/70 via-white/50 to-white/70"
              }`}
            ></div>
          </div>

          {/* Slide 3 Background */}
          <div
            className={`w-full h-full transition-opacity duration-1000 ${
              currentSlide === 2 ? "opacity-100" : "opacity-0"
            } absolute inset-0`}
          >
            <div
              className={`w-full h-full bg-gradient-to-r ${
                isDarkMode
                  ? "from-gray-900/80 via-gray-800/60 to-gray-900/80"
                  : "from-gray-100/80 via-white/60 to-gray-100/80"
              }`}
            >
              <img
                src="https://media.istockphoto.com/id/1497005728/photo/smiling-businessman-talking-on-a-mobile-phone-while-working-on-his-laptop.jpg?s=612x612&w=0&k=20&c=ibhoJ_PmND3ny24BgixaSiMqn2qJ4LNcgqaDmeBnuQY="
                alt="Happy Customers Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? "bg-gradient-to-r from-black/70 via-black/50 to-black/70"
                  : "bg-gradient-to-r from-white/70 via-white/50 to-white/70"
              }`}
            ></div>
          </div>
        </div>

        {/* Slides Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Slide 1 */}
            <div
              className={`text-center transition-all duration-1000 ${
                currentSlide === 0
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-full absolute inset-0 flex items-center justify-center"
              }`}
            >
              <div className="max-w-4xl">
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
                    Clear Finance
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
                  className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-3xl mx-auto`}
                >
                  Experience next-generation loan management with AI-powered
                  approvals, real-time tracking, and unmatched security. Your
                  financial future starts here.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => navigate("/userlogin")}
                    className={`relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-110 shadow-2xl ${themeClasses.glowEffect} overflow-hidden group`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
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
            </div>

            {/* Slide 2 */}
            <div
              className={`text-center transition-all duration-1000 ${
                currentSlide === 1
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-full absolute inset-0 flex items-center justify-center"
              }`}
            >
              <div className="max-w-4xl">
                <div
                  className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${
                    isDarkMode
                      ? "from-red-500/20 to-yellow-500/20 border-red-500/30"
                      : "from-red-500/10 to-yellow-500/10 border-red-500/20"
                  } rounded-full border backdrop-blur-sm mb-8`}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-semibold text-yellow-400 tracking-wide uppercase">
                    Secure & Fast
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">
                  <span className={themeClasses.text}>Get approved in</span>
                  <br />
                  <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                    minutes not days
                  </span>
                </h1>

                <p
                  className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-3xl mx-auto`}
                >
                  Our advanced AI technology processes your application
                  instantly. No more waiting weeks for loan approval. Get the
                  funds you need when you need them most.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => navigate("/usersignup")}
                    className={`relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-110 shadow-2xl ${themeClasses.glowEffect} overflow-hidden group`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Apply Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>

                  <button
                    onClick={() => scrollToSection("features")}
                    className={`border-2 ${
                      isDarkMode
                        ? "border-white/20 hover:border-white/40 text-white hover:bg-white/10"
                        : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
                    } px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm`}
                  >
                    View Services
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div
              className={`text-center transition-all duration-1000 ${
                currentSlide === 2
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-full absolute inset-0 flex items-center justify-center"
              }`}
            >
              <div className="max-w-4xl">
                <div
                  className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${
                    isDarkMode
                      ? "from-red-500/20 to-yellow-500/20 border-red-500/30"
                      : "from-red-500/10 to-yellow-500/10 border-red-500/20"
                  } rounded-full border backdrop-blur-sm mb-8`}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-semibold text-yellow-400 tracking-wide uppercase">
                    Trusted by Thousands
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">
                  <span className={themeClasses.text}>Join</span>
                  <br />
                  <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                    200+ happy customers
                  </span>
                </h1>

                <p
                  className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-3xl mx-auto`}
                >
                  Thousands of satisfied customers have already transformed
                  their financial lives with Clear Finance. From business
                  expansion to personal goals, we make it possible.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className={`relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-110 shadow-2xl ${themeClasses.glowEffect} overflow-hidden group`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Read Reviews
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>

                  <button
                    onClick={() => navigate("/userlogin")}
                    className={`border-2 ${
                      isDarkMode
                        ? "border-white/20 hover:border-white/40 text-white hover:bg-white/10"
                        : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
                    } px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {[0, 1, 2].map((slide) => (
            <button
              key={slide}
              onClick={() => setCurrentSlide(slide)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === slide
                  ? "bg-gradient-to-r from-red-400 to-yellow-400 w-8"
                  : isDarkMode
                  ? "bg-white/30 hover:bg-white/50"
                  : "bg-gray-400/50 hover:bg-gray-600/70"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
          className={`absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full ${
            isDarkMode
              ? "bg-black/30 hover:bg-black/50 text-white"
              : "bg-white/30 hover:bg-white/50 text-gray-900"
          } backdrop-blur-sm border ${themeClasses.border} hover:${
            themeClasses.borderHover
          } transition-all duration-300 flex items-center justify-center z-20 group`}
        >
          <ArrowRight className="w-5 h-5 rotate-180 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
          className={`absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full ${
            isDarkMode
              ? "bg-black/30 hover:bg-black/50 text-white"
              : "bg-white/30 hover:bg-white/50 text-gray-900"
          } backdrop-blur-sm border ${themeClasses.border} hover:${
            themeClasses.borderHover
          } transition-all duration-300 flex items-center justify-center z-20 group`}
        >
          <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </section>
      {/* About Section - Updated */}
      <section id="about" className="py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              About
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Clear Finance
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-2xl mx-auto`}
            >
              We're revolutionizing financial services with cutting-edge
              technology, making loans accessible, transparent, and
              lightning-fast.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div
              className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-6 border ${themeClasses.border} text-center`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>
                Our Mission
              </h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>
                Democratizing financial services through innovative technology
                for everyone.
              </p>
            </div>

            <div
              className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-6 border ${themeClasses.border} text-center`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>
                Our Vision
              </h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>
                Becoming the global leader in AI-powered financial solutions
                worldwide.
              </p>
            </div>

            <div
              className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-6 border ${themeClasses.border} text-center`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>
                Our Promise
              </h3>
              <p className={`${themeClasses.textSecondary} text-sm`}>
                Instant decisions, transparent process, and bank-level security
                always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="features" className="py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Our
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Services
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
            >
              Unlock your potential with our flexible financing solutions. Get
              the funding you need to grow your business, invest in your future,
              or achieve your financial goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
                title: "Business Loans",
                description:
                  "What is a Business Loan? Available to registered businesses, these loans help expand operations, purchase equipment, or manage cash flow.",
                color: "from-blue-500 to-indigo-500",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
                title: "Civil Servants/SSB Loans",
                description:
                  "What is a Civil Servant/SSB Loan? These are specialized loans for government employees with competitive rates and flexible terms.",
                color: "from-green-500 to-emerald-500",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1494790108755-2616c58ebc9d?w=400&h=300&fit=crop",
                title: "Salary Based Loans",
                description:
                  "Quick loans based on your monthly salary with instant approval and competitive interest rates for salaried employees.",
                color: "from-purple-500 to-pink-500",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
                title: "Asset Finance",
                description:
                  "What is Asset Finance? Loans financing against your valuable assets including vehicles, property, and equipment as collateral.",
                color: "from-orange-500 to-red-500",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=400&h=300&fit=crop",
                title: "Collateral Loans",
                description:
                  "Secure loans backed by your valuable assets. Lower interest rates with flexible repayment terms using property or vehicles as security.",
                color: "from-teal-500 to-cyan-500",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
                title: "Pensioner Loans",
                description:
                  "What is a Pensioner Loan? These are loans specifically designed for retirees with pension-backed security and favorable terms.",
                color: "from-indigo-500 to-purple-500",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group hover:transform hover:scale-105 transition-all duration-500 cursor-pointer"
              >
                <div
                  className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl overflow-hidden border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-3 h-3 bg-gradient-to-br ${service.color} rounded-full mr-3`}
                      ></div>
                      <h3 className={`text-xl font-bold ${themeClasses.text}`}>
                        {service.title}
                      </h3>
                    </div>
                    <p
                      className={`${themeClasses.textMuted} leading-relaxed text-sm`}
                    >
                      {service.description}
                    </p>
                  </div>
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
                number: "200+",
                label: "Happy Customers",
                icon: <Users className="w-6 h-6" />,
              },
              {
                number: "$500+",
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

      {/* Testimonials Section - New */}
      <section id="testimonials" className="py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              What Our
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Customers Say
              </span>
            </h2>
            <p className={`text-xl ${themeClasses.textMuted}`}>
              Real stories from real people who transformed their lives with
              Clear Finance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                image:
                  "https://images.unsplash.com/photo-1494790108755-2616c58ebc9d?w=150&h=150&fit=crop&crop=face",
                quote:
                  "Clear Finance Finance helped me expand my bakery business. The approval was instant and the process was incredibly smooth.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Civil Servant",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                quote:
                  "As a government employee, I found their civil servant loan perfect for my needs. Competitive rates and flexible terms.",
                rating: 5,
              },
              {
                name: "Grace Mutindi",
                role: "Marketing Manager",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                quote:
                  "The salary-based loan was exactly what I needed. Fast approval and the customer service team was exceptional.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 hover:transform hover:scale-105`}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className={`text-lg font-bold ${themeClasses.text}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`${themeClasses.textMuted} text-sm`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p
                  className={`${themeClasses.textSecondary} leading-relaxed italic`}
                >
                  "{testimonial.quote}"
                </p>
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
            experienced the Clear Finance difference.
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

      <Footer isDarkMode={isDarkMode} themeClasses={themeClasses} />
    </div>
  );
};

export default LandingPage;
function setIsMenuOpen(_arg0: boolean) {
  throw new Error("Function not implemented.");
}
