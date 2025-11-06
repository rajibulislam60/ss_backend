const path = require("path");
const fs = require("fs");

const addProductController = async (req, res) => {
  try {
    res.send("Controller and api work well.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addProductController };
