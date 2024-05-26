const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashedpw = await bcrypt.hash(this.password, 10);
  this.password = hashedpw;
  next();
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
