import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./admin-stylings/UpdateProfile.css";

export default function UpdateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    country: "",
    city: "",
    address: ""
  });

  const [loading, setLoading] = useState(true);

  // GET SINGLE USER
  useEffect(() => {
    fetch(`https://car-rental-01-9nu4.onrender.com/api/reguser/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found");
        }

        return res.json();
      })
      .then((data) => {
        console.log("User Data:", data);

        setForm({
          name: data.data.name || "",
          email: data.data.email || "",
          contact: data.data.contact || "",
          dob: data.data.dob || "",
          country: data.data.country || "",
          city: data.data.city || "",
          address: data.data.address || ""
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log("Get User Error:", error);
        alert("Unable to load user");
        setLoading(false);
      });
  }, [id]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // UPDATE USER
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://car-rental-01-9nu4.onrender.com/api/reguser/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      console.log("Update Response:", data);

      if (res.ok) {
        alert("User updated successfully");

        // Back to users page
        navigate("/regusers");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.log("Update Error:", error);
      alert("Server not reachable");
    }
  };

  if (loading) {
    return <h2>Loading user...</h2>;
  }

  return (
    <div className="update-container">

      <div className="update-card">

        <h2>Edit User</h2>

        <form onSubmit={handleUpdate}>

          <div className="update-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="update-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="update-field">
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
            />
          </div>

          <div className="update-field">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
          </div>

          <div className="update-field">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
            />
          </div>

          <div className="update-field">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="update-field">
            <label>Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="update-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/regusers")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-btn"
            >
              Update User
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}