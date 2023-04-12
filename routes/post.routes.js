let express = require("express");
let postRouter = express.Router();
let jwt = require("jsonwebtoken");
let { PostModel } = require("../models/post.model");

postRouter.get("/", async (req, res) => {
  let { page, limit } = req.query;
  let token = req.headers.authorization;
  let decoded = jwt.verify(token, "code");
  try {
    let pagenum = Number(page) || 1;
    let pagelimit = Number(limit) || 3;
    let skip = (pagenum - 1) * pagelimit;

    if (decoded) {
      let posts = await PostModel.find({ user: decoded.userID })
        .skip(skip)
        .limit(pagelimit);
      res.status(200).send({ msg: `Here are all posts`, posts });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  postRouter,
};
