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
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_GETID_API_URI}/${id}`
    )
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleUpdate = () => {
    if (!newPassword) {
      setError("パスワードは入力必須です。");
      return;
    } else {
      setError("");
    }

    // バックエンドに新しいユーザーデータを送信する処理
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_UPDATE_USER_API_URI}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUsername || userData.username,
          email: newEmail || userData.email,
          password: newPassword, // パスワードをそのまま送信
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("User data updated:", data);
        navigate("/dashboard");
      })
      .catch((error) => console.error("Error updating user data:", error));
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
