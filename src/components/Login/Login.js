import axios from "axios";
import Cookies from 'js-cookie';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_LOGIN_API_URI}`,
        { username, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set('authToken', token);
        navigate("/dashboard");
      } else {
        console.error("Login failed:", response.data.error);
        // Display error in the browser
        alert("ログインに失敗しました。");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("ログインに失敗しました。");
    }
  };

  const goToHome = () => {
    navigate("/");
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>

      {/* ホームに移動するボタン */}
      <button className="go-home-button" type="button" onClick={goToHome}>
        ホームに移動
      </button>
    </div>
  );
};

export default Login;
