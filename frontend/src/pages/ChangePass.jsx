import React, { useState } from "react";
import "../styling/ChangePass.css";

export default function ChangePass() {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not logged in");
        return;
      }

      if (!passwords.oldPassword) {
        alert("Please enter your current password");
        return;
      }

      if (!passwords.newPassword) {
        alert("Please enter your new password");
        return;
      }

      if (passwords.newPassword !== passwords.confirmPassword) {
        alert("New password and confirm password do not match");
        return;
      }

      const res = await fetch(
        `http://localhost:1175/api/change-password/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Password change failed");
        return;
      }

      alert("Password changed successfully");

      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="password-page">

      <div className="password-wrapper">

        <div className="password-card">

          <div className="password-heading">
            <span className="password-heading-line"></span>

            <div>
              <h2>Change Password</h2>
              <p>Keep your account secure with a strong password</p>
            </div>
          </div>

          <form
            className="password-form"
            onSubmit={handleSubmit}
          >

            <div className="password-field">
              <label>Current Password</label>

              <input
                type="password"
                name="oldPassword"
                placeholder="Enter current password"
                value={passwords.oldPassword}
                onChange={handleChange}
              />
            </div>

            <div className="password-field">
              <label>New Password</label>

              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={passwords.newPassword}
                onChange={handleChange}
              />
            </div>

            <div className="password-field">
              <label>Confirm New Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwords.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="password-action">
              <button
                type="submit"
                className="password-submit-btn"
              >
                Change Password
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
}