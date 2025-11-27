const express = require("express");
const {
  allOrdersController,
  createOrderController,
} = require("../../controllers/orderController");
const router = express.Router();

router.post("/addorder", createOrderController);
router.get("/allorder", allOrdersController);

module.exports = router;
