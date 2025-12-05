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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
