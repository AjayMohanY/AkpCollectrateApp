import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  console.log("username", username);
  console.log("password", password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/login", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      if (response.status == 200) {
        alert("Login Success", {});
        const isAdmin = await response?.json();
        console.log(isAdmin);
        navigate("/", { state: { isAdmin } });
      } else {
        alert("Invalid Credientails");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <div className="loginContainer">
        <h3 style={{ textAlign: "center", marginTop: 20, color: "black" }}>
          Login
        </h3>
        <div className="usernameContainer">
          <label>
            Username
            <input
              type="text"
              name="username"
              placeholder="Enter Phone Number"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <br />
        <div className="passwordContainer">
          <label>
            {" "}
            password
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
        <div className="newUserLink">
          <p style={{ color: "black" }}>
            Don't Have An Account?{" "}
            <a href="/register" style={{ color: "black" }}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
