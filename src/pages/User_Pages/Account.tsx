import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Camera,
  Edit3,
  Save,
  Eye,
  EyeOff,
  Menu,
  ChevronDown,
  Search,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Sidebar from "../../components/User_Sidebar";

// Type definitions
interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  occupation: string;
  annualIncome: string;
  panNumber: string;
  aadharNumber: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationData {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  paymentReminders: boolean;
  promotionalEmails: boolean;
  securityAlerts: boolean;
  loanUpdates: boolean;
  monthlyStatements: boolean;
}

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  error?: string;
  showToggle?: { show: boolean };
  onToggle?: () => void;
}

interface ToggleSwitchProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
}

const Account = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Mumbai, Maharashtra",
    dateOfBirth: "1990-05-15",
    occupation: "Software Engineer",
    annualIncome: "1200000",
    panNumber: "ABCDE1234F",
    aadharNumber: "1234 5678 9012",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    paymentReminders: true,
    promotionalEmails: false,
    securityAlerts: true,
    loanUpdates: true,
    monthlyStatements: true,
  });

  const [passwordErrors, setPasswordErrors] = useState<Partial<PasswordData>>(
    {}
  );
  const [profileErrors, setProfileErrors] = useState<Partial<ProfileData>>({});

  const handleChange = <T extends Record<string, any>>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    field: keyof T,
    value: any
  ) => setter((prev) => ({ ...prev, [field]: value }));

  const validateProfile = () => {
    const errors: Partial<ProfileData> = {};
    if (!profileData.firstName.trim())
      errors.firstName = "First name is required";
    if (!profileData.lastName.trim()) errors.lastName = "Last name is required";
    if (!profileData.email.trim()) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(profileData.email))
      errors.email = "Invalid email format";
    if (!profileData.phone.trim()) errors.phone = "Phone number is required";
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    const errors: Partial<PasswordData> = {};
    if (!passwordData.currentPassword)
      errors.currentPassword = "Current password is required";
    if (!passwordData.newPassword)
      errors.newPassword = "New password is required";
    if (passwordData.newPassword.length < 8)
      errors.newPassword = "Password must be at least 8 characters";
    if (passwordData.newPassword !== passwordData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSave = () => {
    if (validateProfile()) {
      setIsEditing(false);
      console.log("Profile saved:", profileData);
    }
  };

  const handlePasswordSave = () => {
    if (validatePassword()) {
      console.log("Password changed");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const tabs = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "security", label: "Security Settings", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  // Reusable Input Component
  const InputField: React.FC<InputFieldProps> = ({
    label,
    type = "text",
    value,
    onChange,
    disabled,
    error,
    showToggle,
    onToggle,
  }) => (
    <div>
      <label className="block text-sm font-medium text-blue-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showToggle ? (showToggle.show ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-4 py-3 ${
            showToggle ? "pr-12" : ""
          } rounded-xl border ${
            error ? "border-red-300" : "border-blue-200/50"
          } bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200 ${
            disabled ? "bg-gray-50 cursor-not-allowed" : ""
          }`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
          >
            {showToggle.show ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  // Reusable Toggle Component
  const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    label,
    description,
    checked,
    onChange,
    color = "blue",
  }) => (
    <div className="flex items-center justify-between">
      <div>
        <div className={`font-medium text-${color}-700`}>{label}</div>
        <div className={`text-sm text-${color}-600`}>{description}</div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div
          className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${color}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${color}-600`}
        ></div>
      </label>
    </div>
  );

  const profileFields = [
    { key: "firstName", label: "First Name", type: "text" },
    { key: "lastName", label: "Last Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "phone", label: "Phone Number", type: "tel" },
    { key: "dateOfBirth", label: "Date of Birth", type: "date" },
    { key: "occupation", label: "Occupation", type: "text" },
    { key: "annualIncome", label: "Annual Income (₹)", type: "number" },
    { key: "panNumber", label: "PAN Number", type: "text" },
  ];

  const notificationSections = [
    {
      title: "Communication Preferences",
      color: "blue",
      gradient: "from-blue-50 to-purple-50",
      items: [
        {
          key: "emailNotifications",
          label: "Email Notifications",
          desc: "Receive notifications via email",
        },
        {
          key: "smsNotifications",
          label: "SMS Notifications",
          desc: "Receive notifications via SMS",
        },
        {
          key: "pushNotifications",
          label: "Push Notifications",
          desc: "Receive push notifications on your device",
        },
      ],
    },
    {
      title: "Loan & Payment Notifications",
      color: "green",
      gradient: "from-green-50 to-emerald-50",
      items: [
        {
          key: "paymentReminders",
          label: "Payment Reminders",
          desc: "Get reminders before payment due dates",
        },
        {
          key: "loanUpdates",
          label: "Loan Updates",
          desc: "Receive updates about your loan status",
        },
        {
          key: "monthlyStatements",
          label: "Monthly Statements",
          desc: "Receive monthly account statements",
        },
      ],
    },
    {
      title: "Marketing & Security",
      color: "purple",
      gradient: "from-purple-50 to-pink-50",
      items: [
        {
          key: "promotionalEmails",
          label: "Promotional Emails",
          desc: "Receive offers and promotional content",
        },
        {
          key: "securityAlerts",
          label: "Security Alerts",
          desc: "Get notified about account security events",
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-blue-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-blue-100/50 hover:bg-blue-200/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-blue-600" />
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-blue-500">Account</span>
                <span className="text-blue-300">›</span>
                <span className="text-blue-700 font-medium">
                  Profile Settings
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search settings..."
                  className="pl-10 pr-4 py-2 w-64 bg-blue-100/50 border border-blue-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200"
                />
              </div>
              <button className="relative p-2 rounded-xl bg-blue-100/50 hover:bg-blue-200/50 transition-all duration-200 group">
                <Bell className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">3</span>
                </div>
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-blue-200/50">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-blue-700">
                    {profileData.firstName} {profileData.lastName}
                  </div>
                  <div className="text-xs text-blue-500">Account Settings</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <span className="text-white font-semibold text-sm">
                      {profileData.firstName[0]}
                      {profileData.lastName[0]}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Profile Header */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <span className="text-white font-bold text-2xl">
                        {profileData.firstName[0]}
                        {profileData.lastName[0]}
                      </span>
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-blue-200/50 hover:bg-blue-50 transition-all duration-200">
                      <Camera className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-blue-800">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <p className="text-blue-600 mt-1">
                      {profileData.occupation}
                    </p>
                    <p className="text-sm text-blue-500 mt-2">
                      Member since January 2024
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-700">
                      Verified Account
                    </span>
                  </div>
                  <div className="text-sm text-blue-600">
                    Credit Score:{" "}
                    <span className="font-bold text-blue-800">750</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
              <div className="flex border-b border-blue-200/50">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "text-blue-700 border-b-2 border-blue-500 bg-blue-50/50"
                          : "text-blue-500 hover:text-blue-700 hover:bg-blue-50/30"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* Profile Information Tab */}
                {activeTab === "profile" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-blue-800">
                          Profile Information
                        </h2>
                        <p className="text-blue-600 mt-1">
                          Manage your personal information and account details
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          isEditing ? handleProfileSave() : setIsEditing(true)
                        }
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                      >
                        {isEditing ? (
                          <Save className="w-4 h-4" />
                        ) : (
                          <Edit3 className="w-4 h-4" />
                        )}
                        <span>
                          {isEditing ? "Save Changes" : "Edit Profile"}
                        </span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profileFields.map((field) => (
                        <InputField
                          key={field.key}
                          label={field.label}
                          type={field.type}
                          value={profileData[field.key as keyof ProfileData]}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(
                              setProfileData,
                              field.key as keyof ProfileData,
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          error={profileErrors[field.key as keyof ProfileData]}
                          showToggle={undefined}
                          onToggle={undefined}
                        />
                      ))}

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-blue-700 mb-2">
                          Address
                        </label>
                        <textarea
                          value={profileData.address}
                          onChange={(e) =>
                            handleChange(
                              setProfileData,
                              "address",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          rows={3}
                          className={`w-full px-4 py-3 rounded-xl border border-blue-200/50 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200 ${
                            !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleProfileSave}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Security Settings Tab */}
                {activeTab === "security" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-800">
                        Security Settings
                      </h2>
                      <p className="text-blue-600 mt-1">
                        Manage your account security and password
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">
                        Change Password
                      </h3>
                      <div className="space-y-4">
                        <InputField
                          label="Current Password"
                          value={passwordData.currentPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(
                              setPasswordData,
                              "currentPassword",
                              e.target.value
                            )
                          }
                          disabled={false}
                          error={passwordErrors.currentPassword}
                          showToggle={{ show: showPassword }}
                          onToggle={() => setShowPassword(!showPassword)}
                        />
                        <InputField
                          label="New Password"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(
                              setPasswordData,
                              "newPassword",
                              e.target.value
                            )
                          }
                          disabled={false}
                          error={passwordErrors.newPassword}
                          showToggle={undefined}
                          onToggle={undefined}
                        />
                        <InputField
                          label="Confirm New Password"
                          value={passwordData.confirmPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(
                              setPasswordData,
                              "confirmPassword",
                              e.target.value
                            )
                          }
                          disabled={false}
                          error={passwordErrors.confirmPassword}
                          showToggle={{ show: showConfirmPassword }}
                          onToggle={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                        <button
                          onClick={handlePasswordSave}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">
                        Account Security Status
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            icon: CheckCircle,
                            text: "Two-factor authentication enabled",
                            color: "green",
                          },
                          {
                            icon: CheckCircle,
                            text: "Email verification completed",
                            color: "green",
                          },
                          {
                            icon: CheckCircle,
                            text: "Phone number verified",
                            color: "green",
                          },
                          {
                            icon: AlertCircle,
                            text: "Document verification pending",
                            color: "orange",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <item.icon
                              className={`w-5 h-5 text-${item.color}-500`}
                            />
                            <span className={`text-${item.color}-700`}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-800">
                        Notification Preferences
                      </h2>
                      <p className="text-blue-600 mt-1">
                        Choose how you want to receive notifications
                      </p>
                    </div>

                    <div className="space-y-6">
                      {notificationSections.map((section) => (
                        <div
                          key={section.title}
                          className={`bg-gradient-to-br ${section.gradient} rounded-2xl p-6`}
                        >
                          <h3
                            className={`text-lg font-semibold text-${section.color}-800 mb-4`}
                          >
                            {section.title}
                          </h3>
                          <div className="space-y-4">
                            {section.items.map((item) => (
                              <ToggleSwitch
                                key={item.key}
                                label={item.label}
                                description={item.desc}
                                checked={
                                  notifications[
                                    item.key as keyof NotificationData
                                  ]
                                }
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  handleChange(
                                    setNotifications,
                                    item.key as keyof NotificationData,
                                    e.target.checked
                                  )
                                }
                                color={section.color}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Account;
