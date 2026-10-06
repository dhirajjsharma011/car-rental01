import React, { useState } from "react";
import "../styling/contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("https://car-rental-01-9nu4.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      alert(data.message);

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="cnt-pg-container">

      {/* HERO SECTION */}
      <section className="cnt-hero-wrapper">
        <div className="cnt-hero-backdrop"></div>

        <div className="cnt-hero-body">
          <span className="cnt-hero-badge">GET IN TOUCH</span>
          <h1 className="cnt-hero-title">
            Contact <strong className="cnt-hero-highlight">Us</strong>
          </h1>
          <p className="cnt-hero-subtitle">
            We're here to help you find the perfect ride.
          </p>

          <div className="cnt-hero-crumbs">
            Home <b className="cnt-crumb-sep">›</b> Contact Us
          </div>
        </div>
      </section>

      {/* CONTACT MAIN SECTION */}
      <section className="cnt-main-section">

        <div className="cnt-layout-grid">

          {/* LEFT: FORM CARD */}
          <div className="cnt-form-card">

            <div className="cnt-section-pill">
              SEND US A MESSAGE
            </div>

            <h2 className="cnt-heading-primary">
              Let's start a <span className="cnt-text-accent">conversation.</span>
            </h2>

            <p className="cnt-form-lead">
              Have questions about our vehicles, pricing or bookings?
              Fill out the form and we'll get back to you shortly.
            </p>

            <div className="cnt-form-fields">

              <div className="cnt-input-row">

                <div className="cnt-field-box">
                  <label className="cnt-field-label">Full Name</label>

                  <div className="cnt-input-pill">
                    <span className="cnt-input-icon">👤</span>

                    <input
                      type="text"
                      name="name"
                      className="cnt-control-input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="cnt-field-box">
                  <label className="cnt-field-label">Email Address</label>

                  <div className="cnt-input-pill">
                    <span className="cnt-input-icon">✉</span>

                    <input
                      type="email"
                      name="email"
                      className="cnt-control-input"
                      placeholder="Your email address"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

              </div>

              <div className="cnt-field-box">
                <label className="cnt-field-label">Phone Number</label>

                <div className="cnt-input-pill">
                  <span className="cnt-input-icon">☎</span>

                  <input
                    type="text"
                    name="phone"
                    className="cnt-control-input"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="cnt-field-box">
                <label className="cnt-field-label">Your Message</label>

                <div className="cnt-textarea-pill">
                  <span className="cnt-input-icon cnt-area-icon">💬</span>

                  <textarea
                    name="message"
                    className="cnt-control-textarea"
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <button
                type="button"
                className="cnt-action-btn"
                onClick={handleSubmit}
              >
                <span>Send Message</span>
                <b className="cnt-btn-arrow">→</b>
              </button>

            </div>

          </div>

          {/* RIGHT: INFO CARD */}
          <div className="cnt-info-card">

            <div className="cnt-info-header">
              <span className="cnt-info-pill">CONTACT INFORMATION</span>

              <h2 className="cnt-info-title">
                We're always
                <br />
                <strong className="cnt-info-bold">happy to help.</strong>
              </h2>

              <p className="cnt-info-desc">
                Whether you're looking for your next car rental
                or need assistance with an existing booking,
                our team is ready to help.
              </p>
            </div>

            <div className="cnt-info-stack">

              <div className="cnt-info-tile">
                <div className="cnt-tile-icon">
                  📍
                </div>

                <div className="cnt-tile-content">
                  <small className="cnt-tile-tag">OUR LOCATION</small>
                  <h4 className="cnt-tile-heading">New Delhi, India</h4>
                  <p className="cnt-tile-subtext">Available across Delhi NCR</p>
                </div>
              </div>

              <div className="cnt-info-tile">
                <div className="cnt-tile-icon">
                  ✉
                </div>

                <div className="cnt-tile-content">
                  <small className="cnt-tile-tag">EMAIL US</small>
                  <h4 className="cnt-tile-heading">support@rentcar.com</h4>
                  <p className="cnt-tile-subtext">We'll reply within 24 hours</p>
                </div>
              </div>

              <div className="cnt-info-tile">
                <div className="cnt-tile-icon">
                  ☎
                </div>

                <div className="cnt-tile-content">
                  <small className="cnt-tile-tag">CALL US</small>
                  <h4 className="cnt-tile-heading">+91 98765 43210</h4>
                  <p className="cnt-tile-subtext">Mon - Sat, 9:00 AM - 7:00 PM</p>
                </div>
              </div>

            </div>

            <div className="cnt-social-footer">
              <span className="cnt-social-label">FOLLOW US</span>

              <div className="cnt-social-cluster">
                <div className="cnt-social-item">f</div>
                <div className="cnt-social-item">𝕏</div>
                <div className="cnt-social-item">in</div>
                <div className="cnt-social-item">◎</div>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}