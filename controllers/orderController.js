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

// ===================== Confirm Order area =====================
const confirmOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: "confirmed" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order confirmed successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const allConfirmedOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ status: "confirmed" });

    res.json({
      success: true,
      message: "Confirmed Orders",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ===================== Cancel Order area =====================
const cancelOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: "cancelled" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order cancelled successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const allCancelOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ status: "cancelled" });

    res.json({
      success: true,
      message: "cancelled Orders",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ===================== Hold Order area =====================
const holdController = async (req, res) => {
  try {
    const orderId = req.params.id;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: "hold" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order hold successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const allHoldOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ status: "hold" });

    res.json({
      success: true,
      message: "Hold Orders",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ====================== Edit Order Area ===================

const editOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { products, customer, courier, note } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      {
        ...(products && { products }),
        ...(customer && { customer }),
        ...(courier && { courier }),
        ...(note && { note }),
      },
      { new: true }
    );
    res.json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createOrderController,
  allOrdersController,
  confirmOrderController,
  allConfirmedOrders,
  cancelOrderController,
  allCancelOrders,
  holdController,
  allHoldOrders,
  editOrderController,
};
