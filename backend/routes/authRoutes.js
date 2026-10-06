const express = require("express");

const {
  Register,
  login,
  adminLogin,
  getAllUsers,
  deleteUsers,
  changePassword,
  Profile,
  getProfile,
  getUserById,
  updateUser,
  createBooking,
  getBookings,
  getUserBookings,
  bookingupdate,
  createBrand,
  getBrands,
  deleteBrands,
  contact,
  getContact,
  getAllSubscribers,
  addSubscriber,
  deleteSubscriber,
  addTestimonial,
  getTestimonials
} = require("../controller/authController");

const {
  createVehicle,
  getVehicles,
  getVehicleById
} = require("../controller/vehicleController");

const router = express.Router();


// =========================
// AUTH
// =========================

router.post("/register", Register);

router.post("/login", login);

router.post("/adminlogin", adminLogin);


// =========================
// USERS
// =========================

router.get("/reguser", getAllUsers);

router.delete("/reguser/:id", deleteUsers);

router.put("/change-password/:id", changePassword);

router.put("/profile/:id", Profile);

router.get("/profile/:id", getProfile);

// USER UPDATE
router.get("/reguser/:id", getUserById);
router.put("/reguser/:id", updateUser);


// =========================
// VEHICLES
// =========================

router.post("/vehicles", createVehicle);

router.get("/vehicles", getVehicles);

router.get("/vehicles/:id", getVehicleById);


// =========================
// BOOKINGS
// =========================

// Create booking
router.post("/createbooking", createBooking);

// Get all bookings - Admin
router.get("/booking", getBookings);

// Get user's bookings
router.get("/my-bookings/:userId", getUserBookings);

// Update booking status
router.put("/booking-status/:id", bookingupdate);


// =========================
// BRANDS
// =========================

router.post("/createbrand", createBrand);

router.get("/brands", getBrands);

router.delete("/brands/:id", deleteBrands);


// =========================
// CONTACT
// =========================

router.post("/contact", contact);

router.get("/getcontact", getContact);


// =========================
// SUBSCRIBERS
// =========================

router.get("/subscribers", getAllSubscribers);

router.post("/subscribe", addSubscriber);

router.delete("/subscriber/:id", deleteSubscriber);


// =========================
// TESTIMONIALS
// =========================

router.post("/addtestimonial", addTestimonial);

router.get("/gettestimonials", getTestimonials);


module.exports = router;