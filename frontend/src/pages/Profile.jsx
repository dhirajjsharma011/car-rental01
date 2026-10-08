import React from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  FaUserCog, 
  FaLock, 
  FaCar, 
  FaPenFancy, 
  FaStar, 
  FaSignOutAlt 
} from "react-icons/fa";

import "../styling/Profile.css"; 

export default function Profile() {
  const userName = localStorage.getItem("name") || "Guest User";

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">

        {/* PROFILE HEADER */}
        <header className="profile-header-new">
          <div className="header-content">
            <div className="avatar-wrapper">
              <img
                src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
                alt="User Profile"
                className="header-avatar"
              />
              <div className="online-status"></div>
            </div>
            
            <div className="user-text-info">
              <span className="welcome-tag">Welcome Back,</span>
              <h1 className="user-display-name">{userName}</h1>
              <p className="user-email-placeholder">Manage your details & activities</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="edit-profile-btn"><Link to={"/profile/profilesettings"}>Edit Profile</Link></button>
          </div>
        </header>

        {/* PROFILE BODY */}
        <div className="profile-body-layout">
          <aside className="profile-sidebar-new">
            <div className="sidebar-menu-wrapper">
              
              <div className="menu-group">
                <h4 className="menu-group-title">Account Settings</h4>
                <nav className="sidebar-nav-new">
                  <Link to="/profile/profilesettings" className="nav-item-new active">
                    <FaUserCog className="nav-icon-fa" />
                    <span className="nav-label">Profile Information</span>
                  </Link>
                  <Link to="/profile/updatepassword" className="nav-item-new">
                    <FaLock className="nav-icon-fa" />
                    <span className="nav-label">Security</span>
                  </Link>
                </nav>
              </div>

              <div className="menu-group">
                <h4 className="menu-group-title">My Activity</h4>
                <nav className="sidebar-nav-new">
                  <Link to="/profile/mybooking" className="nav-item-new">
                    <FaCar className="nav-icon-fa" />
                    <span className="nav-label">Bookings</span>
                  </Link>
                  <Link to="/profile/posttestimonial" className="nav-item-new">
                    <FaPenFancy className="nav-icon-fa" />
                    <span className="nav-label">Write Review</span>
                  </Link>
                  <Link to="/profile/mytestimonial" className="nav-item-new">
                    <FaStar className="nav-icon-fa" />
                    <span className="nav-label">My Reviews</span>
                  </Link>
                </nav>
              </div>

              <div className="menu-group logout-group">
                <nav className="sidebar-nav-new">
                  <Link to="/" className="nav-item-new logout-item">
                    <FaSignOutAlt className="nav-icon-fa" />
                    <span className="nav-label">Sign Out</span>
                  </Link>
                </nav>
              </div>

            </div>
          </aside>

          <main className="profile-content-new">
            <div className="content-card">
              <Outlet />
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}