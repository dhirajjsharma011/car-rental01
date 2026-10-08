import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function EditVehicles() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    brand: "",
    overview: "",
    price: "",
    fuel: "",
    year: "",
    seats: ""
  });

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get vehicle data
  useEffect(() => {
    fetch(`https://car-rental-01-9nu4.onrender.com/api/vehicles`)
      .then((res) => res.json())
      .then((data) => {
        const vehicle = (data.data || []).find(
          (item) => item._id === id
        );

        if (!vehicle) {
          alert("Vehicle not found");
          navigate("/manage-vehicles");
          return;
        }

        setForm({
          title: vehicle.title || "",
          brand: vehicle.brand || "",
          overview: vehicle.overview || "",
          price: vehicle.price || "",
          fuel: vehicle.fuel || "",
          year: vehicle.year || "",
          seats: vehicle.seats || ""
        });

        setOldImages(vehicle.images || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("GET VEHICLE ERROR:", err);
        alert("Error loading vehicle");
        navigate("/manage-vehicles");
      });
  }, [id, navigate]);

  // Get brands
  useEffect(() => {
    fetch("https://car-rental-01-9nu4.onrender.com/api/brand")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data || []);
      })
      .catch((err) => console.log("BRAND ERROR:", err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((image) => {
        formData.append("images", image);
      });

      const res = await fetch(
        `https://car-rental-01-9nu4.onrender.com/api/vehicle/${id}`,
        {
          method: "PUT",
          body: formData
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      alert("Vehicle Updated Successfully");

      navigate("/manage-vehicles");

    } catch (error) {
      console.log("UPDATE ERROR:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return <h2>Loading Vehicle...</h2>;
  }

  return (
    <div className="pv-container">

      <h2 className="pv-title">Edit Vehicle</h2>

      <div className="pv-box">

        <input
          name="title"
          placeholder="Vehicle Title"
          value={form.title}
          onChange={handleChange}
        />

        <select
          name="brand"
          value={form.brand}
          onChange={handleChange}
        >
          <option value="">Select Brand</option>

          {brands.map((b, i) => (
            <option key={i} value={b.brand}>
              {b.brand}
            </option>
          ))}
        </select>

        <textarea
          name="overview"
          placeholder="Overview"
          value={form.overview}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <select
          name="fuel"
          value={form.fuel}
          onChange={handleChange}
        >
          <option value="">Select Fuel</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>

        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />

        <input
          name="seats"
          type="number"
          placeholder="Seats"
          value={form.seats}
          onChange={handleChange}
        />

        {/* Existing Images */}

        <h4>Current Images</h4>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {oldImages.length > 0 ? (
            oldImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="vehicle"
                style={{
                  width: "120px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px"
                }}
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>

        <br />

        {/* New Images */}

        <label>
          Replace Images
        </label>

        <input
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
        />

        {images.length > 0 && (
          <p>{images.length} new image(s) selected</p>
        )}

        <button onClick={handleSubmit}>
          Update Vehicle
        </button>

        <button
          type="button"
          onClick={() => navigate("/manage-vehicles")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}