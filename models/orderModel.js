const { default: mongoose, Schema } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

    // Array of customer details
    details: [
      {
        c_name: {
          type: String,
          required: true,
        },
        phone: {
          type: Number,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          enum: [
            "Dhaka",
            "Chittagong",
            "Sylhet",
            "Rajshahi",
            "Khulna",
            "Barishal",
            "Rangpur",
            "Mymensingh",
          ],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
