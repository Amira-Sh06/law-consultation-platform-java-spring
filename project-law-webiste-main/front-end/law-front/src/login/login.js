import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      const data = await res.json(); // { id, userType }

      localStorage.setItem("id", data.id);
      localStorage.setItem("userType", data.userType);

      if (data.userType === "lawyer") {
        navigate("/dashboard/lawyer");
      } else {
        navigate("/dashboard/startup");
      }
    }
  } catch (error) {
    console.error("Login failed", error);
  }
};


  return (
    <div style={{
      fontFamily: 'sans-serif',
      background: '#eef2f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          width: '300px'
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Log In</h2>
        <label style={{ display: 'block', marginTop: '1rem' }}>
          Username:
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
        <label style={{ display: 'block', marginTop: '1rem' }}>
          Password:
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
        <button
          type="submit"
          style={{
            marginTop: '1.5rem',
            width: '100%',
            backgroundColor: '#004080',
            color: 'white',
            border: 'none',
            padding: '0.6rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0066cc')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#004080')}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
