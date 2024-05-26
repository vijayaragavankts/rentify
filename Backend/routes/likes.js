const express = require("express");
const router = express.Router();
const Item = require("../models/itemSchema");
const BuyerLikes = require("../models/buyerLikesSchema");

// Endpoint to get likes for a user
router.get("/getLikes", async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user id is available in req.user
    const likes = await BuyerLikes.find({ buyer: userId }).populate(
      "item",
      "isLiked"
    );
    res.json(likes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Endpoint to update likes
router.post("/updateLike", async (req, res) => {
  try {
    const { itemId, isLiked } = req.body;
    const userId = req.user._id;

    let like = await BuyerLikes.findOne({ buyer: userId, item: itemId });
    if (like) {
      like.isLiked = isLiked;
      await like.save();
    } else {
      like = new BuyerLikes({ buyer: userId, item: itemId, isLiked });
      await like.save();
    }

    // Update likes count in Property model
    const property = await Item.findById(itemId);
    property.likesCount = isLiked
      ? property.likesCount + 1
      : property.likesCount - 1;
    await property.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
