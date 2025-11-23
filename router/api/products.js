const express = require("express");
const multer = require("multer");
const {
  addProductController,
  allProductsController,
  updateProductController,
  deletedProductController,
} = require("../../controllers/productsController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extention = file.originalname.split(".");
    cb(
      null,
      file.fieldname + "-" + uniqueName + `.${extention[extention.length - 1]}`
    );
  },
});

function errCheck(err, req, res, next) {
  if (err) {
    return res.status(500).send({ success: false, msg: err.message });
  }
  next();
}

const upload = multer({ storage: storage });

router.post(
  "/addproduct",
  upload.array("image"),
  errCheck,
  addProductController
);
router.get("/allproducts", allProductsController);
router.patch(
  "/updatedproduct/:id",
  upload.array("image"),
  errCheck,
  updateProductController
);
router.delete("/deletedproduct/:id", deletedProductController);

module.exports = router;
