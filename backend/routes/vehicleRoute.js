const express = require("express");

const router = express.Router();

const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
} = require("../controller/vehicleController");

const upload = require("../middleware/upload");


// =====================================================
// CREATE VEHICLE
// =====================================================

router.post(
  "/vehicle",
  upload.array("images", 3),
  createVehicle
);


// =====================================================
// GET ALL VEHICLES
// =====================================================

router.get(
  "/vehicles",
  getVehicles
);


// =====================================================
// GET VEHICLE BY ID
// =====================================================

router.get(
  "/vehicle/:id",
  getVehicleById
);


// =====================================================
// UPDATE VEHICLE
// =====================================================

router.put(
  "/vehicle/:id",
  upload.array("images", 3),
  updateVehicle
);


// =====================================================
// DELETE VEHICLE
// =====================================================

router.delete(
  "/vehicle/:id",
  deleteVehicle
);


module.exports = router;