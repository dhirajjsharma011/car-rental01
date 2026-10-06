import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../Admin/admin-stylings/admin.css";
import "./admin-stylings/dashboard.css";

import {
  FaUsers,
  FaCar,
  FaCalendarCheck,
  FaTags,
  FaEnvelope,
  FaComments
} from "react-icons/fa";

const API = "https://car-rental-01-9nu4.onrender.com/api";

export default function Dashboard() {

  const navigate = useNavigate();

  const [regUsers, setRegUsers] = useState(0);
  const [latestVehicle, setLatestVehicle] = useState("No Vehicle");
  const [totalBooking, setTotalBooking] = useState(0);
  const [listedBrands, setListedBrands] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const [testimonials, setTestimonials] = useState(0);


  useEffect(() => {

    // USERS
    axios.get(`${API}/reguser`)
      .then((res) => {
        const users = res.data?.data || [];
        setRegUsers(users.length);
      })
      .catch((err) => {
        console.log("Users API Error:", err);
      });


    // VEHICLES
    axios.get(`${API}/vehicles`)
      .then((res) => {

        const vehicles = res.data?.data || [];

        if (vehicles.length > 0) {

          const sortedVehicles = [...vehicles].sort(
            (a, b) =>
              new Date(b.createdAt || 0) -
              new Date(a.createdAt || 0)
          );

          setLatestVehicle(
            sortedVehicles[0]?.title || "No Vehicle"
          );

        } else {
          setLatestVehicle("No Vehicle");
        }

      })
      .catch((err) => {
        console.log("Vehicles API Error:", err);
      });


    // BOOKINGS
    axios.get(`${API}/booking`)
      .then((res) => {

        const bookings = res.data?.bookings || [];

        setTotalBooking(bookings.length);

      })
      .catch((err) => {
        console.log("Bookings API Error:", err);
      });


    // BRANDS
    axios.get(`${API}/brands`)
      .then((res) => {

        const brands = res.data?.data || [];

        setListedBrands(brands.length);

      })
      .catch((err) => {
        console.log("Brands API Error:", err);
      });


    // SUBSCRIBERS
    axios.get(`${API}/subscribers`)
      .then((res) => {

        const subscribers = res.data?.data || [];

        setSubscribers(subscribers.length);

      })
      .catch((err) => {
        console.log("Subscribers API Error:", err);
      });


    // TESTIMONIALS
    axios.get(`${API}/gettestimonials`)
      .then((res) => {

        const testimonials = res.data || [];

        setTestimonials(testimonials.length);

      })
      .catch((err) => {
        console.log("Testimonials API Error:", err);
      });

  }, []);


  return (

    <div className="dashboard-container">

      <div className="dashboard-header">

        <h2>Admin Dashboard</h2>

        <p>
          Welcome to RentCar Admin Panel
        </p>

      </div>


      <div className="dashboard-grid">


        {/* USERS */}

        <div
          className="ad-box clickable-card"
          onClick={() => navigate("/regusers")}
        >

          <FaUsers className="dashboard-icon" />

          <h5>
            {regUsers}
          </h5>

          <p>
            REG USERS
          </p>

          <span className="view-text">
            View Users →
          </span>

        </div>


        {/* VEHICLES */}

        <div
          className="ad-box clickable-card"
          onClick={() => navigate("/vehicles")}
        >

          <FaCar className="dashboard-icon" />

          <h5
            className="vehicle-name"
            title={latestVehicle}
          >
            {latestVehicle}
          </h5>

          <p>
            LAST VEHICLE
          </p>

          <span className="view-text">
            View Vehicles →
          </span>

        </div>


        {/* BOOKINGS */}

        <div
          className="ad-box clickable-card"
          onClick={() => navigate("/booking")}
        >

          <FaCalendarCheck className="dashboard-icon" />

          <h5>
            {totalBooking}
          </h5>

          <p>
            TOTAL BOOKING
          </p>

          <span className="view-text">
            View Bookings →
          </span>

        </div>


        {/* BRANDS */}

        <div
          className="ad-box clickable-card"
          onClick={() => navigate("/brand")}
        >

          <FaTags className="dashboard-icon" />

          <h5>
            {listedBrands}
          </h5>

          <p>
            LISTED BRANDS
          </p>

          <span className="view-text">
            View Brands →
          </span>

        </div>


        {/* SUBSCRIBERS */}

        <div
          className="ad-box clickable-card"
          onClick={() => navigate("/managesubscribers")}
        >

          <FaEnvelope className="dashboard-icon" />

          <h5>
            {subscribers}
          </h5>

          <p>
            SUBSCRIBERS
          </p>

          <span className="view-text">
            View Subscribers →
          </span>

        </div>


        {/* TESTIMONIALS */}

        <div
          className="ad-box clickable-card"
          onClick={() => navigate("/testimonials")}
        >

          <FaComments className="dashboard-icon" />

          <h5>
            {testimonials}
          </h5>

          <p>
            TESTIMONIALS
          </p>

          <span className="view-text">
            View Testimonials →
          </span>

        </div>


      </div>

    </div>
  );
}
