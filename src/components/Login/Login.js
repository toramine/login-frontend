// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // ログイン処理の実装
  };

  const goToHome = () => {
    // "ホームに移動"ボタンがクリックされたときの処理
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
