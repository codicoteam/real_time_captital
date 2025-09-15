import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageCircle,
  User,
  Building,
  CheckCircle,
  HeadphonesIcon,
} from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

const Contact = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    loanType: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

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
    input: isDarkMode
      ? "bg-black/20 border-white/10"
      : "bg-white/50 border-gray-200",
    inputFocus: isDarkMode
      ? "border-red-500/50 bg-black/30"
      : "border-red-500/50 bg-white/70",
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        loanType: "",
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      details: ["+263 78 969 3725", "+263 71 506 3418"],
      description: "Speak directly with our loan specialists",
      color: "from-green-500 to-emerald-500",
      available: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      details: ["sales@clearfinace.co.zw"],
      description: "Get detailed responses within 2 hours",
      color: "from-blue-500 to-indigo-500",
      available: "24/7 Response",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Visit Our Office",
      details: ["123 Financial District", "Harare, Zimbabwe"],
      description: "Meet our team in person for personalized service",
      color: "from-red-500 to-pink-500",
      available: "Mon-Fri: 8AM-5PM",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "24/7 Support",
      details: ["Live Chat Available", "WhatsApp Support"],
      description: "Instant help whenever you need it",
      color: "from-purple-500 to-violet-500",
      available: "Always Available",
    },
  ];

  const loanTypes = [
    "Business Loans",
    "Salary Based Loans",
    "Asset Finance",
    "Pensioner Loans",
    "Personal Loans",
    "General Inquiry",
  ];

  if (isSubmitted) {
    return (
      <div
        className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} flex items-center justify-center`}
      >
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>
            Message Sent Successfully!
          </h2>
          <p className={`${themeClasses.textSecondary} mb-8`}>
            Thank you for contacting Clear Finance. We'll get back to you within
            2 hours during business hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

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
              Contact
              <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                {" "}
                Clear Finance
              </span>
            </h1>
            <p
              className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-4xl mx-auto`}
            >
              Ready to transform your financial future? Our expert team is here
              to guide you every step of the way. Get in touch today and
              discover how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${themeClasses.text} mb-6`}>
              Get In
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Touch
              </span>
            </h2>
            <p
              className={`text-lg ${themeClasses.textMuted} max-w-2xl mx-auto`}
            >
              Choose the contact method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 hover:transform hover:scale-105 group text-center`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl transition-all duration-500`}
                >
                  {method.icon}
                </div>
                <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>
                  {method.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {method.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className={`${themeClasses.textSecondary} font-semibold`}
                    >
                      {detail}
                    </p>
                  ))}
                </div>
                <p className={`${themeClasses.textMuted} text-sm mb-3`}>
                  {method.description}
                </p>
                <p className={`text-yellow-400 text-xs font-medium`}>
                  {method.available}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${themeClasses.text} mb-6`}>
              Send Us A
              <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}
                Message
              </span>
            </h2>
            <p
              className={`text-lg ${themeClasses.textMuted} max-w-2xl mx-auto`}
            >
              Fill out the form below and we'll get back to you within 2 hours
              during business hours
            </p>
          </div>

          <div
            className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border}`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <User
                      className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:${themeClasses.inputFocus} focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:${themeClasses.inputFocus} focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:${themeClasses.inputFocus} focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                      placeholder="+263 xx xxx xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                  >
                    Loan Type
                  </label>
                  <div className="relative">
                    <Building
                      className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                    />
                    <select
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:${themeClasses.inputFocus} focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                    >
                      <option value="">Select loan type</option>
                      {loanTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:${themeClasses.inputFocus} focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                  placeholder="What can we help you with?"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                >
                  Message *
                </label>
                <div className="relative">
                  <MessageCircle
                    className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:${themeClasses.inputFocus} focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none`}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg mx-auto group disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSubmitting ? "animate-pulse" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} themeClasses={themeClasses} />
    </div>
  );
};

export default Contact;
