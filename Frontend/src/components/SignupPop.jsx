import "../css/SignupPop.css";
import React, { useState, useRef } from "react";

const SignupPop = ({ setIsSignupOpen }) => {
  const [accountType, setAccountType] = useState(""); // to track selected type
  const refs = useRef({});
  const [errors, setErrors] = useState({});

  //Field Configurations

  const fieldConfigs = {
    Student: [
      { type: "text", placeholder: "First Name", name: "firstName" },
      { type: "text", placeholder: "Last Name", name: "lastName" },
      { type: "email", placeholder: "Student Email", name: "email" },
      { type: "text", placeholder: "Student Number", name: "studentNum" },
      { type: "password", placeholder: "Password", name: "password" },
      {
        type: "password",
        placeholder: "Confirm Password",
        name: "confirmPassword",
      },
      {
        type: "select",
        placeholder: "Vehicle",
        name: "vehicle",
        options: ["Car", "Motorcycle"],
      },
    ],
    Worker: [
      { type: "text", placeholder: "First Name", name: "firstName" },
      { type: "text", placeholder: "Last Name", name: "lastName" },
      { type: "email", placeholder: "Work Email", name: "email" },
      { type: "text", placeholder: "Work ID", name: "workId" },
      { type: "password", placeholder: "Password", name: "password" },
      {
        type: "password",
        placeholder: "Confirm Password",
        name: "confirmPassword",
      },
      {
        type: "select",
        placeholder: "Vehicle",
        name: "vehicle",
        options: ["Car", "Motorcycle"],
      },
    ],
    Admin: [
      { type: "text", placeholder: "First Name", name: "firstName" },
      { type: "text", placeholder: "Last Name", name: "lastName" },
      { type: "text", placeholder: "Admin Code", name: "adminCode" },
      { type: "password", placeholder: "Password", name: "password" },
      {
        type: "password",
        placeholder: "Confirm Password",
        name: "confirmPassword",
      },
      {
        type: "select",
        placeholder: "Vehicle",
        name: "vehicle",
        options: ["Car", "Motorcycle"],
      },
    ],
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    const formData = {
  accountType,
  firstName: refs.current["firstName"].value,
  lastName: refs.current["lastName"].value,
  email: refs.current["email"].value,
  password: refs.current["password"].value,
  confirmPassword: refs.current["confirmPassword"].value,
  vehicle: refs.current["vehicle"].value,
};

if (accountType === "Student") {
  formData.studentNum = refs.current["studentNum"].value;
  formData.userId = formData.studentNum;
} else if (accountType === "Worker") {
  formData.workId = refs.current["workId"].value;
  formData.userId = formData.workId;
} else if (accountType === "Admin") {
  formData.adminCode = refs.current["adminCode"].value;
}

fetch("http://localhost:8080/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify(formData),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("Server Response:", data);
    if (data.success) {
      alert("Signup successful!");
      setIsSignupOpen(false);
    } else if (data.error) {
      alert("Signup error: " + data.error);
    }
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

    // Field Validation
    fieldConfigs[accountType]?.forEach((field) => {
      if (!refs.current[field.name]?.value) {
        newErrors[field.name] = true;
      }
    });

    // Password Validation
    if (
      refs.current["password"]?.value !== refs.current["confirmPassword"]?.value
    ) {
      newErrors["confirmPassword"] = true;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted Successfully!");
      const formData = {
        accountType,
        firstName: refs.current["firstName"].value,
        lastName: refs.current["lastName"].value,
        email: refs.current["email"].value,
        password: refs.current["password"].value,
        confirmPassword: refs.current["confirmPassword"].value,
        vehicle: refs.current["vehicle"].value,
      };
      
      if (accountType === "Student") {
        formData.studentNum = refs.current["studentNum"].value;
        formData.userId = formData.studentNum;
      } else if (accountType === "Worker") {
        formData.workId = refs.current["workId"].value;
        formData.userId = formData.workId;
      } else if (accountType === "Admin") {
        formData.adminCode = refs.current["adminCode"].value;
      }
      
      fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Server Response:", data);
          if (data.success) {
            alert("Signup successful!");
            setIsSignupOpen(false);
          } else if (data.error) {
            alert("Signup error: " + data.error);
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
      
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-container">
        {/* Left side: Image */}
        <div className="signup-image">
          <img src="/images/LoginImage.png" alt="Parking" />
        </div>

        {/* Right side: Signup Form */}
        <div className="signup-form">
          {/* Close button */}
          <button className="close-btn" onClick={() => setIsSignupOpen(false)}>
            ✖
          </button>

          {/* Logo and Title */}
          <div className="logo-container">
            <img
              src="/images/LaspotLogo.png"
              alt="logo"
              className="signup-logo"
            />
            <h1 className="logo-title">La Spot</h1>
          </div>

          <h2 className="signup-title">Signup</h2>

          {/* Show account selection OR the selected form */}
          <p className="signup-description">
            Select account type and fill in your information.
          </p>

          {/* Signup Form overlay*/}

          <form onSubmit={handleSubmit}>
            <div className="container">
              <select
                name="AccountType"
                id="AccountTypes"
                onChange={(e) => setAccountType(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Account Type
                </option>
                <option value="Student">Student</option>
                <option value="Worker">Worker</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Render Inputs Dynamically */}
            {fieldConfigs[accountType]?.map((field, index) =>
              field.type === "select" ? (
                <select
                  key={index}
                  ref={(el) => (refs.current[field.name] = el)}
                  className={`inputField-signup ${
                    errors[field.name] ? "error" : ""
                  }`}
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  key={index}
                  type={field.type}
                  placeholder={field.placeholder}
                  ref={(el) => (refs.current[field.name] = el)}
                  className={`inputField-signup ${
                    errors[field.name] ? "error" : ""
                  }`}
                />
              )
            )}

            {/* Submit Button */}
            {accountType && (
              <button type="submit" className="submit-button">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPop;