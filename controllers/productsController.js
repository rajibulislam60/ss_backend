const path = require("path");
const fs = require("fs");
const productModel = require("../models/productModel");

const addProductController = async (req, res) => {
  try {
    const { name, description, image, price, discount, quantity } = req.body;

    if (!name || !description || !price || !discount || !quantity) {
      return res.send("fields is require.");
    }

    const images =
      req.files?.map((item) => process.env.Host_Url + item.filename) || [];

    const product = new productModel({
      name,
      description,
      image: images,
      price,
      discount,
      quantity,
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
