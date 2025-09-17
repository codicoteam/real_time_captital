import axios from "axios";

const BASE_URL = "https://loan-backend-codico.onrender.com/api/v1/user_route";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user?: {
    _id?: string;
    name?: string;
    email?: string;
    [key: string]: any;
  };
}

const loginUser = async (userData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, userData);

    const { token, user } = response.data;

    if (token) {
      localStorage.setItem("userToken", token);

      if (user) {
        if (user.name) localStorage.setItem("userName", user.name);
        if (user.email) localStorage.setItem("userEmail", user.email);
        if (user._id) localStorage.setItem("userId", user._id);
      }

      console.log("User token stored successfully!");
    } else {
      alert("Login failed: No token received!");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error logging in user:", error.response?.data || error.message);
    throw error;
  }
};

export default loginUser;
