const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  place: {
    type: String,
  },
  price: {
    type: Number,
  },
  area: {
    type: String,
  },
  no_of_bedroom: {
    type: Number,
  },
  no_of_bathroom: {
    type: Number,
  },
  isWealthy: {
    type: Boolean,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default:
      "https://images.pexels.com/photos/7031720/pexels-photo-7031720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
