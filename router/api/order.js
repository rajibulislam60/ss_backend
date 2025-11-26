const express = require("express");
const { createOrder } = require("../../controllers/orderController");
const router = express.Router();

router.post("/addorder", createOrder);

module.exports = router;
