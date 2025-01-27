const express = require("express");
const app = express();

app.use("/test", (req, res) => {
  res.send("Welcome to test");
});
app.use((req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Server running successfully");
});
