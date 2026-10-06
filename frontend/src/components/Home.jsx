import React, { useEffect, useState } from "react";
import "../styling/Home.css";
import axios from "axios"; 

export default function Home() {

  const [vehicles, setVehicles] = useState([]);
  const [testimonials, setTestimonials] = useState([]); 

  // 🔹 Existing vehicles API (UNCHANGED)
  useEffect(() => {
    fetch("http://localhost:1175/api/vehicles")
      .then(res => res.json())
      .then(data => {
        setVehicles(data.data || []);
      })
      .catch(err => console.log(err));
  }, []);

  // 🔹 Testimonials API (NEW)
  useEffect(() => {
  axios.get("http://localhost:1175/api/gettestimonials")
      .then(res => setTestimonials(res.data))
      .catch(err => console.log(err));
  }, []);

  
  return (
    <div className="crp-main-container">

      {/* HERO */}
      <div className="crp-hero-section">
        <div className="crp-hero-overlay">
          <h1>Find The Perfect Car</h1>
          <p>Rent luxury and budget cars easily</p>
        </div>
      </div>

      <div className="crs-main-wrapper">

        {/* HEADING */}
        <div className="crs-heading-area">
          <h2>
            Find the Best <span>Car For You</span>
          </h2>

          <p>
            There are many variations of passages of Lorem Ipsum available.
          </p>

          <button className="crs-newcar-btn">New Car</button>
        </div>

        {/* CAR GRID */}
        <div className="crs-car-grid">

          {vehicles.length > 0 ? (
            vehicles.map((car, i) => (
              <div className="crs-car-card" key={i}>

                {/* IMAGE */}
                <img
                  src={
                    car.images && car.images.length > 0
                      ? `http://localhost:1175/uploads/${car.images[0]}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={car.title}
                />

                {/* INFO */}
                <div className="crs-car-info">
                  <h3>{car.title}</h3>
                  <p>₹{car.price} / Day</p>
                </div>

              </div>
            ))
          ) : (
            <p>No Vehicles Found</p>
          )}

        </div>

        {/* TESTIMONIAL SECTION (NEW ADD) */}
        <div style={{ marginTop: "50px" }}>
          <h2 style={{ textAlign: "center" }}>What Our Customers Say</h2>

          {testimonials.length > 0 ? (
            testimonials.map((t, index) => (
              <div key={index} style={{
                border: "1px solid #ddd",
                padding: "15px",
                margin: "10px 0",
                borderRadius: "8px",
                background: "#f9f9f9"
              }}>
                <h3>{t.name}</h3>
                <p>"{t.message}"</p>
                <p>⭐ {t.rating}</p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No Testimonials Yet</p>
          )}
        </div>

      </div>

    </div>
  );
}