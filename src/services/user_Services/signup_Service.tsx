import axios from "axios";

const BASE_URL = "https://loan-backend-qnj0.onrender.com/api/v1/user_route";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  profilePicture?: string; // optional field
}

const SignupUser = async (userData: RegisterData) => {
  console.log("register data ",userData )
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);

    console.log("User registered successfully:", response.data);

    return response.data;
  } catch (error: any) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default SignupUser;
