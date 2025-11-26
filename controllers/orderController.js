const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

const createOrder = async (req, res) => {
  try {
    const { products, customer } = req.body;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Products are required!" });
    }

    let total = 0;

    for (let item of products) {
      const product = await productModel.findById(item.productId);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      total += product.price * item.quantity;
    }

    const newOrder = await orderModel.create({
      products,
      customer,
      totalPrice: total,
    });

    res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

module.exports = { createOrder };
