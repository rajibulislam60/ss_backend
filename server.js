require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;

console.log("PORT from .env:", PORT);

app.post("/", (req, res) => {
  res.send("This project and Render are working!");
});

app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
