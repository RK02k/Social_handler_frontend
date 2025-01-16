import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="dashboard-list" style={{ width: "80%", maxWidth: "800px" }}>
        <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
        {users.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} className="mb-4">
              <h3>{user.name}</h3>
              <p>
                <strong>Social Handle:</strong> {user.socialHandle}
              </p>
              <div>
                {user.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}  // Use image URL directly
                    alt={`${user.name}'s submission`}
                    style={{ width: "100%", maxHeight: "500px", objectFit: "cover", marginBottom: "10px" }}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
