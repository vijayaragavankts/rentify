const mongoose = require("mongoose");

const buyerLikesSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
});

const Like = mongoose.model("Like", buyerLikesSchema);

module.exports = Like;
