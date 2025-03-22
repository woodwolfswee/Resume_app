import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/api/auth", { email, password, type: "login" });
    if (response.data.token) {
      sessionStorage.setItem("token", response.data.token);
      return { success: true };
    }
    return { success: false, message: "No token received" };
  } catch (error) {
    console.error("Login Error:", error.response?.data || error);
    return { success: false, message: "Invalid credentials" };
  }
};

export const signup = async (email, password) => {
  try {
    const response = await axios.post("/api/auth", { email, password, type: "signup" });
    return response.data.success
      ? { success: true }
      : { success: false, message: "Signup failed" };
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error);
    return { success: false, message: "Error creating account" };
  }
};

export const logout = () => {
  sessionStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem("token");
};
