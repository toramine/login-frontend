// ErrorPage.js

import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css"; // スタイルを適用するための CSS ファイル

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h2>Error</h2>
      <p>Unauthorized Access</p>
      <p>Please log in to access this page.</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default ErrorPage;
