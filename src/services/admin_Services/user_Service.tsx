import axios from "axios";

const BASE_URL = "https://loan-backend-codico.onrender.com/api/v1/user_route"; // Change this to your actual user endpoint

/**
 * Service for handling admin-side user-related API requests
 */
const UserService = {
  /**
   * Get all registered users
   */
  getAllUsers: async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/all`, {
        headers: {
          Authorization: `Bearer ${getAdminAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve users";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${id}`, {
        headers: {
          Authorization: `Bearer ${getAdminAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve user";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Get loans for a specific user
   */
  getUserLoans: async (userId: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/${userId}/loans`, {
        headers: {
          Authorization: `Bearer ${getAdminAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve user's loans";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Optionally, delete a user
   */
  deleteUser: async (id: string): Promise<any> => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${getAdminAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to delete user";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },
};

/**
 * Helper function to get the admin auth token
 */
const getAdminAuthToken = (): string | null => {
  return localStorage.getItem("adminToken");
};

export default UserService;
