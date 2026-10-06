const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../model/user");
const jwt = require("jsonwebtoken");
const Booking = require("../model/booking");
const Subscriber = require("../model/subscribers");
const Brand = require("../model/brand");
const Contact = require("../model/contact");
const Testimonial = require("../model/testimonial");


// =====================================================
// REGISTER
// =====================================================

exports.Register = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      password
    } = req.body;

    // Check required fields
    if (!name || !email || !contact || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Clean input
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanContact = contact.trim();

    // Check existing user
    const exist = await User.findOne({
      email: cleanEmail
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(
      password,
      11
    );

    // Create user
    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      contact: cleanContact,
      password: hashPassword,
      role: "user"
    });

    return res.status(201).json({
      success: true,
      message: "User signup successfully",
      user
    });

  } catch (err) {
    console.log("Register Error:", err);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// =====================================================
// LOGIN
// =====================================================

exports.login = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    // Find user
    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    console.log(
      "JWT_KEY VALUE:",
      process.env.JWT_KEY
    );

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_KEY,
      {
        expiresIn: "7d"
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token
    });

  } catch (err) {

    console.log("Login Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// =====================================================
// CHANGE PASSWORD
// =====================================================

exports.changePassword = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      oldPassword,
      newPassword
    } = req.body;

    // Find user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check old password
    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password is incorrect"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      11
    );

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (err) {

    console.log(
      "Change Password Error:",
      err
    );

    return res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};


// =====================================================
// UPDATE PROFILE
// =====================================================

exports.Profile = async (req, res) => {
  try {

    const { id } = req.params;

    console.log(
      "Profile ID:",
      id
    );

    const {
      name,
      email,
      contact,
      city,
      country,
      dob,
      address
    } = req.body;

    // Check user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Update
    const updatedUser =
      await User.findByIdAndUpdate(
        id,
        {
          name,
          email,
          city,
          country,
          dob,
          contact,
          address
        },
        {
          new: true,
          runValidators: true
        }
      );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });

  } catch (err) {

    console.log(
      "Profile Update Error:",
      err
    );

    return res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};


// =====================================================
// GET PROFILE
// =====================================================

exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (err) {

    console.log(
      "Get Profile Error:",
      err
    );

    return res.status(500).json({
      message: "Server error"
    });
  }
};

// GET SINGLE USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user
    });

  } catch (error) {
    console.log("Get User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      contact,
      dob,
      country,
      city,
      address
    } = req.body;

    console.log("Update User ID:", id);
    console.log("Update User Data:", req.body);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    // Check user exists
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check email already used by another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({
        email: email,
        _id: { $ne: id }
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists"
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        contact,
        dob,
        country,
        city,
        address
      },
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (error) {
    console.log("Update User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// =====================================================
// GET ALL USERS
// =====================================================

exports.getAllUsers = async (req, res) => {

  console.log("Get All Users API hit");

  try {

    const users = await User.find();

    return res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {

    console.log(
      "Get Users Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error fetching users"
    });
  }
};


// =====================================================
// CREATE BOOKING
// =====================================================

exports.createBooking = async (req, res) => {
  try {

    const {
      userId,
      user_name,
      car_name,
      from_date,
      to_date
    } = req.body;


    console.log(
      "Booking Request:",
      req.body
    );


    // Check required fields
    if (
      !userId ||
      !user_name ||
      !car_name ||
      !from_date ||
      !to_date
    ) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }


    // Check valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }


    // Check user exists
    const userExists =
      await User.findById(userId);

    if (!userExists) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }


    // Check dates
    if (from_date > to_date) {

      return res.status(400).json({
        success: false,
        message:
          "To date cannot be before from date"
      });
    }


    // Create booking
    const booking =
      await Booking.create({
        userId,
        user_name,
        car_name,
        from_date,
        to_date,
        status: "Pending"
      });


    console.log(
      "Booking Created:",
      booking
    );


    return res.status(201).json({
      success: true,
      message: "Booking done successfully",
      booking
    });

  } catch (error) {

    console.log(
      "Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


// =====================================================
// GET ALL BOOKINGS
// ADMIN
// =====================================================

exports.getBookings = async (req, res) => {
  try {

    const bookings =
      await Booking.find()
        .populate(
          "userId",
          "name email contact"
        )
        .sort({
          createdAt: -1
        });


    return res.status(200).json({
      success: true,
      bookings
    });

  } catch (error) {

    console.log(
      "Get Bookings Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// =====================================================
// GET USER BOOKINGS
// MY BOOKINGS
// =====================================================

exports.getUserBookings = async (req, res) => {
  try {

    const { userId } = req.params;


    console.log(
      "Getting bookings for User:",
      userId
    );


    // Check valid ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }


    // Get user's bookings
    const bookings =
      await Booking.find({
        userId: userId
      })
      .sort({
        createdAt: -1
      });


    return res.status(200).json({
      success: true,
      bookings
    });

  } catch (error) {

    console.log(
      "Get User Bookings Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


// =====================================================
// ADMIN LOGIN
// =====================================================

exports.adminLogin = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;


    const admin =
      await User.findOne({
        email
      });


    if (!admin) {

      return res.status(404).json({
        message: "Admin not found"
      });
    }


    if (admin.role !== "admin") {

      return res.status(403).json({
        message: "Not authorized"
      });
    }


    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );


    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password"
      });
    }


    return res.status(200).json({
      success: true,
      message: "Login successful",
      admin
    });

  } catch (err) {

    console.log(
      "Admin Login Error:",
      err
    );

    return res.status(500).json({
      message: "Server error"
    });
  }
};


// =====================================================
// CREATE BRAND
// =====================================================

exports.createBrand = async (req, res) => {
  try {

    const { brand } = req.body;


    if (!brand) {

      return res.status(400).json({
        message: "Brand name required"
      });
    }


    const exist =
      await Brand.findOne({
        brand
      });


    if (exist) {

      return res.status(400).json({
        message: "Brand already exists"
      });
    }


    const newBrand =
      await Brand.create({
        brand
      });


    return res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: newBrand
    });

  } catch (err) {

    console.log(
      "Create Brand Error:",
      err
    );

    return res.status(500).json({
      message: "Server Error"
    });
  }
};


// =====================================================
// GET BRANDS
// =====================================================

exports.getBrands = async (req, res) => {
  try {

    const brands =
      await Brand.find();


    return res.status(200).json({
      success: true,
      data: brands
    });

  } catch (err) {

    console.log(
      "Get Brands Error:",
      err
    );

    return res.status(500).json({
      message: "Server Error"
    });
  }
};


// =====================================================
// DELETE BRANDS
// =====================================================

exports.deleteBrands = async (req, res) => {
  try {

    const { id } = req.params;


    await Brand.findByIdAndDelete(id);


    return res.status(200).json({
      success: true,
      message: "Brand deleted"
    });

  } catch (error) {

    console.log(
      "Delete Brand Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error deleting Brand"
    });
  }
};


// =====================================================
// CONTACT
// =====================================================

exports.contact = async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      message
    } = req.body;


    if (
      !name ||
      !email ||
      !phone ||
      !message
    ) {

      return res.status(400).json({
        message: "All fields are required"
      });
    }


    const newContact =
      new Contact({
        name,
        email,
        phone,
        message
      });


    await newContact.save();


    console.log(
      name,
      email,
      phone,
      message
    );


    return res.status(201).json({
      success: true,
      message: "Contact Saved Successfully"
    });

  } catch (err) {

    console.log(
      "Contact Error:",
      err
    );

    return res.status(500).json({
      message: "Server Error"
    });
  }
};


