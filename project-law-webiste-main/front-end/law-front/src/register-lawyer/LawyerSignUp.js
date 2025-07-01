import React, { useState } from "react";

const LawyerSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    specialization: "",
    experienceYears: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/lawyers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Registration successful!");
        // maybe redirect or reset form here
      } else {
        alert("Failed to register. Try again.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Lawyer Sign-Up</h2>

        <label style={styles.label}>
          Username:
          <input type="text" name="username" required style={styles.input} value={formData.username} onChange={handleChange} />
        </label>

        <label style={styles.label}>
          Email:
          <input type="email" name="email" required style={styles.input} value={formData.email} onChange={handleChange} />
        </label>

        <label style={styles.label}>
          Password:
          <input type="password" name="password" required style={styles.input} value={formData.password} onChange={handleChange} />
        </label>

        <label style={styles.label}>
          Specialization:
          <input type="text" name="specialization" required style={styles.input} value={formData.specialization} onChange={handleChange} />
        </label>

        <label style={styles.label}>
          Years of Experience:
          <input type="number" name="experienceYears" required style={styles.input} value={formData.experienceYears} onChange={handleChange} />
        </label>

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "sans-serif",
    background: "#f2f7fc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  form: {
    background: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "300px"
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem"
  },
  label: {
    display: "block",
    marginBottom: "0.75rem"
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.25rem"
  },
  button: {
    marginTop: "1rem",
    width: "100%",
    padding: "0.5rem",
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default LawyerSignup;
