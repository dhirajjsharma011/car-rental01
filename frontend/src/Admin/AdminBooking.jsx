import React, { useEffect, useState } from "react";
import "../Admin/admin-stylings/AdminBooking.css"

export default function AdminBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1175/api/booking")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings || []))
      .catch((err) => console.log(err));
  }, []);

  
  const handleStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:1175/api/booking-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Status Updated");

        // UI update
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id ? { ...b, status: status } : b
          )
        );
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="abk-wrapper">
      <h2 className="abk-title">All Bookings</h2>

      <div className="abk-table-box">
        <table className="abk-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Car</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b, i) => (
                <tr key={i}>
                  <td>{b.user_name}</td>
                  <td>{b.car_name}</td>
                  <td>{b.from_date}</td>
                  <td>{b.to_date}</td>

                  {/* STATUS */}
                  <td>{b.status || "Pending"}</td>

                  {/* ACTION BUTTONS */}
                  <td>
                    <button className="conf-ad"
                      onClick={() => handleStatus(b._id, "Confirmed")}
                      
                    >
                      Confirm
                    </button>

                    <button className="del-ad"
                      onClick={() => handleStatus(b._id, "Cancelled")}
                      
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ):(
              <tr>
                <td colSpan="6">No Bookings Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}