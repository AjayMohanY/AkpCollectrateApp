import React from "react";
import Header from "../header/Header";
import Navbar from "../Navbar";

const ElectionReports = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
        <iframe
          src="https://app.powerbi.com/view?r=eyJrIjoiNDkyNjkxZDMtNWI1Yy00ODUyLTlhMWYtMzhhNmY5MTdkYjY3IiwidCI6IjUzOTQ5NTkzLTBlOTQtNDAyZS05NmRmLTkwYTMyNjY0NWUwYiJ9"
          title="GSWS"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
};

export default ElectionReports;
