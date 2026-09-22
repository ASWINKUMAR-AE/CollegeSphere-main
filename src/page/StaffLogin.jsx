import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaIdCard, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost/backend_raju/login_staff.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, id }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.message);
          localStorage.setItem("staff", JSON.stringify(data.staff));
          navigate("/dashboard");
        }
      } else {
        setError("Server error");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, rgba(0, 34, 68, 0.9), rgba(0, 82, 73, 0.9)), url('./images/bg.jpg') center/cover no-repeat",
      fontFamily: "'Poppins', sans-serif",
      padding: "20px",
    },
    logo: {
      width: "80px",
      marginBottom: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      padding: "40px",
      borderRadius: "15px",
      backgroundColor: "rgba(255, 255, 255, 0.56)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "30px",
    },
    iconContainer: {
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      backgroundColor: "rgba(76, 175, 80, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },
    icon: {
      color: "#4CAF50",
      fontSize: "30px",
    },
    title: {
      color: "#002244",
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "5px",
    },
    subtitle: {
      color: "#666",
      fontSize: "14px",
    },
    formGroup: {
      marginBottom: "20px",
      textAlign: "left",
    },
    label: {
      display: "block",
      color: "#002244",
      marginBottom: "8px",
      fontWeight: "500",
      fontSize: "14px",
    },
    inputContainer: {
      position: "relative",
    },
    inputIcon: {
      position: "absolute",
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#666",
    },
    input: {
      width: "100%",
      padding: "12px 15px 12px 45px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "14px",
      transition: "all 0.3s ease",
      ":focus": {
        outline: "none",
        borderColor: "#4CAF50",
        boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.2)",
      },
    },
    button: {
      width: "100%",
      padding: "14px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#002244",
      color: "white",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      transition: "all 0.3s ease",
      ":hover": {
        backgroundColor: "#001a33",
        transform: "translateY(-2px)",
      },
      ":disabled": {
        backgroundColor: "#cccccc",
        cursor: "not-allowed",
        transform: "none",
      },
    },
    footerText: {
      color: "#666",
      fontSize: "13px",
      marginTop: "20px",
    },
    error: {
      color: "#d32f2f",
      fontSize: "14px",
      marginTop: "15px",
      fontWeight: "500",
      textAlign: "center",
    },
    success: {
      color: "#4CAF50",
      fontSize: "14px",
      marginTop: "15px",
      fontWeight: "500",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <FaUserShield style={styles.icon} />
          </div>
          <h2 style={styles.title}>Staff Portal Login</h2>
          <p style={styles.subtitle}>Tamil Nadu Govt Polytechnic College</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputContainer}>
              <FaUserShield style={styles.inputIcon} />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Staff ID</label>
            <div style={styles.inputContainer}>
              <FaIdCard style={styles.inputIcon} />
              <input
                type="text"
                placeholder="Enter your staff ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                style={styles.input}
              />
            </div>
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={isSubmitting}
          >
            <FaSignInAlt />
            {isSubmitting ? "Authenticating..." : "Login"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <p style={styles.footerText}>
          For assistance, please contact the admin office
        </p>
      </div>
    </div>
  );
};

export default Login;