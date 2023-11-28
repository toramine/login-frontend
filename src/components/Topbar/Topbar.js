// Topbar.js
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Topbar.css";

const Topbar = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      const isAuthenticated = Cookies.get('authToken') ? true : false;
      setAuthenticated(isAuthenticated);
      console.log(isAuthenticated);
    }

    checkAuthentication();
  }, [Cookies.get('authToken')]);

  const handleLogout = async () => {
    try {
      // ログアウトが成功した場合の処理
      Cookies.remove('authToken'); // クッキーをクリア
      console.log("Logout successful");
      navigate("/"); // ログアウト後のリダイレクト先
    } catch (error) {
      console.error("Logout failed:", error);
      alert("ログアウトに失敗しました。");
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
