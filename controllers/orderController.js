const orderModel = require("../models/orderModel");

// ===================== Create Order =====================
const createOrderController = async (req, res) => {
  try {
    const { products, customer } = req.body;

    if (!products || !customer) {
      return res.send("fields is require.");
    }

    const createorder = new orderModel({
      products,
      customer,
      status: "pending", // default
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

// ===================== All Orders =====================
const allOrdersController = async (req, res) => {
  try {
    const allOrders = await orderModel.find({}).populate({
      path: "products.productId",
    });

    res.status(200).json({
      success: true,
      message: "All Order Successfully",
      data: allOrders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

// ===================== Update Order Status (ONE CONTROLLER) =====================
const updateOrderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.json({
        success: false,
        message: "Status is required",
      });
    }

    const validStatus = ["pending", "confirmed", "hold", "cancelled"];

    if (!validStatus.includes(status)) {
      return res.json({
        success: false,
        message: "Invalid order status",
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: `Order ${status} successfully`,
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ===================== Orders By Status =====================
const ordersByStatusController = async (req, res) => {
  try {
    const status = req.params.status;

    const orders = await orderModel
      .find({ status })
      .populate("products.productId");

    res.json({
      success: true,
      message: `${status} orders`,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ====================== Edit Order ===================
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
  updateOrderStatusController,
  ordersByStatusController,
  editOrderController,
};
