import axios from "axios";

const BASE_URL = "https://loan-backend-qnj0.onrender.com/api/v1/user_route"; // Base URL only

interface LoginData {
  email: string;
  password: string;
}

const loginUser = async (userData: LoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);

    // Log the token for debugging
    console.log("User token:", response.data.token);

    if (response.data.token) {
      localStorage.setItem("userToken", response.data.token);
      console.log("User token stored successfully!", );
    } else {
      alert("Login failed: No token received!");
    }
    // mongodb+srv://pockettloan:pockettloan12345@pocket.sbssyen.mongodb.net/

    return response.data;
  } catch (error: any) {
    console.error(
      "Error logging in user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default loginUser;
