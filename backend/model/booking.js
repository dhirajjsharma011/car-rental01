const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    user_name: {
      type: String,
      required: true,
      trim: true
    },

    car_name: {
      type: String,
      required: true,
      trim: true
    },

    from_date: {
      type: String,
      required: true
    },

    to_date: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);