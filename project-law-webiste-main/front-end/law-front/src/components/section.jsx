import React from "react";

const Section = ({ title }) => {
  return (
    <div style={styles.section}>
      <h2>{title}</h2>
    </div>
  );
};

const styles = {
  section: {
    border: "1px solid #ccc",
    padding: "1.5rem",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginBottom: "2rem",
  },
};

export default Section;
