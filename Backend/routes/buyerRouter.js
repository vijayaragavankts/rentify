const express = require("express");
const router = express.Router();
const Buyer = require("../models/buyerSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

router.get("/", (req, res) => {
  res.send("You are in customer login/register page");
});

router.post("/register", async (req, res) => {
  try {
    // console.log("Register here");
    const { name, lastname, email, password, number } = req.body;

    const existingUser = await Buyer.findOne({ $or: [{ email }, { number }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone number already exists",
      });
    }
    if (!name || !lastname || !number || !password || !email) {
      return res.status(500).json({
        success: false,
        message: "Enter all the required fields for register",
      });
    }
    const buyer = await new Buyer(req.body);

    await buyer.save();

    return res.status(200).json({
      message: "Registration successful",
      name: buyer.username,
      lastname: buyer.lastname,
      email: buyer.email,
      password: buyer.password,
      number: buyer.number,
      token: generateToken(buyer._id),
      id: buyer._id,
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
    const buyer = await Buyer.findOne({ email: email });
    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: "User with the entered email not present in db",
      });
    }
    const result = await bcrypt.compare(password, buyer.password);
    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Entered username or password is wrong",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully Logged in",
      email: buyer.email,
      id: buyer._id,
      token: generateToken(buyer._id),
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
