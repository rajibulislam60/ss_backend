const express = require("express");
const router = express.Router();
const api = require("./api");

const baseUrl = process.env.BaseURL;

router.use(baseUrl, api);
router.use(baseUrl, (req, res) => {
  return res.status(404).send({
    msg: "Api is not found",
  });
});

module.exports = router;
