import React from "react";
import {
  Target,
  Globe,
  Clock,
  Shield,
  TrendingUp,
  CheckCircle,
  Users,
  Heart,
  Lightbulb,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

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

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description:
        "Every decision we make starts with our customers' needs and success in mind.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Security",
      description:
        "Building lasting relationships through transparency, reliability, and bank-level security.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Continuously evolving through cutting-edge technology and creative solutions.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Inclusion",
      description:
        "Making financial services accessible to everyone, regardless of background or status.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Mutasa",
      role: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c58e9c9d?w=300&h=300&fit=crop",
      bio: "15+ years in financial services, former VP at Standard Chartered Bank Zimbabwe.",
    },
    {
      name: "David Chirwa",
      role: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      bio: "AI/ML expert with experience at Amazon and Google, pioneering fintech solutions in Africa.",
    },
    {
      name: "Grace Ndoro",
      role: "Chief Risk Officer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      bio: "Risk management specialist with 12+ years at Reserve Bank of Zimbabwe and CABS.",
    },
    {
      name: "Michael Chikwanha",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      bio: "Operations expert focused on streamlining processes and enhancing customer experience.",
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
              About
              <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                {" "}
                Clear Finance
              </span>
            </h1>
            <p
              className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-4xl mx-auto`}
            >
              We're revolutionizing the financial landscape in Zimbabwe with
              cutting-edge technology, making loans accessible, transparent, and
              lightning-fast for everyone who dreams of building a better
              future.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div
              className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500`}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center mr-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-3xl font-bold ${themeClasses.text}`}>
                  Our Mission
                </h2>
              </div>
              <p
                className={`${themeClasses.textSecondary} leading-relaxed mb-6 text-lg`}
              >
                To democratize access to financial services through innovative
                technology, ensuring everyone has the opportunity to achieve
                their financial goals with transparency, speed, and security at
                the core of everything we do.
              </p>
              <p className={`${themeClasses.textMuted} leading-relaxed`}>
                We believe that financial services should be a bridge to
                opportunity, not a barrier. That's why we've built a platform
                that removes traditional obstacles like lengthy paperwork,
                unclear terms, and discriminatory practices, replacing them with
                AI-powered efficiency, crystal-clear communication, and
                inclusive accessibility.
              </p>
            </div>

            {/* Vision */}
            <div
              className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500`}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center mr-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-3xl font-bold ${themeClasses.text}`}>
                  Our Vision
                </h2>
              </div>
              <p
                className={`${themeClasses.textSecondary} leading-relaxed mb-6 text-lg`}
              >
                To become the global leader in AI-powered financial solutions,
                creating a world where financial services are instant,
                intelligent, and inclusive for all individuals and businesses
                worldwide.
              </p>
              <p className={`${themeClasses.textMuted} leading-relaxed`}>
                We envision a future where getting a loan is as simple as
                sending a message, where artificial intelligence works alongside
                human expertise to make fair and fast decisions, and where every
                person - regardless of their background, location, or current
                financial status - has access to the capital they need to build
                their dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Pocket Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Why Choose
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Clear Finance?
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
            >
              We've reimagined every aspect of the lending experience to put you
              first
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Instant Decisions",
                description: "AI-powered approvals in under 60 seconds",
                detail:
                  "Our advanced machine learning algorithms analyze thousands of data points in real-time, providing you with instant feedback on your application status.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Bank-Level Security",
                description: "256-bit encryption and multi-layer security",
                detail:
                  "Your data is protected by the same security standards used by major banks, including end-to-end encryption, secure servers, and regular security audits.",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Competitive Rates",
                description: "Dynamic pricing based on real-time market data",
                detail:
                  "We continuously monitor market conditions to offer you the most competitive rates available, adjusted based on your individual profile and creditworthiness.",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Transparent Process",
                description:
                  "No hidden fees, clear terms, honest communication",
                detail:
                  "Every fee, every rate, and every term is clearly explained upfront. No surprises, no fine print, no hidden costs - just honest, straightforward lending.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-6 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 hover:transform hover:scale-105 group`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>
                    {item.title}
                  </h3>
                  <p className={`${themeClasses.textSecondary} text-sm mb-4`}>
                    {item.description}
                  </p>
                  <p
                    className={`${themeClasses.textMuted} text-xs leading-relaxed`}
                  >
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-16 relative">
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
                Values
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
            >
              The principles that guide every decision we make and every service
              we provide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 hover:transform hover:scale-105 group text-center`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl transition-all duration-500`}
                >
                  {value.icon}
                </div>
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
                  {value.title}
                </h3>
                <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Meet Our
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Team
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
            >
              The brilliant minds behind Clear Finance's innovative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl overflow-hidden border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 hover:transform hover:scale-105 group`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold ${themeClasses.text} mb-2`}>
                    {member.name}
                  </h3>
                  <p className="text-yellow-400 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p
                    className={`${themeClasses.textMuted} text-sm leading-relaxed`}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Get In
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Touch
              </span>
            </h2>
            <p
              className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
            >
              Ready to start your financial journey with us? We're here to help
              every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Visit Us",
                detail: "123 Financial District, Harare, Zimbabwe",
                color: "from-red-500 to-pink-500",
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Call Us",
                detail: "+263 4 123 4567",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email Us",
                detail: "hello@pClear Finance.co.zw",
                color: "from-blue-500 to-indigo-500",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 text-center group hover:transform hover:scale-105`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl transition-all duration-500`}
                >
                  {contact.icon}
                </div>
                <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>
                  {contact.title}
                </h3>
                <p className={`${themeClasses.textSecondary} text-lg`}>
                  {contact.detail}
                </p>
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
            Join hundreds of satisfied customers who've already experienced the
            Clear Finance difference. Your financial future is just one click
            away.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              className={`relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg group`}
            >
              Apply for a Loan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              className={`${themeClasses.cardBg} backdrop-blur-xl border ${themeClasses.border} hover:${themeClasses.borderHover} ${themeClasses.text} font-bold py-4 px-8 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg`}
            >
              Learn More
              <Lightbulb className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} themeClasses={themeClasses} />
    </div>
  );
};

export default AboutPage;
