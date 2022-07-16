const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      name,
      email,
      password: hashpassword,
    });
    await newUser.save();
    res.json({ msg: "User created", user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const Signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide email and password." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Email or password." });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.json({ msg: "User logged in", user, token: `Bearer ${token}` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  Signup,
  Signin,
};
