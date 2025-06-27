import axios from "axios";

const BASE_URL = "https://loan-backend-qnj0.onrender.com/api/v1/admin_route"; // Replace with your actual admin endpoint

/**
 * Service for handling admin-related API requests
 */
const AdminService = {
  /**
   * Get all admins
   */
  getAllAdmins: async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/all`, {
        headers: {
          Authorization: `Bearer ${getAdminAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve admins";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Get admin by ID
   */
  getAdminById: async (id: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${id}`, {
        headers: {
          Authorization: `Bearer ${getAdminAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve admin";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Create a new admin
   */
  createAdmin: async (adminData: any): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, adminData, {
        headers: {
          Authorization: `Bearer ${getAdminAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to create admin";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Update admin details
   */
  updateAdmin: async (id: string, adminData: any): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}`, adminData, {
        headers: {
          Authorization: `Bearer ${getAdminAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to update admin";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Delete an admin
   */
  deleteAdmin: async (id: string): Promise<any> => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${getAdminAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to delete admin";
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

export default AdminService;
