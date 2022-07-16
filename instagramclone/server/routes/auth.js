const express = require("express");
const router = express.Router();
const { Signup, Signin } = require("../controller/authcontroller");
const { RequireLogin } = require("../middleware/requireLogin");

router.get("/protected", RequireLogin, (req, res) => {
  res.send("Hello World");
});

router.post("/signup", Signup);
router.post("/signin", Signin);

module.exports = router;
