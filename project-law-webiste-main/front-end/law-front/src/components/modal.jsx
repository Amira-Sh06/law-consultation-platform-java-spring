import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ closeSignUpModal }) => {
  const navigate = useNavigate();

  const handleLawyerClick = () => {
    closeSignUpModal();
    navigate("/register-lawyer");
  };

  const handleStartupClick = () => {
    closeSignUpModal();
    navigate("/register-startup");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select Account Type</h2>
        <button onClick={handleLawyerClick}>I'm a Lawyer</button>
        <button onClick={handleStartupClick}>I'm a Startup</button>
        <button onClick={closeSignUpModal}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
