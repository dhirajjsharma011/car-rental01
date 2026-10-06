import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styling/Testimonial.css";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Backend se saare testimonials fetch karna
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:1175/api/gettestimonials");
        // Check agar response array hai
        if (Array.isArray(response.data)) {
          setTestimonials(response.data);
        } else if (response.data.testimonials) {
          setTestimonials(response.data.testimonials);
        }
      } catch (err) {
        console.error("Testimonials fetch karne me error aaya:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // 2. Auto Slider Interval (Tabhi chalega jab testimonials data ho)
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [testimonials]);

  // Loading State
  if (loading) {
    return (
      <div className="testimonial-container">
        <div className="card loading-card">
          <p>Loading user testimonials...</p>
        </div>
      </div>
    );
  }

  // No Data / Empty State
  if (testimonials.length === 0) {
    return (
      <div className="testimonial-container">
        <div className="card empty-card">
          <p>Abhi koi testimonial available nahi hai.</p>
        </div>
      </div>
    );
  }

  // Current active testimonial data
  const current = testimonials[index];

  return (
    <div className="testimonial-container">
      <div className="card">
        {/* Star Rating Display */}
        <div className="stars">
          {"⭐".repeat(current.rating || 5)}
        </div>

        {/* Message / Review */}
        <p className="review">“{current.message || current.review}”</p>

        {/* User Details */}
        <div className="user">
          <h4>{current.name || "Anonymous User"}</h4>
          {current.car && <span>🚗 {current.car}</span>}
        </div>
      </div>

      {/* Dots Navigation */}
      {testimonials.length > 1 && (
        <div className="dots">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonial;