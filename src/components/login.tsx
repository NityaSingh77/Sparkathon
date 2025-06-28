import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BiUser,
  BiLockAlt,
  BiEnvelope,
  BiPhone,
} from "react-icons/bi";
import axios from "axios";

import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

const LoginSignup = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", number: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = isLoginActive ? "/login" : "/register";
    const url = `http://localhost:5000${endpoint}`;

    // ✅ Validation for registration
    if (!isLoginActive) {
      const phoneRegex = /^[0-9]{10}$/; 

      if (!phoneRegex.test(formData.number)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }

      if (!formData.email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
      }

      if (formData.password.length < 6) {
        alert("Password should be at least 6 characters long.");
        return;
      }
    }

    // TODO: Add actual login/register logic here
    // Example:
    try {
      const response = await axios.post(url, formData);
      localStorage.setItem("token", (response.data as { token: string }).token);
      alert(isLoginActive ? "Login successful!" : "Registration successful!");
      navigate("/");
    } catch (error) {
      alert("Authentication failed.");
    }
  };

  // Google login handlers and toggleForm moved outside handleSubmit

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const token = credentialResponse.credential;
      if (!token) {
        alert("Google login failed: No credential received.");
        return;
      }
      // Send token to backend for verification and get app token
      const response = await axios.post("http://localhost:5000/google-login", { token });
      localStorage.setItem("token", (response.data as { token: string }).token);
      alert("Google login successful!");
      navigate("/");
    } catch (error) {
      alert("Google login failed.");
    }
  };

  const handleGoogleFailure = () => {
    alert("Google login failed.");
  };

  const toggleForm = (loginState: boolean) => {
    setIsLoginActive(loginState);
    setFormData({ username: "", email: "", number: "", password: "" });
  };

  return (
    <div className="login-page Background">
    <div className="Background">
      <div className="flex justify-between items-center w-full px-6 pt-5 pl-8 absolute top-0 left-0 z-50">
        <h2 className="text-3xl">
          Auto<span className="text-[#ed832d]">Assist</span>
        </h2>
        <button
          onClick={() => navigate("/admin/Adminlogin")}
          className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          Admin Login
        </button>
      </div>

      <div className={`container ${isLoginActive ? "" : "active"}`}>
        <div className={`form-box ${isLoginActive ? "login" : "register"}`}>
          <form onSubmit={handleSubmit}>
            <h1>{isLoginActive ? "Login" : "Registration"}</h1>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <BiUser className="icon" />
            </div>
            {!isLoginActive && (
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <BiEnvelope className="icon" />
              </div>
            )}
            <div className="input-box">
              <input
                type="text"
                name="number"
                placeholder="Phone Number"
                value={formData.number}
                onChange={handleInputChange}
                required
              />
              {/* Added phone icon */}
              <BiPhone className="icon" />
            </div>

            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <BiLockAlt className="icon" />
            </div>

            <button type="submit" className="btn">
              {isLoginActive ? "Login" : "Register"}
            </button>

            <p>or login with social platforms</p>

            <div className="social-icons" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <GoogleLogin 
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </div>
          </form>
        </div>
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, <span className={`text-[#ed832d]`}>Welcome!</span></h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={() => toggleForm(false)}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome <span className={`text-[#ed832d]`}>Back!</span></h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={() => toggleForm(true)}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginSignup;
