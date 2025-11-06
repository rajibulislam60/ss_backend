const express = require("express");
const router = express.Router();
const products = require("./products");

router.use("/product", products);

module.exports = router;
