require("dotenv").config();
const express = require("express");
const app = express();

const Port = process.env.PORT;

app.listen(Port, function () {
  console.log(`Server is working ${Port}`);
});
