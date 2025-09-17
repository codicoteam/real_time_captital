import { useState, useEffect } from "react";
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
  Loader,
} from "lucide-react";
import Sidebar from "../../components/User_Sidebar";
import UserService from "../../services/user_Services/users_Service";
import NotificationBell from "../../components/Notificationbelll";

// Type definitions matching the backend model
interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture?: string;
}

interface PasswordData {
  currentPassword: string;
  password: string;
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
  showToggle?: boolean;
  onToggle?: () => void;
  isPassword?: boolean;
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const userName = localStorage.getItem("userName");

  // Profile data matching backend model
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    profilePicture: "",
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState<NotificationData>({
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

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        // Get user ID from localStorage or token
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          const userData = await UserService.getUserById(storedUserId);

          // Updated: Handle the response structure properly
          if (userData && userData.success && userData.data) {
            setProfileData({
              firstName: userData.data.firstName || "",
              lastName: userData.data.lastName || "",
              email: userData.data.email || "",
              phoneNumber: userData.data.phoneNumber || "",
              address: userData.data.address || "",
              profilePicture: userData.data.profilePicture || "",
            });
          } else if (userData && userData.firstName) {
            // Fallback: if data is directly in userData
            setProfileData({
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              email: userData.email || "",
              phoneNumber: userData.phoneNumber || "",
              address: userData.address || "",
              profilePicture: userData.profilePicture || "",
            });
            console.log("User data loaded:", userData);
            console.log("Profile data set:", profileData);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        // Optional: Add user feedback for error
        alert("Failed to load user profile. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

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
    if (!profileData.phoneNumber.trim())
      errors.phoneNumber = "Phone number is required";
    if (!profileData.address.trim()) errors.address = "Address is required";
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    const errors: Partial<PasswordData> = {};
    if (!passwordData.currentPassword)
      errors.currentPassword = "Current password is required";
    if (!passwordData.password) errors.password = "New password is required";
    if (passwordData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (passwordData.password !== passwordData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSave = async () => {
    if (validateProfile() && userId) {
      try {
        setSaving(true);
        const updateData = {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phoneNumber: profileData.phoneNumber,
          address: profileData.address,
          profilePicture: profileData.profilePicture,
        };

        await UserService.updateUser(userId, updateData);
        setIsEditing(false);
        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setSaving(false);
      }
    }
  };

  const handlePasswordSave = async () => {
    if (validatePassword() && userId) {
      try {
        setSaving(true);
        const updateData = {
          password: passwordData.password,
        };

        await UserService.updateUser(userId, updateData);
        setPasswordData({
          currentPassword: "",
          password: "",
          confirmPassword: "",
        });
        console.log("Password updated successfully");
      } catch (error) {
        console.error("Error updating password:", error);
      } finally {
        setSaving(false);
      }
    }
  };

  const tabs = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "security", label: "Security Settings", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  // Updated Input Component with proper password handling and black borders
  const InputField: React.FC<InputFieldProps> = ({
    label,
    type = "text",
    value,
    onChange,
    disabled,
    error,
    showToggle = false,
    onToggle,
    isPassword = false,
  }) => {
    // Determine the actual input type
    const inputType = isPassword ? (showToggle ? "text" : "password") : type;

    return (
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          {label}
        </label>
        <div className="relative">
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-4 py-3 ${
              isPassword ? "pr-12" : ""
            } rounded-xl border ${
              error ? "border-red-500" : "border-black"
            } bg-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 ${
              disabled ? "bg-gray-50 cursor-not-allowed" : ""
            }`}
          />
          {isPassword && onToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700 hover:text-green-800 transition-colors duration-200"
            >
              {showToggle ? (
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
  };

  // Reusable Toggle Component
  const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    label,
    description,
    checked,
    onChange,
  }) => (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium text-black">{label}</div>
        <div className="text-sm text-gray-700">{description}</div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-700 peer-checked:to-green-800"></div>
      </label>
    </div>
  );

  // Profile fields matching backend model
  const profileFields = [
    { key: "firstName", label: "First Name", type: "text" },
    { key: "lastName", label: "Last Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "phoneNumber", label: "Phone Number", type: "tel" },
  ];

  const notificationSections = [
    {
      title: "Communication Preferences",
      color: "green",
      gradient: "from-green-50 to-green-50",
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
      gradient: "from-green-50 to-green-50",
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
      color: "green",
      gradient: "from-green-50 to-green-50",
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

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="w-6 h-6 animate-spin text-green-700" />
          <span className="text-green-700 font-medium">
            Loading profile...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-500/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-gradient-to-r from-green-700 to-green-800 text-white hover:from-green-800 hover:to-green-900 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-700">Account</span>
                <span className="text-gray-500">›</span>
                <span className="text-black font-medium">Profile Settings</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700" />
                <input
                  type="text"
                  placeholder="Search settings..."
                  className="pl-10 pr-4 py-2 w-64 bg-white border border-black rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                />
              </div>
              <NotificationBell userId={""} />
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-black">
                    {userName}
                  </div>
                  <div className="text-xs text-gray-700">Account Settings</div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-800 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <span className="text-white font-semibold text-sm">
                      {profileData.firstName?.[0]?.toUpperCase() || "U"}
                      {profileData.lastName?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-700" />
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
                    <div className="w-24 h-24 bg-gradient-to-br from-green-700 to-green-800 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                      <span className="text-white font-bold text-2xl">
                        {userName}
                      </span>
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-black hover:bg-gray-50 transition-all duration-200">
                      <Camera className="w-4 h-4 text-green-700" />
                    </button>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-black">
                      {userName}
                    </h1>
                    <p className="text-gray-700 mt-1">{profileData.email}</p>
                    <p className="text-sm text-gray-700 mt-2">
                      Member since registration
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
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? "text-black border-b-2 border-green-700 bg-green-50/50"
                          : "text-gray-700 hover:text-black hover:bg-green-50/30"
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${
                          activeTab === tab.id ? "text-green-700" : ""
                        }`}
                      />
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
                        <h2 className="text-2xl font-bold text-black">
                          Profile Information
                        </h2>
                        <p className="text-gray-700 mt-1">
                          Manage your personal information and account details
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          isEditing ? handleProfileSave() : setIsEditing(true)
                        }
                        disabled={saving}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl font-medium hover:from-green-800 hover:to-green-900 transition-all duration-200 disabled:opacity-50"
                      >
                        {saving ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : isEditing ? (
                          <Save className="w-4 h-4" />
                        ) : (
                          <Edit3 className="w-4 h-4" />
                        )}
                        <span>
                          {saving
                            ? "Saving..."
                            : isEditing
                            ? "Save Changes"
                            : "Edit Profile"}
                        </span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profileFields.map((field) => (
                        <InputField
                          key={field.key}
                          label={field.label}
                          type={field.type}
                          value={
                            profileData[field.key as keyof ProfileData] || ""
                          }
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(
                              setProfileData,
                              field.key as keyof ProfileData,
                              e.target.value
                            )
                          }
                          disabled={!isEditing || saving}
                          error={profileErrors[field.key as keyof ProfileData]}
                        />
                      ))}

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-black mb-2">
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
                          disabled={!isEditing || saving}
                          rows={3}
                          className={`w-full px-4 py-3 rounded-xl border border-black bg-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 ${
                            !isEditing || saving
                              ? "bg-gray-50 cursor-not-allowed"
                              : ""
                          }`}
                        />
                        {profileErrors.address && (
                          <p className="text-red-500 text-sm mt-1">
                            {profileErrors.address}
                          </p>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setIsEditing(false)}
                          disabled={saving}
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleProfileSave}
                          disabled={saving}
                          className="px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl font-medium hover:from-green-800 hover:to-green-900 transition-all duration-200 disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Security Settings Tab */}
                {activeTab === "security" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-black">
                        Security Settings
                      </h2>
                      <p className="text-gray-700 mt-1">
                        Manage your account security and password
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-black mb-4">
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
                          disabled={saving}
                          error={passwordErrors.currentPassword}
                          isPassword={true}
                          showToggle={showCurrentPassword}
                          onToggle={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        />
                        <InputField
                          label="New Password"
                          value={passwordData.password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(
                              setPasswordData,
                              "password",
                              e.target.value
                            )
                          }
                          disabled={saving}
                          error={passwordErrors.password}
                          isPassword={true}
                          showToggle={showNewPassword}
                          onToggle={() => setShowNewPassword(!showNewPassword)}
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
                          disabled={saving}
                          error={passwordErrors.confirmPassword}
                          isPassword={true}
                          showToggle={showConfirmPassword}
                          onToggle={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                        <button
                          onClick={handlePasswordSave}
                          disabled={saving}
                          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl font-medium hover:from-green-800 hover:to-green-900 transition-all duration-200 disabled:opacity-50"
                        >
                          {saving && (
                            <Loader className="w-4 h-4 animate-spin" />
                          )}
                          <span>
                            {saving ? "Updating..." : "Update Password"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-black mb-4">
                        Account Security Status
                      </h3>
                      <div className="space-y-3">
                        {[
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
                            text: "Two-factor authentication recommended",
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
                            <span className="text-gray-700">{item.text}</span>
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
                      <h2 className="text-2xl font-bold text-black">
                        Notification Preferences
                      </h2>
                      <p className="text-gray-700 mt-1">
                        Choose how you want to receive notifications
                      </p>
                    </div>

                    <div className="space-y-6">
                      {notificationSections.map((section) => (
                        <div
                          key={section.title}
                          className={`bg-gradient-to-br ${section.gradient} rounded-2xl p-6`}
                        >
                          <h3 className="text-lg font-semibold text-black mb-4">
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

                    {/* Save Notification Settings Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          // Handle notification settings save
                          console.log(
                            "Notification settings saved:",
                            notifications
                          );
                          // You can add API call here to save notification preferences
                        }}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl font-medium hover:from-green-800 hover:to-green-900 transition-all duration-200"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Preferences</span>
                      </button>
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