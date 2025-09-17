import axios from "axios";

const BASE_URL = "https://loan-backend-codico.onrender.com/api/v1/admin_route"; // Base URL only

interface LoginData {
  email: string;
  password: string;
}

const loginAdmin = async (adminData: LoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, adminData);

    // Log the token for debugging
    console.log("User token:", response.data.token);

    if (response.data.token) {
      localStorage.setItem("adminToken", response.data.token);
      console.log("Admin token stored successfully!");
    } else {
      alert("Login failed: No token received!");
    }

    return response.data;
  } catch (error: any) {
    console.error(
      "Error logging in admin:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default loginAdmin;
