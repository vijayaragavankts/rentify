const express = require("express");
const router = express.Router();
const Seller = require("../models/sellerSchema");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id);
    res.json(seller);
  } catch (e) {
    console.log(e);
    res.status(404).json({
      success: false,
      message: "There is some issues in showing seller detail",
    });
  }
});

module.exports = router;
