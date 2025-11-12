const path = require("path");
const fs = require("fs");
const productModel = require("../models/productModel");

const addProductController = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      res.send("fields is require.");
    }
    const product = new productModel({
      name,
      price,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product add successfully.",
      data: savedProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

const allProductsController = async (req, res) => {
  try {
    res.send("allproducts controller working as well.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addProductController, allProductsController };
