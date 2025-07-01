import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Modal from "./components/modal";
import Section from "./components/section";
import LawyerSignup from "./register-lawyer/LawyerSignUp";
import StartupSignup from "./register-startup/StartUpSignUp";
import LawyerDashboard from "./dashboard/lawyer/lawyerDashboard";
import StartupDashboard from "./dashboard/startup/startupDashboard";
import Forum from "./forum/forum"
import LoginForm from "./login/login"

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSignUpModal = () => setIsModalOpen(true);
  const closeSignUpModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div className="App">
        <NavBar openSignUpModal={openSignUpModal} />
        {isModalOpen && <Modal closeSignUpModal={closeSignUpModal} />}

        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Section title="Welcome or Featured Q&A" />
                <Section title="Latest Legal Questions" />
                <Section title="Lawyer Highlights or Help Center" />
              </main>
            }
          />
          <Route path="/register-lawyer" element={<LawyerSignup />} />
          <Route path="/register-startup" element={<StartupSignup />} />
          <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
          <Route path="/dashboard/startup" element={<StartupDashboard />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>

        <footer>&copy; 2025 LawStart. All rights reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