// =====================================================
// GET ALL CONTACTS
// =====================================================

exports.getContact = async (req, res) => {
  try {

    const data =
      await Contact.find();


    return res.status(200).json(data);

  } catch (err) {

    console.log(
      "Get Contact Error:",
      err
    );

    return res.status(500).json({
      message: err.message
    });
  }
};


// =====================================================
// ADD SUBSCRIBER
// =====================================================

// =====================================================
// ADD SUBSCRIBER
// =====================================================

exports.addSubscriber = async (req, res) => {
  try {

    const { email } = req.body;

    // Check email
    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    // Clean email
    const cleanEmail = email.trim().toLowerCase();

    // Check if email already subscribed
    const existingSubscriber = await Subscriber.findOne({
      email: cleanEmail
    });

    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        message: "This email is already subscribed"
      });
    }

    // Create subscriber
    const newSubscriber = await Subscriber.create({
      email: cleanEmail
    });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: newSubscriber
    });

  } catch (error) {

    console.log("Add Subscriber Error:", error);

    // MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email is already subscribed"
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =====================================================
// GET ALL SUBSCRIBERS
// =====================================================

exports.getAllSubscribers = async (req, res) => {

  console.log(
    "Subscribers API hit"
  );

  try {

    const subscribers =
      await Subscriber.find();


    return res.status(200).json({
      success: true,
      data: subscribers
    });

  } catch (error) {

    console.log(
      "Get Subscribers Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error fetching subscribers"
    });
  }
};


// =====================================================
// DELETE SUBSCRIBER
// =====================================================

exports.deleteSubscriber = async (req, res) => {
  try {

    const { id } = req.params;


    await Subscriber.findByIdAndDelete(id);


    return res.status(200).json({
      success: true,
      message: "Subscriber deleted"
    });

  } catch (error) {

    console.log(
      "Delete Subscriber Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error deleting subscriber"
    });
  }
};


// =====================================================
// UPDATE BOOKING STATUS
// ADMIN
// =====================================================

exports.bookingupdate = async (req, res) => {
  try {

    const { status } = req.body;


    if (!status) {

      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }


    const updated =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status
        },
        {
          new: true
        }
      );


    if (!updated) {

      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }


    return res.status(200).json({
      success: true,
      message: "Status updated",
      booking: updated
    });

  } catch (err) {

    console.log(
      "Booking Status Error:",
      err
    );

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// =====================================================
// DELETE USER
// =====================================================

exports.deleteUsers = async (req, res) => {
  try {

    const { id } = req.params;


    await User.findByIdAndDelete(id);


    return res.status(200).json({
      success: true,
      message: "User deleted"
    });

  } catch (error) {

    console.log(
      "Delete User Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error deleting User"
    });
  }
};


// =====================================================
// ADD TESTIMONIAL
// =====================================================

exports.addTestimonial = async (req, res) => {
  try {

    const newTestimonial =
      new Testimonial(req.body);


    const saved =
      await newTestimonial.save();


    return res.status(201).json(saved);

  } catch (err) {

    console.log(
      "Add Testimonial Error:",
      err
    );

    return res.status(500).json({
      error: err.message
    });
  }
};


// =====================================================
// GET TESTIMONIALS
// =====================================================

exports.getTestimonials = async (req, res) => {
  try {

    const data =
      await Testimonial.find()
        .sort({
          postedAt: -1
        });


    return res.json(data);

  } catch (err) {

    console.log(
      "Get Testimonials Error:",
      err
    );

    return res.status(500).json({
      error: err.message
    });
  }
};

