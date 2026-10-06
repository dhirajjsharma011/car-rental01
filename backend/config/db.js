require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB is Connected");
  } catch (error) {
    console.log("MongoDB is disconnected:", error.message);
  }
};

module.exports = ConnectDB;