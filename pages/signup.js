"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./login.css";

export default function Signup() {
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
      const response = await axios.post("/api/auth", { email, password, type: "register" });
      console.log("Signup Response:", response.data);

      if (response.data.success) {
        router.push("/login");
      } else {
        setError("Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error);
      setError("Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container colorful-bg">
      <div className="login-box">
        <h2>Sign Up</h2>
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="signup-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
