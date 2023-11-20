// Topbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <Link to="/" className="topbar-link">
        Home
      </Link>
      <Link to="/login" className="topbar-link">
        LoginAPI
      </Link>
      <Link to="/dashboard" className="topbar-link">
        Dashboard
      </Link>
    </div>
  );
};

export default Topbar;
