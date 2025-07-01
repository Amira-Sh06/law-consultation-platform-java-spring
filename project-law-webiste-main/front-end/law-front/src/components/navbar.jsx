import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ openSignUpModal }) => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>LawStart</div>
      <div style={styles.navLinks}>
        <a href="#">Home</a>
        <Link to="/login">Log In</Link>
        <a href="#" onClick={openSignUpModal}>Sign Up</a>
        <a href="#">Contact Us</a>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#003366",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "1rem",
    color: "white",
  },
  a: {
      color: "white"}
};

export default NavBar;
