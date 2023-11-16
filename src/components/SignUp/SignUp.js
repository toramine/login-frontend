// SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    // ユーザーがサインアップボタンをクリックした際の処理
    // 例: サーバーにサインアップ情報を送信するロジック
  };

  const goToHome = () => {
    // "ホームに移動"ボタンがクリックされたときの処理
    navigate("/");
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form">
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
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>

      {/* ホームに移動するボタン */}
      <button className="go-home-button" type="button" onClick={goToHome}>
        ホームに移動
      </button>
    </div>
  );
};

export default SignUp;
