const Post = require("../models/post");
const mongoose = require("mongoose");

const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("postedBy", "_id name");
    res.json({ msg: "Posts fetched", posts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const CreatePost = async (req, res) => {
  const { title, body, pic } = req.body;
  console.log(title, body, pic);
  if (!title || !body || !pic) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const post = await new Post({
      title,
      body,
      photo: pic,
      postedBy: req.user,
    });
    await post.save();
    res.json({ msg: "Post created", post });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const MyPost = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user }).populate(
      "postedBy",
      "_id name"
    );
    res.json({ msg: "Posts fetched", posts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const postlikes = async (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
};
const postunlikes = async (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  CreatePost,
  GetPosts,
  MyPost,
  postlikes,
  postunlikes,
};
