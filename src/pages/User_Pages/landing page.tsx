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
} from "lucide-react";

// Add this import at the top with other imports
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
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

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.1),transparent_50%)]"></div>
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 fixed w-full top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div
                className="flex-shrink-0 flex items-center cursor-pointer"
                onClick={() => scrollToSection("hero")}
              >
                <div className="relative w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                  <div className="w-5 h-5 border-2 border-white rounded-sm transform rotate-45"></div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl blur opacity-30 animate-pulse"></div>
                </div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                  >
                    {item.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 group-hover:w-full transition-all duration-300"></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate("/userlogin")}
                className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>

              <button
                onClick={() => navigate("/usersignup")}
                className="relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 shadow-lg shadow-red-500/25 overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors"
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
          <div className="md:hidden bg-black/40 backdrop-blur-xl border-t border-white/10">
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
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/10 mt-4">
                <button
                  onClick={() => navigate("/userlogin")}
                  className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center"
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
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-full border border-red-500/30 backdrop-blur-sm mb-8">
                <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-semibold text-yellow-400 tracking-wide uppercase">
                  POCKET FINANCE
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="text-white">The smartest way to</span>
                <br />
                <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                  manage loans
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                Experience next-generation loan management with AI-powered
                approvals, real-time tracking, and unmatched security. Your
                financial future starts here.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={() => navigate("/userlogin")}
                  className="relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-110 shadow-2xl shadow-red-500/25 overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    Login
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>

                <button
                  onClick={() => scrollToSection("about")}
                  className="border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/10 px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm"
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 transform hover:scale-105 transition-all duration-700 hover:shadow-red-500/25">
                  <div className="w-full h-72 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-yellow-500/10 animate-pulse"></div>
                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/25">
                        <DollarSign className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-white mb-2">
                        $50,000
                      </div>
                      <div className="text-sm text-gray-400">
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
                        color: "text-white",
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
                        className="flex justify-between items-center p-3 bg-white/5 rounded-xl backdrop-blur-sm"
                      >
                        <span className="text-sm text-gray-400">
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
            <h2 className="text-5xl font-bold text-white mb-6">
              About
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Pocket
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-16">
              We're revolutionizing the financial landscape with cutting-edge
              technology, making loans accessible, transparent, and
              lightning-fast for everyone.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  To democratize access to financial services through innovative
                  technology, ensuring everyone has the opportunity to achieve
                  their financial goals with transparency, speed, and security
                  at the core of everything we do.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  To become the global leader in AI-powered financial solutions,
                  creating a world where financial services are instant,
                  intelligent, and inclusive for all individuals and businesses
                  worldwide.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
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
                      className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
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
            <h2 className="text-5xl font-bold text-white mb-6">
              Powerful
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
                <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:shadow-lg transition-all duration-500 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-center">
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
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Our
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Impact
              </span>
            </h2>
            <p className="text-xl text-gray-400">
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
                <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="flex justify-center mb-4 text-yellow-400">
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent mb-3">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-gray-400">
              Get your loan in three revolutionary steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Smart Application",
                description:
                  "AI-powered form that adapts to your profile for lightning-fast completion",
                icon: <Sparkles className="w-6 h-6" />,
              },
              {
                step: "02",
                title: "Instant Decision",
                description:
                  "Advanced algorithms analyze 1000+ data points in milliseconds",
                icon: <Zap className="w-6 h-6" />,
              },
              {
                step: "03",
                title: "Seamless Transfer",
                description:
                  "Funds arrive in your account via blockchain-secured transfers",
                icon: <TrendingUp className="w-6 h-6" />,
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative group">
                <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-700 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-2xl shadow-lg shadow-red-500/25">
                      {item.step}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-400 rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 -right-6 w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 opacity-20 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/20"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-6xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
              Financial Future?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the revolution of smart finance. Over 500,000 users have
            already transformed their financial lives with Pocket.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/usersignup")}
              className="relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-12 py-5 rounded-2xl text-xl font-bold transition-all transform hover:scale-110 shadow-2xl shadow-red-500/25 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Start Your Journey
                <Sparkles className="ml-2 w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            <button className="border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-12 py-5 rounded-2xl text-xl font-semibold transition-all backdrop-blur-sm">
              Talk to Expert
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-xl border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="relative w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                  <div className="w-5 h-5 border-2 border-white rounded-sm transform rotate-45"></div>
                </div>
                <span className="ml-3 text-2xl font-bold text-white">
                  Pocket
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Revolutionizing loan management through cutting-edge technology,
                AI-powered decisions, and unmatched user experience.
              </p>
            </div>

            {[
              {
                title: "Products",
                links: [
                  "Personal Loans",
                  "Business Loans",
                  "Credit Cards",
                  "Refinancing",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Blog"],
              },
              {
                title: "Support",
                links: [
                  "Help Center",
                  "Contact Us",
                  "Privacy Policy",
                  "Terms of Service",
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-white mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-500">
              &copy; 2025 Pocket. All rights reserved. | Transforming Finance,
              One Loan at a Time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
