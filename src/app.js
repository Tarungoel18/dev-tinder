const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  console.log(req.query);
  res.send("Successful");
});
app.get("/test/:userId/:password", (req, res) => {
  //data saved to db
  console.log(req.params);
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Server running successfully");
});
