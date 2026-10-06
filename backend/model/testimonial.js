const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  message: String,
  rating: Number,
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Testimonial", testimonialSchema);