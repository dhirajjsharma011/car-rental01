const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

console.log("JWT_KEY VALUE:", process.env.JWT_KEY);

const app = express();

// DB connection
const MongoDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const carbrand = require("./routes/carbrand");
const vehicleRoutes = require("./routes/vehicleRoute");
// const bookingRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", authRoutes);
app.use("/api", carbrand);
app.use("/api", vehicleRoutes);
// app.use("/api", bookingRoutes);

// Database connection
MongoDB();

// Server
const port = process.env.PORT || 1175;

app.listen(port, () => {
  console.log("Server running on", port);
});