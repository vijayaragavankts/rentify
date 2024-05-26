const express = require("express");
const Item = require("../models/itemSchema");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { place, price, area, bedroom, bathroom, image, sellerId } = req.body;

    if (
      !place ||
      !price ||
      !area ||
      !bedroom ||
      !bathroom ||
      !image ||
      !sellerId
    ) {
      res.status(500).json({
        success: false,
        message: "Enter all the fields",
      });
    }
    // category is a String , now we have to fetch in Category Schema with this restaurant Id and catefory name
    // if this is available then we just get the particular category Id and add these data to Item Schema Model
    // Otherwise we have to create a new Category with the given cateogry name and using this category id, add data to Item Schema

    const item = await new Item({
      seller: sellerId,
      place: place,
      price: price,
      area: area,
      image: image,
      no_of_bedroom: bedroom,
      no_of_bathroom: bathroom,
    });
    await item.save();
    return res.status(200).json({
      message: "Got Item from Seller and stored in db",
      success: true,
      data: item,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      message: "Error Occurred",
      success: false,
    });
  }
});

// updating a item in restaurant

// updating a item in restaurant
router.put("/", async (req, res) => {
  const { place, price, area, image, bedroom, bathroom, itemId } = req.body;
  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(400).json({
        success: false,
        message: "There is no item with this id in DB to Update",
        data: "No item to Update",
      });
    }

    // Assuming req.body contains the updated data you want to apply
    const updating = await Item.findByIdAndUpdate(
      itemId,
      {
        place: place || item.place,
        price: price || item.price,
        area: area || item.area,
        image: image || item.image,
        no_of_bathroom: bathroom || item.no_of_bathroom,
        no_of_bedroom: bedroom || item.no_of_bedroom,
        seller: item.seller,
        category: item.category,
      },
      { new: true }
    );

    if (!updating) {
      return res.status(500).json({
        success: false,
        message: "Error updating the item",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updating,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error updating the item",
    });
  }
});

module.exports = router;
