const e = require("express");
var validator = require("validator");

const validateSignupData = (req) => {
  const { emailId, password, firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter the name");
  } else if (
    firstName.length < 3 ||
    firstName.length > 20 ||
    lastName.length < 3 ||
    lastName.length > 20
  ) {
    throw new Error("The name should be between 3 to 20 characters");
  } else if (!validator.isEmail(emailId))
    throw new Error("Enter a valid email Id");
};

module.exports = {
  validateSignupData,
};
