import "../css/LoginPop.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection



const LoginPop = ({ setIsLoginOpen }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const navigate = useNavigate(); // Hook for navigation

  // Login Form Validation and Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current;
    const password = passwordRef.current;
    let valid = true;

    if (!email.value) {
      setErrors((prev) => ({ ...prev, email: true }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, email: false }));
      email.placeholder = "Email";
    }

    if (!password.value) {
      setErrors((prev) => ({ ...prev, password: true }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, password: false }));
      password.placeholder = "Password";
    }

    if (valid) {
      setLoading(true); // Start loading
      try {
        const res = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        const data = await res.json();
        console.log("Login response:", data);

        if (res.ok) {
          console.log("Login successful!");

          // Redirect based on account type
          if (data.accountType === "admin") {
            navigate("/admin"); // Navigate to Admin page
          } else if (data.accountType === "worker") {
            navigate("/worker"); // Navigate to Worker page
          } else {
            navigate("/user"); // Navigate to User page
          }

          setIsLoginOpen(false); // Close the login modal
        } else {
          alert(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong during login.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Navigate to Forgot Password page
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        {/* Left side: Image */}
        <div className="login-image">
          <img src="/images/LoginImage.png" alt="Parking" />
        </div>

        {/* Right side: Login Form */}
        <div className="login-form">
          {/* Close button */}
          <button className="close-btn" onClick={() => setIsLoginOpen(false)}>
            ✖
          </button>

          {/* Logo and Title */}
          <div className="logo-container">
            <img
              src="/images/LaspotLogo.png"
              alt="logo"
              className="login-logo"
            />
            <h1 className="logo-title">La Spot</h1>
          </div>

          <h2 className="login-title">Login</h2>
          <p className="login-description">Enter your email and password to login</p>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className={`inputField-login ${errors.email ? "error" : ""}`}
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Password"
              className={`inputField-login ${errors.password ? "error" : ""}`}
              ref={passwordRef}
            />
            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPop;
