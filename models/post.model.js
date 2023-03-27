let mongoose = require("mongoose");

let postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    user: String,
  },
  {
    versionKey: false,
  }
);

let PostModel = mongoose.model("post", postSchema);

module.exports = {
  PostModel,
};

// {
//   "title": "birthday",
//   "body": "birthday post",
//   "device": "Mobile",
//   "no_of_comments": 2
// }
