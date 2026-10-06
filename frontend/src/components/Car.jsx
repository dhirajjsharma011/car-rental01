import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styling/Car.css";

export default function Car() {
  const [brands, setBrands] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    brand: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetch("https://car-rental-01-9nu4.onrender.com/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.data || []))
      .catch((err) => console.log(err));

    fetch("https://car-rental-01-9nu4.onrender.com/api/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data.data || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* HERO */}
      <div className="car-hero">
        <div className="car-hero__overlay">
          <h1 className="car-hero__title">Car Listing</h1>
          <p className="car-hero__breadcrumb">
            Home <span> &gt; </span> Car Listing
          </p>
        </div>
      </div>

      {/* MAIN PAGE */}
      <div className="car-page">
        {/* SIDEBAR */}
        <aside className="car-filter">
          <h3 className="car-filter__title">Find Your Car</h3>

          <select
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="car-filter__select"
          >
            <option value="">Select Brand</option>
            {brands.map((u, i) => (
              <option key={i} value={u.brand}>
                {u.brand}
              </option>
            ))}
          </select>

          <select className="car-filter__select">
            <option>Select Fuel Type</option>
          </select>

          <button className="car-filter__btn">
            Search Car
          </button>
        </aside>

        {/* LISTINGS */}
        <section className="car-list">
          <h4 className="car-list__count">
            {vehicles.length} Listings
          </h4>

          <div className="car-list__grid">
            {vehicles.length > 0 ? (
              vehicles.map((car, i) => (
                <div className="car-card" key={i}>
                  <img
                    className="car-card__image"
                    src={
                      car.images && car.images.length > 0
                        ? `https://car-rental-01-9nu4.onrender.com/uploads/${car.images[0]}`
                        : "https://via.placeholder.com/300"
                    }
                    alt={car.title}
                  />

                  <div className="car-card__body">
                    <h3 className="car-card__title">
                      {car.title}
                    </h3>

                    <p className="car-card__price">
                      ₹{car.price} / Day
                    </p>

                    <Link
                      to={`/carview/${car._id}`}
                      className="car-card__btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No Vehicles Found</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}