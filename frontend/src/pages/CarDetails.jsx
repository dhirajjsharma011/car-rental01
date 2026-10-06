import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styling/carDetails.css";

export default function CarDetails() {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);

  const [form, setForm] = useState({
    user_name: "",
    from_date: "",
    to_date: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ==============================
  // GET VEHICLE
  // ==============================

  useEffect(() => {
    fetch(`http://localhost:1175/api/vehicles/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch vehicle");
        }

        return res.json();
      })
      .then((data) => {
        console.log("Vehicle Data:", data);
        setVehicle(data.data);
      })
      .catch((err) => {
        console.log("Vehicle Error:", err);
      });
  }, [id]);

  // ==============================
  // CREATE BOOKING
  // ==============================

  const handleSubmit = async (car) => {
    try {
      // Get logged-in user ID
      const userId = localStorage.getItem("userId");

      console.log("User ID:", userId);

      // Check login
      if (!userId) {
        alert("Please login first");
        return;
      }

      // Check form
      if (
        !form.user_name ||
        !form.from_date ||
        !form.to_date
      ) {
        alert("Please fill all booking fields");
        return;
      }

      // Check dates
      if (form.from_date > form.to_date) {
        alert("To date cannot be before from date");
        return;
      }

      // Booking data
      const data = {
        userId: userId,
        user_name: form.user_name,
        car_name: car.title,
        from_date: form.from_date,
        to_date: form.to_date
      };

      console.log("Booking Data:", data);

      // API call
      const res = await fetch(
        "http://localhost:1175/api/createbooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const result = await res.json();

      console.log("Booking Response:", result);

      if (!res.ok) {
        alert(result.message || "Booking failed");
        return;
      }

      alert(result.message || "Booking done successfully");

      // Clear form
      setForm({
        user_name: "",
        from_date: "",
        to_date: ""
      });

    } catch (error) {
      console.log("Booking Error:", error);
      alert("Something went wrong");
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (!vehicle) {
    return <p>Loading...</p>;
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div className="carDetails-container">

      <div className="carDetails-wrapper">

        <div className="carDetails-card">

          {/* Car Image */}
          <img
            className="carDetails-image"
            src={
              vehicle.images?.length > 0
                ? `http://localhost:1175/uploads/${vehicle.images[0]}`
                : "https://via.placeholder.com/300"
            }
            alt={vehicle.title}
          />

          {/* Header */}
          <div className="carDetails-header">

            <h1 className="carDetails-title">
              {vehicle.title}
            </h1>

            <p className="carDetails-price">
              ₹ {vehicle.price} /day
            </p>

          </div>

          {/* Car Specs */}
          <div className="carDetails-specs">

            <div className="carDetails-specBox">
              {vehicle.fuel}
            </div>

            <div className="carDetails-specBox">
              {vehicle.year}
            </div>

            <div className="carDetails-specBox">
              {vehicle.seats} seats
            </div>

          </div>

          {/* Booking */}
          <div className="carDetails-booking">

            <input
              type="text"
              name="user_name"
              placeholder="Name"
              value={form.user_name}
              className="carDetails-input"
              onChange={handleChange}
            />

            <div className="carDetails-row">

              <input
                type="date"
                name="from_date"
                value={form.from_date}
                className="carDetails-input"
                onChange={handleChange}
              />

              <input
                type="date"
                name="to_date"
                value={form.to_date}
                className="carDetails-input"
                onChange={handleChange}
              />

            </div>

            <button
              className="carDetails-button"
              onClick={() => handleSubmit(vehicle)}
            >
              Book
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}