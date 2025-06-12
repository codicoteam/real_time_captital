import axios from "axios";

const BASE_URL = "http://localhost:5050/api/v1/user_route";

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
