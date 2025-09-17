import axios from "axios";

const BASE_URL = "https://loan-backend-codico.onrender.com/api/v1/kyc_route";
/**
 * Service for handling KYC-related API requests
 */
const KycService = {
  /**
   * Fetch all KYC documents
   */
  getAllKycDocs: async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve KYC documents";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Get a KYC document by ID
   */
  getKycById: async (id: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/getby/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve KYC document";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Get KYC documents by user ID
   */
  getKycByUserId: async (userId: string): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${userId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to retrieve user KYC documents";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Create a new KYC document
   */
  createKyc: async (kycData: any): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, kycData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to create KYC document";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Update an existing KYC document
   */
  updateKyc: async (id: string, kycData: any): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}`, kycData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to update KYC document";
      } else {
        throw "An unexpected error occurred";
      }
    }
  },

  /**
   * Delete a KYC document
   */
  deleteKyc: async (id: string): Promise<any> => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Failed to delete KYC document";
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

export default KycService;
