import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styling/PostVehicles.css";

export default function PostVehicle() {

  const [form, setForm] = useState({
    title: "",
    brand: "",
    overview: "",
    price: "",
    fuel: "",
    year: "",
    seats: "",
    accessories: []
  });

  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  // =====================================================
  // HANDLE ACCESSORIES
  // =====================================================

  const handleAccessoryChange = (e) => {

    const { value, checked } = e.target;

    if (checked) {

      setForm((prev) => ({
        ...prev,
        accessories: [
          ...prev.accessories,
          value
        ]
      }));

    } else {

      setForm((prev) => ({
        ...prev,
        accessories: prev.accessories.filter(
          (item) => item !== value
        )
      }));

    }
  };


  // =====================================================
  // HANDLE IMAGE CHANGE
  // =====================================================

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImages((prev) => {

      if (prev.length >= 3) {
        alert("Maximum 3 images allowed");
        return prev;
      }

      return [...prev, file];

    });

    // Same file ko dobara select karne ke liye
    e.target.value = "";
  };


  // =====================================================
  // GET BRANDS
  // =====================================================

  useEffect(() => {

    fetch(
      "https://car-rental-01-9nu4.onrender.com/api/brands"
    )
      .then((res) => res.json())
      .then((data) => {

        setBrands(data.data || []);

      })
      .catch((err) => {

        console.log("BRAND ERROR:", err);

      });

  }, []);


  // =====================================================
  // SUBMIT VEHICLE
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // Basic validation
      if (!form.title || !form.brand || !form.price) {

        alert(
          "Title, Brand and Price are required"
        );

        return;
      }


      const formData = new FormData();


      // =================================================
      // ADD FORM FIELDS
      // =================================================

      formData.append("title", form.title);
      formData.append("brand", form.brand);
      formData.append("overview", form.overview);
      formData.append("price", form.price);
      formData.append("fuel", form.fuel);
      formData.append("year", form.year);
      formData.append("seats", form.seats);


      // =================================================
      // ADD ACCESSORIES
      // =================================================

      form.accessories.forEach((accessory) => {

        formData.append(
          "accessories",
          accessory
        );

      });


      // =================================================
      // ADD IMAGES
      // =================================================

      images.forEach((img) => {

        formData.append(
          "images",
          img
        );

      });


      // =================================================
      // API
      // =================================================

      const res = await fetch(
        "https://car-rental-01-9nu4.onrender.com/api/vehicle",
        {
          method: "POST",
          body: formData
        }
      );


      const data = await res.json();


      if (!res.ok) {

        console.log(data);

        throw new Error(
          data.message || "Error adding vehicle"
        );

      }


      // =================================================
      // SUCCESS
      // =================================================

      alert(
        "Vehicle Added Successfully"
      );


      // Reset form
      setForm({
        title: "",
        brand: "",
        overview: "",
        price: "",
        fuel: "",
        year: "",
        seats: "",
        accessories: []
      });


      setImages([]);


    } catch (err) {

      console.log(
        "FRONTEND ERROR:",
        err
      );

      alert(err.message);

    }

  };


  return (

    <div className="pv-container">

      <h2 className="pv-title">
        Post A Vehicle
      </h2>


      <div className="pv-box">


        {/* =================================================
            TITLE
        ================================================= */}

        <input
          name="title"
          placeholder="Vehicle Title"
          value={form.title}
          onChange={handleChange}
        />


        {/* =================================================
            BRAND
        ================================================= */}

        <select
          name="brand"
          value={form.brand}
          onChange={handleChange}
        >

          <option value="">
            Select Brand
          </option>

          {brands.map((b, i) => (

            <option
              key={i}
              value={b.brand}
            >
              {b.brand}
            </option>

          ))}

        </select>


        {/* =================================================
            OVERVIEW
        ================================================= */}

        <textarea
          name="overview"
          placeholder="Overview"
          value={form.overview}
          onChange={handleChange}
        />


        {/* =================================================
            PRICE
        ================================================= */}

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />


        {/* =================================================
            FUEL
        ================================================= */}

        <select
          name="fuel"
          value={form.fuel}
          onChange={handleChange}
        >

          <option value="">
            Select Fuel
          </option>

          <option value="Petrol">
            Petrol
          </option>

          <option value="Diesel">
            Diesel
          </option>

        </select>


        {/* =================================================
            YEAR
        ================================================= */}

        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />


        {/* =================================================
            SEATS
        ================================================= */}

        <input
          name="seats"
          type="number"
          placeholder="Seats"
          value={form.seats}
          onChange={handleChange}
        />


        {/* =================================================
            ACCESSORIES
        ================================================= */}

        <div className="accessories-box">

          <h4>
            Select Accessories
          </h4>


          <label>
            <input
              type="checkbox"
              value="Air Conditioner"
              checked={form.accessories.includes(
                "Air Conditioner"
              )}
              onChange={handleAccessoryChange}
            />

            Air Conditioner
          </label>


          <label>
            <input
              type="checkbox"
              value="Power Steering"
              checked={form.accessories.includes(
                "Power Steering"
              )}
              onChange={handleAccessoryChange}
            />

            Power Steering
          </label>


          <label>
            <input
              type="checkbox"
              value="Power Windows"
              checked={form.accessories.includes(
                "Power Windows"
              )}
              onChange={handleAccessoryChange}
            />

            Power Windows
          </label>


          <label>
            <input
              type="checkbox"
              value="Central Locking"
              checked={form.accessories.includes(
                "Central Locking"
              )}
              onChange={handleAccessoryChange}
            />

            Central Locking
          </label>


          <label>
            <input
              type="checkbox"
              value="ABS"
              checked={form.accessories.includes(
                "ABS"
              )}
              onChange={handleAccessoryChange}
            />

            ABS
          </label>


          <label>
            <input
              type="checkbox"
              value="Airbags"
              checked={form.accessories.includes(
                "Airbags"
              )}
              onChange={handleAccessoryChange}
            />

            Airbags
          </label>


          <label>
            <input
              type="checkbox"
              value="Bluetooth"
              checked={form.accessories.includes(
                "Bluetooth"
              )}
              onChange={handleAccessoryChange}
            />

            Bluetooth
          </label>


          <label>
            <input
              type="checkbox"
              value="GPS"
              checked={form.accessories.includes(
                "GPS"
              )}
              onChange={handleAccessoryChange}
            />

            GPS
          </label>


          <label>
            <input
              type="checkbox"
              value="Music System"
              checked={form.accessories.includes(
                "Music System"
              )}
              onChange={handleAccessoryChange}
            />

            Music System
          </label>


          <label>
            <input
              type="checkbox"
              value="Sunroof"
              checked={form.accessories.includes(
                "Sunroof"
              )}
              onChange={handleAccessoryChange}
            />

            Sunroof
          </label>

        </div>


        {/* =================================================
            IMAGES
        ================================================= */}

        <h4>
          Vehicle Images
        </h4>


        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
        />


        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
        />


        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
        />


        {images.length > 0 && (

          <div>

            <p>
              {images.length} image(s) selected
            </p>

          </div>

        )}


        {/* =================================================
            SAVE BUTTON
        ================================================= */}

        <button
          onClick={handleSubmit}
        >
          Save
        </button>


        {/* =================================================
            MANAGE VEHICLES
        ================================================= */}

        <Link
          to="/manage-vehicles"
          className="adminvehicle"
        >
          Show Manage Vehicles
        </Link>


      </div>

    </div>

  );

}
