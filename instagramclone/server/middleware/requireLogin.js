const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const mongoose = require("mongoose");
const User = require("../models/user");

const RequireLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const token = authorization.replace("Bearer ", "");
    await jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
      const { _id } = payload;
      User.findById(_id).then((userdata) => {
        req.user = userdata;
        next();
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// const RequireLogina = async(req, res) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }
//   try {
//     const token = authorization.replace("Bearer ", "");
//     jwt.verify(token, JWT_SECRET, (err, payload) => {
//       if (err) {
//         return res.status(401).json({ msg: "Token is not valid" });
//       }
//       const { _id } = payload;
//       const userdata = await User.findById(_id);
//       req.user = userdata;
//     //   next();
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

module.exports = { RequireLogin };
