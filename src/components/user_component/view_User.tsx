import React from "react";
import {
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,

} from "lucide-react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserDetailsModalProps {
  selectedUser: User | null;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  selectedUser,
  onClose,
}) => {
  if (!selectedUser) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-orange-200/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-orange-800">
              User Details - {selectedUser.firstName} {selectedUser.lastName}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-700 transition-all duration-200"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center space-x-4 p-4 bg-orange-50/50 rounded-xl">
            <div className="relative">
              {selectedUser.profilePicture ? (
                <img
                  src={selectedUser.profilePicture}
                  alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                  {getInitials(selectedUser.firstName, selectedUser.lastName)}
                </div>
              )}
            </div>
            <div>
              <h4 className="text-xl font-bold text-orange-800">
                {selectedUser.firstName} {selectedUser.lastName}
              </h4>
              <p className="text-orange-600 font-medium">
                {selectedUser.email}
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>First Name</span>
              </label>
              <div className="text-lg font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                {selectedUser.firstName}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Last Name</span>
              </label>
              <div className="text-lg font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                {selectedUser.lastName}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-orange-200/50 pt-6">
            <h4 className="text-lg font-semibold text-orange-800 mb-4">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg break-all">
                  {selectedUser.email}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                  {selectedUser.phoneNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="border-t border-orange-200/50 pt-6">
            <h4 className="text-lg font-semibold text-orange-800 mb-4">
              Address Information
            </h4>
            <div className="space-y-2">
              <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Address</span>
              </label>
              <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                {selectedUser.address}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="border-t border-orange-200/50 pt-6">
            <h4 className="text-lg font-semibold text-orange-800 mb-4">
              Account Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Account Created</span>
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                  {formatDate(selectedUser.createdAt)}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-600 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Last Updated</span>
                </label>
                <div className="text-base font-semibold text-orange-800 bg-orange-50/30 p-3 rounded-lg">
                  {formatDate(selectedUser.updatedAt)}
                </div>
              </div>
            </div>
          </div>

          {/* User ID */}
          <div className="border-t border-orange-200/50 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-orange-600">
                User ID
              </label>
              <div className="text-sm font-mono text-orange-700 bg-orange-50/50 p-3 rounded-lg border border-orange-200/30">
                {selectedUser._id}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-orange-50/50 border-t border-orange-200/50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-xl text-sm font-medium text-orange-700 transition-all duration-200"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl text-sm font-medium text-white transition-all duration-200">
            Edit User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
