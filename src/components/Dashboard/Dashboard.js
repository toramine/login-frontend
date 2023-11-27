import axios from "axios";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_GETAll_API_URI}`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${Cookies.get('authToken')}`,
            },
          }
        );

        if (response.status === 200) {
          setUserData(response.data);
        } else {
          console.error(`データの取得に失敗しました。ステータス: ${response.status}`);
          navigate('/errorpage');
        }
      } catch (error) {
        console.error("データの取得エラー:", error);
        navigate('/errorpage');
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_DELETE_USER_API_URI}/${selectedUserId}`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('authToken')}`,
          },
        }
      );

      if (response.status === 200) {
        setUserData(userData.filter((user) => user.id !== selectedUserId));
      } else {
        console.error(
          "Delete user error:",
          response.data.message || "削除に失敗しました。"
          );
        navigate('/errorpage');
      }
    } catch (error) {
      console.error("Delete user error:", error);
      navigate('/errorpage');
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
