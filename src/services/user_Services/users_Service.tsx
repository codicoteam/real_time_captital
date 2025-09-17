import axios from "axios";

const BASE_URL = "https://loan-backend-codico.onrender.com/api/v1/user_route"; // Replace with your actual user route

/**
 * Service for handling user-related API requests
 */
const UserService = {
  /**
   * Fetch all users
   */
  getAllUsers: async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to retrieve users");
    }
  },

  /**
   * Get a user by ID
   */
  getUserById: async (id: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to retrieve user");
    }
  },

  /**
   * Get users by agent ID
   */
  getUsersByAgentId: async (agentId: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/agent/${agentId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to retrieve users by agent");
    }
  },

  /**
   * Create a new user
   */
  createUser: async (userData: any): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to create user");
    }
  },

  /**
   * Update an existing user
   */
  updateUser: async (id: string, userData: any): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to update user");
    }
  },

  /**
   * Delete a user
   */
  deleteUser: async (id: string): Promise<any> => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to delete user");
    }
  },
};

/**
 * Helper function to handle Axios errors
 */
const handleAxiosError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: defaultMessage };
  } else {
    console.error("Unexpected Error:", error);
    throw { message: "An unexpected error occurred" };
  }
};

/**
 * Helper function to get the auth token from localStorage
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem("userToken");
};

export default UserService;
