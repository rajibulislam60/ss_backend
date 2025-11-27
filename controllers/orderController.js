const orderModel = require("../models/orderModel");

const createOrderController = async (req, res) => {
  try {
    const { products, customer } = req.body;
    if (!products || !customer) {
      return res.send("fields is require.");
    }

    const createorder = new orderModel({
      products,
      customer,
    });
    const savedorder = await createorder.save();

    res.status(201).json({
      success: true,
      message: "Add Order Successfully",
      data: savedorder,
    });
  } catch (error) {
    console.log("order:", error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

const allOrdersController = async (req, res) => {
  try {
    const allOrders = await orderModel.find({});

    res.status(201).json({
      success: true,
      message: "All Order Successfully",
      data: allOrders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

module.exports = { createOrderController, allOrdersController };
