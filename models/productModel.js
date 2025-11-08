const { default: mongoose, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.Schema("Product", productSchema);
