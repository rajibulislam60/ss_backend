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
      req.files?.map(
        (item) => `${process.env.Host_Url}/uploads/${item.filename}`
      ) || [];

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
    return res.status(500).send({ success: false, msg: error.message });
  }
};

const allProductsController = async (req, res) => {
  try {
    let allproducts = await productModel.find({});
    return res.status(200).json({
      success: true,
      msg: "All products successfull",
      data: allproducts,
    });
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    if (req.files && req.files.length > 0) {
      updatedData.image = req.files.map(
        (item) => process.env.Host_Url + item.filename
      );
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    res.status(201).json({
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

const deletedProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productModel.findOneAndDelete(productId);

    res.status(201).json({
      message: "Product deleted successfully.",
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

const singleProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single product fetched successfully",
      product,
    });
  } catch (error) {
    return res.status(500).send({ success: false, msg: error.message });
  }
};

module.exports = {
  addProductController,
  allProductsController,
  updateProductController,
  deletedProductController,
  singleProductController,
};
