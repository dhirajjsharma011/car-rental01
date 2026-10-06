import React, { useEffect, useState } from "react";

export default function AllVehicle() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://car-rental-01-9nu4.onrender.com/api/vehicle")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Cars</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {vehicles.map((v) => (
          <div key={v._id} style={card}>
            <img
              src={`https://car-rental-01-9nu4.onrender.com/uploads/${v.images[0]}`}
              alt=""
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{v.title}</h3>
            <p>₹{v.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const card = {
  width: "250px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "10px"
};