import axios from "axios";

const BASE_URL = "https://loan-backend-qnj0.onrender.com/api/v1/payment_route"; // Replace with your actual backend URL

/**
 * Service for handling payment-related API requests
 */
const PaymentService = {
  /**
   * Fetch all payments
   */
  getAllPayments: async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve payments";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Get a payment by ID
   */
  getPaymentById: async (id: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve payment";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Get payments by user ID
   */
  getPaymentsByUserId: async (userId: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve user payments";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Create a new payment
   */
  createPayment: async (paymentData: any): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, paymentData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to create payment";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Update an existing payment
   */
  updatePayment: async (id: string, paymentData: any): Promise<any> => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${id}`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to update payment";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Delete a payment
   */
  deletePayment: async (id: string): Promise<any> => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to delete payment";
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

export default PaymentService;
