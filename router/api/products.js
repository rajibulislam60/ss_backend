const express = require("express");
const {
  addProductController,
} = require("../../controllers/productsController");
const router = express.Router();

router.get("/allproducts", addProductController);

module.exports = router;
