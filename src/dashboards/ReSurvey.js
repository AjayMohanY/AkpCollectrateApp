import React from "react";
import Header from "../header/Header";
import Navbar from "../Navbar";

const ReSurvey = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <iframe
          src="https://app.powerbi.com/view?r=eyJrIjoiZDE5MGM2YjUtYzAxZi00MjExLTlkMzAtMmVmOTkwYWYyNDFiIiwidCI6IjUzOTQ5NTkzLTBlOTQtNDAyZS05NmRmLTkwYTMyNjY0NWUwYiJ9"
          title="ReSurvey"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
};

export default ReSurvey;
