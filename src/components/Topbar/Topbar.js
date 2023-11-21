// Topbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Topbar.css";

const Topbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ログアウト処理
    // この例では親コンポーネントから渡された onLogout 関数を呼び出しています
    onLogout();
    navigate("/");
  };

  return (
    <div className="topbar-container">
      <div className="app-title">LoginAPI</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
};

export default Topbar;
