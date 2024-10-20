import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <div className="dropdown">
          <button className="dropbtn">Dashboards</button>
          <div className="dropdown-content">
            <Link to="/Electionreports">Election Reports</Link>
            <Link to="/resurvey">NPI House Sites</Link>
            <Link to="/medicaldepartment">Revenue Reports</Link>
          </div>
        </div>
        <Link to="/contact">Contact</Link>
        <div>
          <button
            onClick={() => handleNavigate()}
            style={{
              position: "absolute",
              right: 0,
              borderRadius: 20,
              padding: 10,
              width: 90,
              marginRight: 30,
              backgroundColor: "#F44336",
              color: "white",
              fontWeight: "bold",
              borderWidth: 1,
              borderColor: "#FFD9C0",
            }}
          >
            Log Out
          </button>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Navbar;
