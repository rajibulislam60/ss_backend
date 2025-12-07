require("dotenv").config();
const express = require("express");
const router = require("./router");
const DBConnect = require("./config/db");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

DBConnect();

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is working ${PORT}`);
});
