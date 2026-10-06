import React from "react";
import { Link, Outlet } from "react-router-dom";

import {
  FaTachometerAlt,
  FaCar,
  FaUsers,
  FaSignOutAlt,
  FaFileAlt
} from "react-icons/fa";

import { MdBrandingWatermark, MdContactPhone } from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";

export default function AdminLayout() {
  return (
    <div className="admin-container">

      <div className="sidebar">
        <h2 className="logo">Admin</h2>

        <ul>

          <Link to={'/admindash'}>
            <FaTachometerAlt /> Dashboard
          </Link>
          <br /><br /> <br />

          <Link to={'/brand'}>
            <MdBrandingWatermark /> Brands
          </Link>
          <br /><br /> <br />

          <Link to={'/vehicles'}>
            <FaCar /> Vehicles
          </Link>
          <br /><br /> <br />

          <Link to={'/booking'}>
            <BsCalendarCheck /> Bookings
          </Link>
          <br /><br /> <br />

          {/* <Link to={'/managetestimonials'}>
            <AiFillMessage /> Testimonials
          </Link>
          <br /><br /> <br /> */}
{/* 
          <Link to={'/managecquery'}>
            <MdContactPhone /> Contact Queries
          </Link>
          <br /><br /> <br /> */}

          <Link to={'/regusers'}>
            <FaUsers /> Users
          </Link>
          <br /><br /> <br />
{/* 
          <Link to={'/managepage'}>
            <FaFileAlt /> Pages
          </Link>
          <br /><br /> <br /> */}

          <Link to={'/updatecontact'}>
            <MdContactPhone /> Contact Info
          </Link>
          <br /><br /> <br />

          <Link to={'/managesubscribers'}>
            <FaUsers /> Subscribers
          </Link>
          <br /><br /> <br />

          <Link to={'/'}>
            <FaSignOutAlt /> Log Out
          </Link>

        </ul>
      </div>

      <Outlet />

    </div>
  );
}