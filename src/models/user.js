const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      miNLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      miNLength: 3,
      maxLength: 20,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid EmailId" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    Gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid Gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/560/560199.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
