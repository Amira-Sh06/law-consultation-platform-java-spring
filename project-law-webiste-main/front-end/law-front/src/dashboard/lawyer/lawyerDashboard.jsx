import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LawyerDashboard = () => {
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', specialization: '' });
const [showCompanyModal, setShowCompanyModal] = useState(false);
const [selectedCompany, setSelectedCompany] = useState(null);

  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
const openCompanyModal = (startup) => {
  setSelectedCompany(startup);
  setShowCompanyModal(true);
};

  useEffect(() => {
    fetch(`http://localhost:8080/answers/lawyer/${userId}`)
      .then(res => res.json())
      .then(data => setAnswers(data))
      .catch(err => console.error("Failed to fetch answers:", err));
  }, [userId]);

  const handleDelete = (answerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this answer?");
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/answers/${answerId}`, {
      method: "DELETE",
    })
      .then(res => {
        if (res.ok) {
          setAnswers(prev => prev.filter(ans => ans.id !== answerId));
        } else {
          throw new Error("Failed to delete");
        }
      })
      .catch(err => console.error("Delete error:", err));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/lawyers/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update profile");
        alert("Profile updated successfully");
        setShowModal(false);
      })
      .catch(err => console.error("Update error:", err));
  };
const [lawyer, setLawyer] = useState({ username: '' });

// Inside useEffect to fetch lawyer data:
useEffect(() => {
  fetch(`http://localhost:8080/lawyers/${userId}`)
    .then(res => res.json())
    .then(data => setLawyer(data))
    .catch(err => console.error("Failed to fetch lawyer info:", err));
}, [userId]);
const handleDeleteProfile = () => {
  const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
  if (!confirmDelete) return;

  fetch(`http://localhost:8080/lawyers/${userId}`, {
    method: "DELETE",
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to delete profile");
      alert("Profile deleted. You will be logged out.");
      localStorage.clear();
      navigate("/login"); // or home page
    })
    .catch(err => console.error("Delete profile error:", err));
};

  return (
    <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ marginRight: '1rem', fontWeight: 'bold' }}>
            Welcome, {lawyer.username || "Lawyer"}!
          </span>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: '0.4rem 0.8rem',
              backgroundColor: '#FFA500',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '0.4rem'
            }}
          >
            Update Profile
          </button>
    <button
        onClick={() => handleDeleteProfile()}
        style={{
          padding: '0.4rem 0.8rem',
          backgroundColor: '#D9534F',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Delete Profile
      </button>
        </div>

      <h2>Your Answers</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {answers.map((ans) => (
          <div key={ans.id} style={{
            background: '#f9f9f9',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3>Q: {ans.question.title}</h3>
            <p style={{ fontStyle: 'italic' }}>{ans.question.description}</p>
            <p><strong>A:</strong> {ans.content}</p>
            <p style={{ color: 'gray' }}>
              Asked by: {ans.question.startup.companyName}{" "}
              <button
                onClick={() => openCompanyModal(ans.question.startup)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  textDecoration: "underline",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: '0.9rem'
                }}
              >
                (View Company Info)
              </button>
            </p>

            <p style={{ color: 'gray' }}>Category: {ans.question.category}</p>
            <p style={{ color: 'gray' }}>Tags: {ans.question.tags + " "}</p>
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={() => handleDelete(ans.id)}
                style={{
                  padding: '0.4rem 0.8rem',
                  backgroundColor: '#D9534F',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete Answer
              </button>

            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/forum")}
        style={{
          marginTop: '2rem',
          padding: '0.8rem 1.2rem',
          backgroundColor: '#004080',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Go to Forum
      </button>
        {showCompanyModal && selectedCompany && (
          <>
            <div onClick={() => setShowCompanyModal(false)} style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 999
            }} />

            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              zIndex: 1000,
              width: '300px'
            }}>
              <h3>Company Information</h3>
              <p><strong>Username:</strong> {selectedCompany.username}</p>
              <p><strong>Email:</strong> {selectedCompany.email}</p>
              <p><strong>Company:</strong> {selectedCompany.companyName}</p>
              <p><strong>Description:</strong> {selectedCompany.description}</p>
              <button
                onClick={() => setShowCompanyModal(false)}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#888',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </>
        )}

      {showModal && (
        <>
          <div onClick={() => setShowModal(false)} style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }} />

          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            zIndex: 1000,
            width: '300px'
          }}>
            <h3>Update Profile</h3>
            <form onSubmit={handleUpdateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" style={{ background: '#28a745', color: '#fff', padding: '0.5rem', border: 'none', borderRadius: '4px' }}>Update</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: '#ccc', padding: '0.5rem', border: 'none', borderRadius: '4px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default LawyerDashboard;
