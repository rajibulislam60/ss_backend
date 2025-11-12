const express = require("express");
const {
  addProductController,
  allProductsController,
} = require("../../controllers/productsController");
const router = express.Router();

router.post("/addproduct", addProductController);
router.get("/allproducts", allProductsController);

module.exports = router;
