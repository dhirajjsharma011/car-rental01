import React, { useEffect, useState } from "react";
import "../styling/MyBooking.css";

export default function MyBookings() {

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const userId = localStorage.getItem("userId");

    console.log("My Booking User ID:", userId);


    // User login nahi hai
    if (!userId) {

      console.log("User ID not found");

      setLoading(false);

      return;
    }


    fetch(
      `https://car-rental-01-9nu4.onrender.com/api/my-bookings/${userId}`
    )
      .then((res) => {

        console.log(
          "My Booking Status:",
          res.status
        );


        if (!res.ok) {

          throw new Error(
            `HTTP Error: ${res.status}`
          );

        }


        return res.json();

      })

      .then((data) => {

        console.log(
          "BOOKING API RESPONSE:",
          data
        );


        setBookings(
          data.bookings || []
        );


        setLoading(false);

      })

      .catch((error) => {

        console.log(
          "Booking Fetch Error:",
          error
        );


        setLoading(false);

      });

  }, []);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="booking-container">

        <h2 className="title">
          MY BOOKINGS
        </h2>

        <p>
          Loading bookings...
        </p>

      </div>
    );

  }


  // =========================
  // UI
  // =========================

  return (

    <div>

      <div className="booking-container">

        <h2 className="title">
          MY BOOKINGS
        </h2>


        {bookings.length > 0 ? (

          bookings.map((booking) => (

            <div
              className="booking-card"
              key={booking._id}
            >

              <div className="booking-details">

                <h3>
                  {booking.car_name}
                </h3>


                <p>
                  <strong>
                    Name:
                  </strong>{" "}
                  {booking.user_name}
                </p>


                <p>
                  <strong>
                    From Date:
                  </strong>{" "}
                  {booking.from_date}
                </p>


                <p>
                  <strong>
                    To Date:
                  </strong>{" "}
                  {booking.to_date}
                </p>

              </div>


              <div className="booking-right">

                <button
                  className="status-btn"
                >
                  {booking.status}
                </button>

              </div>

            </div>

          ))

        ) : (

          <p>
            No bookings found
          </p>

        )}

      </div>

    </div>

  );
}