const express = require("express");
const router = express.Router();
const { RequireLogin } = require("../middleware/requireLogin");
const {
  CreatePost,
  GetPosts,
  MyPost,
  postlikes,
  postunlikes,
} = require("../controller/postcontroller");

router.get("/getposts", RequireLogin, GetPosts);
router.post("/createpost", RequireLogin, CreatePost);
router.get("/getmyposts", RequireLogin, MyPost);
router.put("/like", RequireLogin, postlikes);
router.put("/unlike", RequireLogin, postunlikes);

module.exports = router;
