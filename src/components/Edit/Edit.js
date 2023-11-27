import axios from "axios";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css";


const Edit = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // バックエンドからデータを取得する処理
    axios.get(
      `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_GETID_API_URI}/${id}`,
      {
        withCredentials: true, // クッキーを含める
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`,
        },
      }
    )
      .then((response) => setUserData(response.data))
      .catch((error) => {
        // console.error("Error fetching data:", error);
        navigate('/errorpage');
      });
  }, [id]);

  const handleUpdate = () => {
    if (!newPassword) {
      setError("パスワードは入力必須です。");
      return;
    } else {
      setError("");
    }

    // Send new user data to the backend
    axios.put(
      `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_UPDATE_USER_API_URI}/${id}`,
      {
        username: newUsername || userData.username,
        email: newEmail || userData.email,
        password: newPassword, // Send the password as is
      },
      {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`,
        },
      }
    )
      .then((response) => {
        console.log("User data updated:", response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        navigate('/errorpage');
      });
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="edit-page-container">
      <h2>Edit User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <div className="user-details">
        <label>Username:</label>
        <input
          type="text"
          value={newUsername || userData.username}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={newEmail || userData.email}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button className="update-button" onClick={handleUpdate}>
        Update User
      </button>
      <button className="go-back-button" onClick={() => goToDashboard()}>
        Go Back
      </button>
    </div>
  );
};

export default Edit;
