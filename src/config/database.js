const mongoose = require("mongoose");
const dbConnect = async () => {
  await mongoose.connect(
    "mongodb+srv://tarungoel1823:WF9zA8PPeYFWSTYy@cluster0.ivvzh.mongodb.net/devTinder"
  );
};
module.exports = {
  dbConnect,
};
