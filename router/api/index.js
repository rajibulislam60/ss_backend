const express = require("express");
const router = express.Router();
const products = require("./products");
const order = require("./order");

router.use("/product", products);
router.use("/order", order);

module.exports = router;
