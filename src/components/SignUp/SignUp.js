import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // サーバーにサインアップ情報を送信する処理
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CREATE_USER_API_URI}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            username,
          }),
        }
      );

      if (response.ok) {
        // サインアップが成功した場合の処理
        navigate("/");
      } else {
        // サーバーからのエラーレスポンスを取得
        const data = await response.json();
        setError(data.message || "サインアップに失敗しました。");
      }
    } catch (error) {
      console.error("サインアップエラー:", error);
      setError("サインアップに失敗しました。");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
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
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
