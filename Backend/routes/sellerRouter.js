const express = require("express");
const router = express.Router();
const Seller = require("../models/sellerSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

router.get("/", (req, res) => {
  res.send("You are in Restaurant login/signup page"); // for demo
});

router.post("/register", async (req, res) => {
  try {
    // console.log("Register here");
    const { name, email, password, lastname, number } = req.body;

    const existingUser = await Seller.findOne({ $or: [{ email }, { number }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone number already exists",
      });
    }

    if (!name || !password || !email || !lastname || !number) {
      return res.status(500).json({
        success: false,
        message: "Enter all the required fields for registering a restaurant",
      });
    }
    const seller = await new Seller(req.body);
    await seller.save();

    return res.status(200).json({
      message: "Registration successful for seller",
      name: seller.name,
      email: seller.email,
      password: seller.password,

      token: generateToken(seller._id),
      id: seller._id,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "There is some issues in registering",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email: email });
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "User with the entered email not present in db",
      });
    }
    const result = await bcrypt.compare(password, seller.password);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Entered name or password is wrong",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully Logged in",
      token: generateToken(seller._id),
      id: seller._id,
      name: seller.name,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Error Occured while Login",
    });
  }
});

module.exports = router;
