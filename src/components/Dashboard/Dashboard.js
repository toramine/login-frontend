import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // バックエンドからデータを取得する処理
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_GETAll_API_URI}`
    )
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleConfirmDelete = async () => {
    try {
      // バックエンドにユーザー削除のリクエストを送信
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_DELETE_USER_API_URI}/${selectedUserId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // 削除成功時の処理
        setUserData(userData.filter((user) => user.id !== selectedUserId));
      } else {
        // サーバーからのエラーレスポンスを取得
        const data = await response.json();
        console.error(
          "Delete user error:",
          data.message || "削除に失敗しました。"
        );
      }
    } catch (error) {
      console.error("Delete user error:", error);
    } finally {
      setSelectedUserId(null);
    }
  };

  const handleCancelDelete = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <ul className="user-list">
        {userData.map((user) => (
          <li key={user.id}>
            <span>{user.username}</span>
            <Link to={`/edit/${user.id}`} className="edit-link">
              Edit
            </Link>
            <button
              onClick={() => handleDeleteClick(user.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {selectedUserId && (
        <div className="delete-confirmation">
          <p>本当に削除しますか？</p>
          <button onClick={handleConfirmDelete}>はい</button>
          <button onClick={handleCancelDelete}>いいえ</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
