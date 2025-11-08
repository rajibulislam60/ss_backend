const mongoose = require("mongoose");

const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URL);
  } catch (error) {
    console.log(error);
  }
};

module.exports = DBConnect;
