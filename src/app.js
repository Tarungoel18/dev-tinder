const express = require("express");
const app = express();
const { dbConnect } = require("./config/database");
const { User } = require("./models/user");
app.use(express.json());

// app.use("/", (req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("Successfully registered");
  } catch (err) {
    res.status(400).send("User not found");
    console.log(err);
  }
});

app.get("/feed", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.get("/test", async (req, res) => {
  const email = req.body.emailId;
  const x = await User.find({ emailId: email });
  if (x.length > 0) {
    res.send(x);
  } else {
    res.status(404).send("User not found");
  }
});

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
