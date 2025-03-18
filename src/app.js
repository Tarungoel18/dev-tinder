const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const { User } = require("./models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utils/validation");
app.use(express.json());

// app.use("/", (req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

app.post("/signup", async (req, res) => {
  // console.log(req.body);

  const { firstName, lastName, password, emailId } = req.body;
  try {
    validateSignupData(req);

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("Successfully registered");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/feed", async (req, res) => {
  // const name = req.body.firstName;
  // console.log(name);
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
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

app.patch("/test/:userId", async (req, res) => {
  const data = req.body;
  const user_Id = req.params?.userId;

  console.log(data);
  try {
    const ALLOWED_UPDATES = ["firstName", "lastName", "password", "Gender"];

    const isAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowed) {
      throw new Error("This field cannt be updated");
    }
    await User.findOneAndUpdate({ _id: user_Id }, data, {
      runValidators: true,
    });
    res.send("Updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid Credentials");
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      res.send("User Logged in Successfully");
    } else {
      throw new Error("Invald Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err);
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
