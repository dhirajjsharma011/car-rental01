const Vehicle = require('../model/vehicles');

exports.createVehicle = async (req, res) => {
  try {
    console.log("BODY:", req.body);

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

    // VALIDATION
    if (!title || !brand || !price) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const imagePath = req.files && Array.isArray(req.files)
      ? req.files.map(file => file.filename)
      : [];

    const accessoriesData = accessories
      ? (Array.isArray(accessories) ? accessories : [accessories])
      : [];

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