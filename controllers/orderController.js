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
    const allOrders = await orderModel.find({});

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
    const {
      products,
      customer,
      courier,
      note,
      status,
      reviews,
      deliveryCharge,
      discount,
    } = req.body;

    // Build the update object dynamically
    const updateObj = {
      ...(products && { products }),
      ...(customer && { customer }),
      ...(courier && { courier }),
      ...(note !== undefined && { note }),
      ...(status && { status }),
      ...(reviews && { reviews }),
      ...(deliveryCharge !== undefined && { deliveryCharge }),
      ...(discount !== undefined && { discount }),
    };

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      updateObj,
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.log("Edit Order Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ====================== Single Order ===================
const singleOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await orderModel.findById(orderId).populate({
      path: "products.productId",
    });

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Single Order",
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ====================== Chart Order ===================
const orderChartController = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: 1 });

    const chartMap = {};

    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });

      if (!chartMap[date]) {
        chartMap[date] = { date, sell: 0, cancel: 0 };
      }

      if (order.status === "confirmed") chartMap[date].sell += 1;
      if (order.status === "cancelled") chartMap[date].cancel += 1;
    });

    res.json({
      success: true,
      data: Object.values(chartMap),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createOrderController,
  allOrdersController,
  updateOrderStatusController,
  ordersByStatusController,
  editOrderController,
  singleOrderController,
  orderChartController,
};
