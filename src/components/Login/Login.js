// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_LOGIN_API_URI}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        // ログイン成功時の処理
        // ダッシュボードへのリダイレクトはバックエンドで行われるため不要
      } else {
        // ログイン失敗時の処理
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const goToHome = () => {
    // "ホームに移動"ボタンがクリックされたときの処理
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
