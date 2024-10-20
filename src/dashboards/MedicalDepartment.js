import React from "react";
import Header from "../header/Header";
import Navbar from "../Navbar";

const MedicalDepartment = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <iframe
          src="https://app.powerbi.com/view?r=eyJrIjoiZmRmMGY1OWYtZTc1MC00MDNmLTg2ZDYtYWNjMTIxMTY0MDU1IiwidCI6IjUzOTQ5NTkzLTBlOTQtNDAyZS05NmRmLTkwYTMyNjY0NWUwYiJ9"
          title="Medical Department"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default MedicalDepartment;
