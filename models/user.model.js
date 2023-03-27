let mongoose = require("mongoose");

let userSchems = mongoose.Schema(
  {
    name: String,
    email: { type: String, Required: true, unique: true },
    gender: String,
    password: String,
    age: Number,
    city: String,
    is_married: Boolean,
  },
  {
    versionKey: false,
  }
);

let UserModel = mongoose.model("user", userSchems);

module.exports = {
  UserModel,
};
