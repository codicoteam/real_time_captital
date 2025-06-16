// src/api/auth/SignupAdmin.ts
import axios from "axios";

const BASE_URL = "https://loan-backend-qnj0.onrender.com/api/v1/admin_route"; // Adjust this route if it's different

interface AdminRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
  profilePicture: string;
  role?: "superadmin" | "admin" | "moderator"; // optional if default is "admin"
  permissions?: string[]; // optional
}

const SignupAdmin = async (adminData: AdminRegisterData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, adminData);

    console.log("Admin registered successfully:", response.data);

    return response.data;
  } catch (error: any) {
    console.error(
      "Error registering admin:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default SignupAdmin;
