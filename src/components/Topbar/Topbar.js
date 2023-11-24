// Topbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Topbar.css";

async function checkAuth() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CHECK_AUTH_API_URI}`,
      {
        method: "GET",
        credentials: "include", // クッキーを含める
      }
    );

    // サーバーからのレスポンスが正常な場合
    const data = await response.json();
    return data.authenticated; // 認証状態を返す
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}

const Topbar = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      const isAuthenticated = await checkAuth();
      setAuthenticated(isAuthenticated);
    }

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_LOGOUT_API_URI}`,
        {
          method: "GET",
          credentials: "include", // クッキーを含める
        }
      );

      if (response.ok) {
        // ログアウトが成功した場合の処理
        console.log("Logout successful");
        navigate("/"); // ログアウト後のリダイレクト先
      } else {
        // ログアウトが失敗した場合の処理
        console.error("Logout failed");
      }
    } catch (error) {
      // エラーハンドリング
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="topbar-container">
      <div className="app-title">LoginAPI</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {authenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
};

export default Topbar;
