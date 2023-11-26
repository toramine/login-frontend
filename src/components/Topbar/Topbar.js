// Topbar.js
import axios from "axios";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Topbar.css";

// async function checkAuth() {
//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_CHECK_AUTH_API_URI}`,
//       {
//         withCredentials: true, // クッキーを含める
//         headers: {
//           'Authorization': `Bearer ${Cookies.get('authToken')}`,
//         },
//       }
//     );

//     // サーバーからのレスポンスが正常な場合
//     return response.data.authenticated;
//   } catch (error) {
//     console.error("Error checking authentication:", error);
//     return false;
//   }
// }

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
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_LOGOUT_API_URI}`,
        {
          withCredentials: true, // クッキーを含める
          headers: {
            'Authorization': `Bearer ${Cookies.get('authToken')}`,
          },
        }
      );

      if (response.status === 200) {
        // ログアウトが成功した場合の処理
        Cookies.remove('authToken'); // クッキーをクリア
        console.log("Logout successful");
        navigate("/"); // ログアウト後のリダイレクト先
      } else {
        // ログアウトが失敗した場合の処理
        console.error("Logout failed");
        alert("ログアウトに失敗しました。");
      }
    } catch (error) {
      // エラーハンドリング
      console.error("Error during logout:", error);
      alert("エラーハンドリング");
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
