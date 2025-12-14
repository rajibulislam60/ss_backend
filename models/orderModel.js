const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    customer: {
      c_name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    courier: {
      type: String,
      enum: ["None", "SteadFast", "Pathao", "RedEx", "CarryBee"],
      default: "None",
    },

    note: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "hold"],
      default: "pending",
    },
    reviews: [
      {
        text: { type: String },
        time: { type: String },
      },
    ],

    deliveryCharge: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
