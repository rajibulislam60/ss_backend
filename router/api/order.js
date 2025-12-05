const express = require("express");
const {
  allOrdersController,
  createOrderController,
  confirmOrderController,
  allConfirmedOrders,
  cancelOrderController,
  allCancelOrders,
  holdController,
  allHoldOrders,
  editOrderController,
} = require("../../controllers/orderController");
const router = express.Router();

router.post("/addorder", createOrderController);
router.get("/allorder", allOrdersController);
router.put("/confirmorder/:id", confirmOrderController);
router.get("/allconfirmed", allConfirmedOrders);
router.put("/cancel/:id", cancelOrderController);
router.get("/allcancelled", allCancelOrders);
router.put("/hold/:id", holdController);
router.get("/allhold", allHoldOrders);
router.put("/edit/:id", editOrderController);

module.exports = router;
