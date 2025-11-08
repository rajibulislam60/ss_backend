const express = require("express");
const {
  addProductController,
} = require("../../controllers/productsController");
const router = express.Router();

router.post("/addproduct", addProductController);

module.exports = router;
