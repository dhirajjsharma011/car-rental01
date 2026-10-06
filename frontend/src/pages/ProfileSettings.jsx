import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "../styling/ProfileSettings.css";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    address: "",
    country: "",
    city: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          alert("User not logged in");
          return;
        }

        const res = await fetch(
          `https://car-rental-01-9nu4.onrender.com/api/profile/${userId}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setProfile({
          name: data.data.name || "",
          email: data.data.email || "",
          contact: data.data.contact || "",
          dob: data.data.dob || "",
          address: data.data.address || "",
          country: data.data.country || "",
          city: data.data.city || ""
        });
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
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

      const res = await fetch(
        `https://car-rental-01-9nu4.onrender.com/api/profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(profile)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      alert("Profile updated successfully");

      // Updated name ko localStorage mein bhi save kar do
      localStorage.setItem("name", profile.name);

    } catch (err) {
      console.error("Update error:", err);
      alert("Profile update failed");
    }
  };

  return (
    <div className="settings-page">

      <div className="settings-wrapper">

        <div className="settings-card">

          <div className="settings-heading">
            <span className="settings-heading-line"></span>

            <div>
              <h2>General Settings</h2>
              <p>Update your personal information</p>
            </div>
          </div>

          <form
            className="settings-form"
            onSubmit={handleSubmit}
          >

            <div className="settings-form-grid">

              <div className="settings-field">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="settings-field">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="settings-field">
                <label>Phone Number</label>

                <input
                  type="text"
                  name="contact"
                  value={profile.contact}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="settings-field">
                <label>Date of Birth</label>

                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="settings-field settings-field-full">
                <label>Your Address</label>

                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                ></textarea>
              </div>

              <div className="settings-field">
                <label>Country</label>

                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                />
              </div>

              <div className="settings-field">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
              </div>

            </div>

            <div className="settings-action">
              <button
                className="settings-save-btn"
                type="submit"
              >
                Save Changes
              </button>
            </div>

          </form>

        </div>

        <div className="settings-outlet">
          <Outlet />
        </div>

      </div>

    </div>
  );
}