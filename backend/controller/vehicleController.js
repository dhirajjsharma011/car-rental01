const Vehicle = require("../model/vehicles");
const fs = require("fs");
const path = require("path");


// =====================================================
// CREATE VEHICLE
// =====================================================
exports.createVehicle = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      title,
      brand,
      overview,
      price,
      fuel,
      year,
      seats,
      accessories
    } = req.body;

    // Validation
    if (!title || !brand || !price) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    // Images
    const imagePath =
      req.files && Array.isArray(req.files)
        ? req.files.map((file) => file.filename)
        : [];

    // Accessories
    const accessoriesData = accessories
      ? Array.isArray(accessories)
        ? accessories
        : [accessories]
      : [];

    // Create vehicle
    const newVehicle = new Vehicle({
      title,
      brand,
      overview,
      price,
      fuel,
      year,
      seats,
      accessories: accessoriesData,
      images: imagePath
    });

    const savedVehicle = await newVehicle.save();

    return res.status(201).json({
      success: true,
      message: "Vehicle Added Successfully",
      data: savedVehicle
    });

  } catch (err) {
    console.error("CREATE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



// =====================================================
// GET ALL VEHICLES
// =====================================================
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    return res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });

  } catch (err) {
    console.error("FETCH ALL ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error fetching vehicles"
    });
  }
};



// =====================================================
// GET VEHICLE BY ID
// =====================================================
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: vehicle
    });

  } catch (err) {
    console.error("FETCH BY ID ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error fetching vehicle"
    });
  }
};



// =====================================================
// UPDATE VEHICLE
// =====================================================
exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      brand,
      overview,
      price,
      fuel,
      year,
      seats,
      accessories
    } = req.body;

    console.log("UPDATE BODY:", req.body);
    console.log("UPDATE FILES:", req.files);

    // Find vehicle
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    // =================================================
    // UPDATE BASIC DETAILS
    // =================================================

    if (title !== undefined) {
      vehicle.title = title;
    }

    if (brand !== undefined) {
      vehicle.brand = brand;
    }

    if (overview !== undefined) {
      vehicle.overview = overview;
    }

    if (price !== undefined) {
      vehicle.price = price;
    }

    if (fuel !== undefined) {
      vehicle.fuel = fuel;
    }

    if (year !== undefined) {
      vehicle.year = year;
    }

    if (seats !== undefined) {
      vehicle.seats = seats;
    }


    // =================================================
    // UPDATE ACCESSORIES
    // =================================================

    if (accessories !== undefined) {
      vehicle.accessories = Array.isArray(accessories)
        ? accessories
        : [accessories];
    }


    // =================================================
    // UPDATE IMAGES
    // =================================================

    const newImages =
      req.files && Array.isArray(req.files)
        ? req.files.map((file) => file.filename)
        : [];


    // Agar new images select ki hain
    if (newImages.length > 0) {

      // Delete old images from uploads folder
      if (vehicle.images && vehicle.images.length > 0) {

        vehicle.images.forEach((image) => {

          const imagePath = path.join(
            __dirname,
            "../uploads",
            image
          );

          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }

        });
      }

      // Save new images
      vehicle.images = newImages;
    }


    // Save updated vehicle
    const updatedVehicle = await vehicle.save();

    return res.status(200).json({
      success: true,
      message: "Vehicle Updated Successfully",
      data: updatedVehicle
    });

  } catch (err) {
    console.error("UPDATE VEHICLE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



// =====================================================
// DELETE VEHICLE
// =====================================================
exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    // Find vehicle
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }


    // =================================================
    // DELETE IMAGES FROM UPLOADS FOLDER
    // =================================================

    if (vehicle.images && vehicle.images.length > 0) {

      vehicle.images.forEach((image) => {

        const imagePath = path.join(
          __dirname,
          "../uploads",
          image
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

      });
    }


    // =================================================
    // DELETE VEHICLE FROM MONGODB
    // =================================================

    await Vehicle.findByIdAndDelete(id);


    return res.status(200).json({
      success: true,
      message: "Vehicle Deleted Successfully"
    });

  } catch (err) {
    console.error("DELETE VEHICLE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};