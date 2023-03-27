let express = require("express");
let postRouter = express.Router();
let jwt = require("jsonwebtoken");
let { PostModel } = require("../models/post.model");

postRouter.post("/add", async (req, res) => {
  try {
    let post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "New post added" });
    c;
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

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

postRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let post = await PostModel.find({ _id: id });
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "post is updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await PostModel.findByIdAndUpdate({ _id: id });
    res.status(200).send({ msg: "post is deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  postRouter,
};
