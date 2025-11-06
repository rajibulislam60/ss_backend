require("dotenv").config();
const express = require("express");
const router = require("./router");
const app = express();

const PORT = process.env.PORT;

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is working ${PORT}`);
});
