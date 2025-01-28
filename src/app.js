const express = require("express");
const app = express();
const { dbConnect } = require("./config/database");
dbConnect()
  .then(() => {
    console.log("Database successfully connected");
    app.listen(3000, () => {
      console.log("Server running successfully");
    });
  })

  .catch((err) => {
    console.log("Some error occured in the connection");
  });
