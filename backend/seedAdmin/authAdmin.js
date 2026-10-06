const bcrypt = require('bcrypt');
const MongoB = require('../config/db');
const User = require('../model/user');
require('dotenv').config({ path: '../.env' });

console.log(" Script started...");

const createAdmin = async () => {
  try {
    await MongoB();
    console.log(" DB Connected");

    console.log(" Admin Email:", process.env.EMAIL_ADMIN);

    if (!process.env.EMAIL_ADMIN || !process.env.PASSWORD_ADMIN) {
      console.log("EMAIL_ADMIN or PASSWORD_ADMIN missing in .env");
      return;
    }

    const adminexist = await User.findOne({
      email: process.env.EMAIL_ADMIN,
    });

    if (adminexist) {
      console.log(" Admin already exists");
      return;
    }

    const hashPass = await bcrypt.hash(process.env.PASSWORD_ADMIN, 10);

    const user = await User.create({
      name: "Dhirajj",
      email: process.env.EMAIL_ADMIN,
      password: hashPass,
      role: "admin",
    });

    console.log(" Admin created successfully");
    console.log(user);

  } catch (err) {
    console.log("ERROR:", err);
  } finally {
    process.exit();
  }
};

createAdmin();