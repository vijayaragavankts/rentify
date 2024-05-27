const express = require("express");
const mongoose = require("mongoose");
const homeRouter = require("./routes/homeRouter");
const buyerRouter = require("./routes/buyerRouter");
const sellerRouter = require("./routes/sellerRouter");
const createRouter = require("./routes/createRouter");
const showItemsToSeller = require("./routes/showItemsToSeller");
const deleteItemRouter = require("./routes/deleteItemRouter");
const showItemsToBuyer = require("./routes/showItemsToBuyer");
const likes = require("./routes/likes");
const sellerDetails = require("./routes/sellerDetails");

const protectSeller = require("./Middleware/authmiddlewareSeller");
const protectBuyer = require("./Middleware/authmiddlewareBuyer");

const cors = require("cors");

require("dotenv").config();

// mongoose
//   .connect("mongodb://localhost:27017/rentifyApp")
//   .then(() => {
//     console.log("Database Connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const app = express();

app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://rentify--app.vercel.app"],
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(express.json()); // middleware

console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/", homeRouter);
app.use("/buyer", buyerRouter);
app.use("/seller", sellerRouter);
app.use("/getItemsfromSeller", createRouter);
app.use("/showItemsToSeller", protectSeller, showItemsToSeller);
app.use("/deleteItem", protectSeller, deleteItemRouter);
app.use("/showItemsToBuyer", protectBuyer, showItemsToBuyer);
app.use("/api", protectBuyer, likes);
app.use("/sellerDetails", protectBuyer, sellerDetails);

app.listen(5000, () => {
  console.log("Serving in the port 5000");
});

// Export the Express API
module.exports = app;
