import axios from "axios";

const BASE_URL = "https://loan-backend-qnj0.onrender.com/api/v1/loan_route"; // Replace with your actual backend URL

/**
 * Service for handling loan-related API requests
 */
const LoanService = {
  /**
   * Fetch all loans
   */
  getAllLoans: async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve loans";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Get a loan by ID
   */
  getLoanById: async (id: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve loan";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },
  getLoansByUserId: async (userId: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve user loans";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Create a new loan
   */
  createLoan: async (loanData: any): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, loanData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to create loan";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Update an existing loan
   */
  updateLoan: async (id: string, loanData: any): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}`, loanData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to update loan";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Delete a loan
   */
  deleteLoan: async (id: string): Promise<any> => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to delete loan";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },
};

/**
 * Helper function to get the auth token from localStorage
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem("userToken");
};

export default LoanService;
