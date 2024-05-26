const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const buyerSchema = new mongoose.Schema({
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
    unique: true,
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

buyerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashedpw = await bcrypt.hash(this.password, 10);
  console.log(hashedpw);
  this.password = hashedpw;
  next();
});

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
