const express = require("express");
const router = express.Router();

router.get("/allproducts", (req, res) => {
  res.send("api is working.");
});

module.exports = router;
