const express = require("express");
const {
  allOrdersController,
  createOrderController,
  confirmOrderController,
  allConfirmedOrders,
} = require("../../controllers/orderController");
const router = express.Router();

router.post("/addorder", createOrderController);
router.get("/allorder", allOrdersController);
router.put("/confirmorder/:id", confirmOrderController);
router.get("/allconfirmed", allConfirmedOrders);
// router.put("/cancel/:id", cancelOrderController);
// router.put("/edit/:id", editOrderController);

module.exports = router;
