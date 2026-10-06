import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./admincss/admin.css";
import "./admin-stylings/RegUsers.css"

export default function RgUsers() {
  const [users, setUsers] = useState([]);

  // GET USERS
  useEffect(() => {
    fetch("https://car-rental-01-9nu4.onrender.com/api/reguser")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 🗑 DELETE USER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://car-rental-01-9nu4.onrender.com/api/reguser/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("User deleted");
        // remove from UI
        setUsers(users.filter((u) => u._id !== id));
      } else {
        alert(data.message || "Deletion failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="usr-container">
        <h2>All Users</h2>

        <table className="usr-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>DOB</th>
              <th>Country</th>
              <th>City</th>
              <th>Address</th>
              <th>Action</th> 
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.contact}</td>
                <td>{u.dob}</td>
                <td>{u.country}</td>
                <td>{u.city}</td>
                <td>{u.address}</td>

                <td>
            
                  <Link
                    to={`/update-Profile/${u._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>

                  
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
      </div>
    </div>
  );
}