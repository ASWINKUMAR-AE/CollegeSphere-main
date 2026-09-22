import React, { useState } from "react";
import "./style.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
    reg: "",
    emp_id: "",
    dept: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = "http://localhost/backend_raju/users.php";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    // Validate Required Fields
    if (!formData.username || !formData.email || !formData.password || !formData.dept) {
      setMessage({ text: "Please fill all required fields.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    // Role-specific validation
    if (formData.role === "student" && !formData.reg) {
      setMessage({ text: "Registration number is required for students.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    if ((formData.role === "staff" || formData.role === "admin") && !formData.emp_id) {
      setMessage({ text: "Employee ID is required for staff/admin.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          dept: formData.dept,
          reg_no: formData.reg,
          emp_id: formData.emp_id
        }),
      });

      // Handle cases where the fetch completes but returns an error status
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server responded with status ${response.status}`
        );
      }

      const data = await response.json();

      if (data.status === "success") {
        setMessage({ text: data.message, type: "success" });
        // Reset form
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "student",
          reg: "",
          emp_id: "",
          dept: "",
        });
      } else {
        setMessage({ text: data.message || "Registration failed", type: "error" });
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      // Specific error handling for fetch failures
      if (error.message === "Failed to fetch") {
        setMessage({ 
          text: "Could not connect to the server. Please check your network connection and try again.", 
          type: "error" 
        });
      } else {
        setMessage({ 
          text: error.message || "An unexpected error occurred. Please try again later.", 
          type: "error" 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        {message.text && (
          <p className={`message ${message.type}`}>
            {message.text}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            required
          >
            <option value="student">Student</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>

          {formData.role === "student" && (
            <input
              type="text"
              name="reg"
              placeholder="Registration Number"
              value={formData.reg}
              onChange={handleChange}
              required
            />
          )}
          
          {(formData.role === "staff" || formData.role === "admin") && (
            <input
              type="text"
              name="emp_id"
              placeholder="Employee ID"
              value={formData.emp_id}
              onChange={handleChange}
              required
            />
          )}
          
          <input
            type="text"
            name="dept"
            placeholder="Department"
            value={formData.dept}
            onChange={handleChange}
            required
          />
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? "submitting" : ""}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;