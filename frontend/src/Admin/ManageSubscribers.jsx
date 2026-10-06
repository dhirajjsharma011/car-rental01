import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin-stylings/Subscribers.css";

export default function ManageSubscribers() {

  const [email, setEmail] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // =========================================
  // GET ALL SUBSCRIBERS
  // =========================================

  const fetchSubscribers = async () => {
    try {

      setLoading(true);

      const res = await axios.get(
        "https://car-rental-01-9nu4.onrender.com/api/subscribers"
      );

      console.log("Subscribers Response:", res.data);

      setSubscribers(res.data.data || []);

    } catch (err) {

      console.log(
        "Fetch Subscribers Error:",
        err
      );

      setMessage(
        err.response?.data?.message ||
        "Failed to fetch subscribers"
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================
  // LOAD SUBSCRIBERS
  // =========================================

  useEffect(() => {

    fetchSubscribers();

  }, []);


  // =========================================
  // ADD SUBSCRIBER
  // =========================================

  const handleSubscribe = async (e) => {

    e.preventDefault();

    setMessage("");

    if (!email.trim()) {

      setMessage("Please enter email");

      return;
    }

    try {

      const res = await axios.post(
        "https://car-rental-01-9nu4.onrender.com/api/subscribe",
        {
          email: email.trim()
        }
      );

      console.log(
        "Subscribe Response:",
        res.data
      );

      setMessage(
        res.data.message ||
        "Subscriber added successfully"
      );

      setEmail("");

      fetchSubscribers();

    } catch (err) {

      console.log(
        "Add Subscriber Error:",
        err
      );

      setMessage(
        err.response?.data?.message ||
        "Failed to add subscriber"
      );
    }
  };


  // =========================================
  // DELETE SUBSCRIBER
  // =========================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this subscriber?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const res = await axios.delete(
        `https://car-rental-01-9nu4.onrender.com/api/subscriber/${id}`
      );

      console.log(
        "Delete Response:",
        res.data
      );

      setMessage(
        res.data.message ||
        "Subscriber deleted successfully"
      );

      fetchSubscribers();

    } catch (err) {

      console.log(
        "Delete Subscriber Error:",
        err
      );

      setMessage(
        err.response?.data?.message ||
        "Failed to delete subscriber"
      );
    }
  };


  // =========================================
  // UI
  // =========================================

  return (

    <div className="sub-container">

      <h2 className="sub-title">
        Subscriber Manager
      </h2>


      {/* ADD SUBSCRIBER */}

      <form
        className="sub-form"
        onSubmit={handleSubscribe}
      >

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button type="submit">
          Add Subscriber
        </button>

      </form>


      {/* MESSAGE */}

      {message && (

        <p
          style={{
            textAlign: "center",
            marginBottom: "15px",
            color: "#333"
          }}
        >
          {message}
        </p>

      )}


      {/* SUBSCRIBER LIST */}

      <div className="sub-list">

        {loading ? (

          <div className="sub-empty">
            Loading subscribers...
          </div>

        ) : subscribers.length > 0 ? (

          subscribers.map((sub) => (

            <div
              className="sub-item"
              key={sub._id}
            >

              <span className="sub-email">
                {sub.email}
              </span>

              <button
                className="sub-delete"
                onClick={() =>
                  handleDelete(sub._id)
                }
              >
                Delete
              </button>

            </div>

          ))

        ) : (

          <div className="sub-empty">
            No subscribers found
          </div>

        )}

      </div>

    </div>

  );
}
