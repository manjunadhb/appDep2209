const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://manjunadhb:manjunadhb@mycluster.7yvwlgc.mongodb.net/users?retryWrites=true&w=majority"
);

app.use(cors());
app.use(express.static(path.join(__dirname), "./client/build"));

app.get("/citiesOfIndia", (req, res) => {
  res.json(["Hyderabad", "Delhi", "Kolkota", "Bengaluru", "Mumbai"]);
});

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  age: {
    type: Number,
    required: true,
    min: [18, "Too young to create account"],
    max: [120, "Must be joking, you are giving wrong age"],
  },
  batchId: Number,
  studentId: Number,
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
});

let User = new mongoose.model("students", userSchema);

app.get("/getUsers", async (req, res) => {
  let userData = await User.find();

  res.json(userData);
});

app.listen(1234, () => {
  console.log("Listening to 1234");
});
