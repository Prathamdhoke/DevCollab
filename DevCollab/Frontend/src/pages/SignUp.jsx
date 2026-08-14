import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

import "./SignUp.css";

const Signup = () => {
  const navigate = useNavigate();

  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",

    email: "",

    password: "",

    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,

      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");

      return;
    }

    const result = await signup({
      name: formData.fullName,

      username: formData.fullName.replace(/\s+/g, "_"),

      email: formData.email,

      password: formData.password,
    });

    console.log("Signup Result:", result);

    if (result.success) {
      navigate("/dashboard");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Section */}

        <div className="signup-left">
          <h1>DevCollab</h1>

          <h2>Build Together. Ship Together.</h2>

          <p>
            Join developers from around the world and collaborate on projects,
            discuss ideas, manage tasks and build amazing software together.
          </p>

          <div className="signup-illustration"></div>
        </div>

        {/* Right Section */}

        <div className="signup-right">
          <h2>Create your account</h2>

          <p>Start collaborating with developers today.</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Create Account</button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
