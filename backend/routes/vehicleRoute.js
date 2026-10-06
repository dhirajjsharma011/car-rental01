const express = require("express");
const router = express.Router();

const { createVehicle, getVehicles } = require("../controller/vehicleController");

const upload = require('../middleware/upload')


router.post("/vehicle", upload.array("images", 3), createVehicle);

router.get("/vehicles",getVehicles)

module.exports = router;