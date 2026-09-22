import React, { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic (API call, etc.)
    console.log("Admin Login:", { email, password });
  };

  const styles = {
    loginContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "20px",
      boxSizing: "border-box",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      "@media (max-width: 768px)": {
        padding: "15px",
      },
    },
    heading: {
      color: "#333",
      marginBottom: "30px",
      fontSize: "28px",
      fontWeight: "600",
      "@media (max-width: 768px)": {
        fontSize: "24px",
        marginBottom: "20px",
      },
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      "@media (max-width: 768px)": {
        padding: "20px",
      },
    },
    input: {
      padding: "12px 15px",
      marginBottom: "20px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "16px",
      outline: "none",
      transition: "border-color 0.3s",
      ":focus": {
        borderColor: "#4CAF50",
      },
      "@media (max-width: 768px)": {
        padding: "10px 12px",
        fontSize: "14px",
        marginBottom: "15px",
      },
    },
    button: {
      padding: "12px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s",
      ":hover": {
        backgroundColor: "#45a049",
      },
      "@media (max-width: 768px)": {
        padding: "10px",
        fontSize: "15px",
      },
    },
  };

  // Inline styles don't support media queries directly, so we'll handle them differently
  const getResponsiveStyle = (styleObject) => {
    const baseStyles = { ...styleObject };
    delete baseStyles["@media (max-width: 768px)"];
    return baseStyles;
  };

  // Get mobile styles
  const getMobileStyles = () => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return {};
    
    return {
      loginContainer: {
        padding: "15px",
      },
      heading: {
        fontSize: "24px",
        marginBottom: "20px",
      },
      form: {
        padding: "20px",
      },
      input: {
        padding: "10px 12px",
        fontSize: "14px",
        marginBottom: "15px",
      },
      button: {
        padding: "10px",
        fontSize: "15px",
      },
    };
  };

  const mobileStyles = getMobileStyles();

  return (
    <div style={{ ...getResponsiveStyle(styles.loginContainer), ...mobileStyles.loginContainer }}>
      <h2 style={{ ...getResponsiveStyle(styles.heading), ...mobileStyles.heading }}>Admin Login</h2>
      <form 
        style={{ ...getResponsiveStyle(styles.form), ...mobileStyles.form }}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...getResponsiveStyle(styles.input), ...mobileStyles.input }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...getResponsiveStyle(styles.input), ...mobileStyles.input }}
        />
        <button 
          type="submit"
          style={{ ...getResponsiveStyle(styles.button), ...mobileStyles.button }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;