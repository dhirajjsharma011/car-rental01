import React, { useState, useEffect } from "react";
import "../styling/PostVehicles.css"

export default function PostVehicles() {

  const [form, setForm] = useState({
    title: "",
    brand: "",
    overview: "",
    price: "",
    fuel: "",
    year: "",
    seats: "",
    accessories:[]
  });

  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ FIXED
  const handleFileChange = (e) => {
    setImages([...e.target.files]); 
  };

  useEffect(() => {
    fetch("https://car-rental-01-9nu4.onrender.com/api/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch("https://car-rental-01-9nu4.onrender.com/api/vehicle", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      

      if (!res.ok) {
        console.log(data);
        throw new Error(data.message || "Error");
      }

      alert("Vehicle Added Successfully");

      setForm({
        title: "",
        brand: "",
        overview: "",
        price: "",
        fuel: "",
        year: "",
        seats: ""
      });

      setImages([]);

    } catch (err) {
      console.log("FRONTEND ERROR:", err);
      alert(err.message);
    }
  };

  return (
    <div className="pv-container">
      <h2 className="pv-title">Post A Vehicle</h2>

      <div className="pv-box">

        <input name="title" placeholder="Vehicle Title" value={form.title} onChange={handleChange} />

        <select name="brand" value={form.brand} onChange={handleChange}>
          <option value="">Select Brand</option>
          {brands.map((u, i) => (
            <option key={i} value={u.brand}>{u.brand}</option>
          ))}
        </select>

        <textarea name="overview" placeholder="Overview" value={form.overview} onChange={handleChange}></textarea>

        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />

        <select name="fuel" value={form.fuel} onChange={handleChange}>
          <option value="">Select Fuel</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>

        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />

        <input name="seats" type="number" placeholder="Seats" value={form.seats} onChange={handleChange} />

        
        <input type="file" multiple onChange={handleFileChange} />
         <input type="file" multiple onChange={handleFileChange} />
          <input type="file" multiple onChange={handleFileChange} />

        <button onClick={handleSubmit}>Save</button>

      </div>

      <div className="pv-accessories">
  <p>Select Accessories:</p>

  {[
    "Air Conditioner",
    "Power Steering",
    "Bluetooth",
    "Parking Sensors",
    "Rear Camera",
    "Airbags"
  ].map((item, index) => (
    <label key={index} className="pv-checkbox">
      <input
        type="checkbox"
        value={item}
        onChange={(e) => {
          if (e.target.checked) {
            setForm({
              ...form,
              accessories: [...form.accessories, item]
            });
          } else {
            setForm({
              ...form,
              accessories: form.accessories.filter(a => a !== item)
            });
          }
        }}
      />
      {item}
    </label>
  ))}
</div>
    </div>
  );
}