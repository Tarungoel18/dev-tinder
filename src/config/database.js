const mongoose = require("mongoose");
const { db_url } = require("../../constants");
const dbConnect = async () => {
  await mongoose.connect(db_url);
};
module.exports = {
  dbConnect,
};
