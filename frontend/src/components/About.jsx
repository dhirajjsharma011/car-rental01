import React, { useState } from "react";
import "../styling/About.css";
import axios from "axios";

export default function About() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1175/api/subscribe",
        { email }
      );

      console.log(res.data);

      alert(res.data.message || "Subscribed successfully!");

      setEmail("");
    } catch (err) {
      console.log("Subscribe Error:", err);

      alert(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="abp-main-wrapper">

      {/* =========================
          TOP BANNER
      ========================== */}
      <section className="abp-banner-section">
        <div className="abp-banner-overlay">
          <div className="abp-banner-content">
            <span>WELCOME TO RENTCAR</span>

            <h1>About Us</h1>

            <p>
              Home <span>›</span> About Us
            </p>
          </div>
        </div>
      </section>


      {/* =========================
          ABOUT CONTENT
      ========================== */}
      <section className="abp-content-section">

        <div className="abp-content-inner">

          <div className="abp-small-title">
            ABOUT OUR COMPANY
          </div>

          <h2>
            We make car rentals
            <span> simple, comfortable & affordable.</span>
          </h2>

          <p>
            At RentCar, we make your journey easier by providing
            reliable, comfortable and affordable cars for every
            type of trip. Whether you are travelling for business,
            vacation or simply need a car for your daily needs,
            we have the right vehicle for you.
          </p>

          <p>
            Our goal is to provide a smooth and hassle-free rental
            experience. Choose your favourite car, select your
            dates and enjoy your journey with confidence.
          </p>

          <div className="abp-features">

            <div className="abp-feature-box">
              <div className="abp-feature-icon">🚗</div>
              <div>
                <h3>Wide Range of Cars</h3>
                <p>
                  Choose from a variety of comfortable and reliable
                  vehicles.
                </p>
              </div>
            </div>

            <div className="abp-feature-box">
              <div className="abp-feature-icon">💰</div>
              <div>
                <h3>Affordable Prices</h3>
                <p>
                  Enjoy competitive prices with no unnecessary hassle.
                </p>
              </div>
            </div>

            <div className="abp-feature-box">
              <div className="abp-feature-icon">🛡️</div>
              <div>
                <h3>Safe & Reliable</h3>
                <p>
                  We focus on providing a safe and dependable rental
                  experience.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================== */}
      <footer className="abp-footer">

        <div className="abp-footer-container">

          {/* LEFT */}
          <div className="abp-footer-column abp-footer-about">

            <h4>ABOUT US</h4>

            <div className="abp-footer-line"></div>

            <ul>
              <li>› About Us</li>
              <li>› FAQs</li>
              <li>› Privacy</li>
              <li>› Terms of use</li>
              <li>› Admin Login</li>
            </ul>

          </div>


          {/* CENTER */}
          <div className="abp-footer-column">

            <h4>CONTACT US</h4>

            <div className="abp-footer-line"></div>

            <p className="abp-contact-item">
              📍 New Delhi, India
            </p>

            <p className="abp-contact-item">
              📞 +91 98765 43210
            </p>

            <p className="abp-contact-item">
              ✉️ info@rentcar.com
            </p>

          </div>


          {/* RIGHT / NEWSLETTER */}
          <div className="abp-footer-column abp-newsletter">

            <h4>SUBSCRIBE NEWSLETTER</h4>

            <div className="abp-footer-line"></div>

            <p>
              Subscribe to our newsletter and get the latest
              deals and auto news directly in your inbox.
            </p>

            <div className="newsletter-form">
              <br />

              <input
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubscribe();
                  }
                }}
              />

              <button
                type="button"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>

            </div>

            <p className="note">
              * We send great deals and latest auto news every week.
            </p>

          </div>

        </div>


        {/* COPYRIGHT */}
        <div className="abp-footer-bottom">
          <p>
            © 2026 RentCar. All Rights Reserved.
          </p>
        </div>

      </footer>

    </div>
  );
}

