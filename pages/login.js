"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";  // ✅ Import Link
import "./login.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth", { email, password, type: "login" });
      console.log("Login Response:", response.data);

      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      } else {
        setError("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error);
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container colorful-bg">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="login-button colorful-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="signup-link">
          Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
