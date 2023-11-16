// Home.js
import React from "react";
import { Link } from "react-router-dom"; // リンクを使うためにreact-router-domからLinkをインポート
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Our Website</h2>
      <p>Explore the amazing features of our platform.</p>

      <div className="button-container">
        <Link to="/login" className="home-button">
          Login
        </Link>
        <Link to="/signup" className="home-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
