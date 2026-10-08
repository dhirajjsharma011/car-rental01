import React, { useEffect, useState } from "react";
// import '../styling/vehicledata.css'
import {Link}  from 'react-router-dom'
export default function VehicleData() {

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://car-rental-01-9nu4.onrender.com/api/vehicles")
      .then(res => res.json())
      .then(data => {
        setVehicles(data.data || []);
      })
      .catch(err => console.log(err));
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      const res = await fetch(`https://car-rental-01-9nu4.onrender.com/api/vehicle/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (res.ok) {
        alert("Deleted Successfully");

        // UI update without reload
        setVehicles(prev => prev.filter(v => v._id !== id));
      } else {
        alert(data.message || "Delete failed");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/edit-vehicle/${id}`;
  };

  return (
    <div className="admin-vehicle">
      <h2>Manage Vehicles</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Fuel</th>
            <th>Seats</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.length > 0 ? (
            vehicles.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.fuel}</td>
                <td>{item.seats}</td>

              
                <td>
                  <button onClick={() => handleEdit(item._id)}>
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Vehicles Found</td>
            </tr>
          )}
        </tbody>
      </table>

      <br />
      <br />

      <Link to={'/vehicles'} className="vehicles-style"> Go back</Link>
    </div>
  );
}