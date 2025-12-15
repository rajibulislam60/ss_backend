const express = require("express");
const {
  createOrderController,
  allOrdersController,
  updateOrderStatusController,
  ordersByStatusController,
  editOrderController,
  singleOrderController,
  orderChartController,
} = require("../../controllers/orderController");
const router = express.Router();

router.post("/createorder", createOrderController);
router.get("/allorder", allOrdersController);

router.patch("/status/:id", updateOrderStatusController);
router.get("/status/:status", ordersByStatusController);

router.put("/edit/:id", editOrderController);
router.get("/singleorder/:id", singleOrderController);

router.get("/chart", orderChartController);

module.exports = router;
