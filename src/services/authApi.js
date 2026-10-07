import axios from "axios";

const API_URL = "https://dummyjson.com/auth/login";

export const fetchLogin = async (credentials) => {
  if (!credentials || typeof credentials !== "object") {
    throw new Error("Invalid credentials format");
  }

  try {
    const response = await axios.post(API_URL, {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 60,
    });

    const accessToken = response?.data?.accessToken;
    if (!accessToken) {
      throw new Error("Invalid response format");
    }

    return {
      token: accessToken,
      username: response.data.username || credentials.username,
      firstName: response.data.firstName || "",
      lastName: response.data.lastName || "",
    };
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error("Invalid username or password");
    }

    if (error.response) {
      throw new Error(`Login service error: ${error.response.status}`);
    }

    if (error.request) {
      throw new Error("No response received from the login service");
    }

    throw new Error(error.message || "Unable to sign in");
  }
};
