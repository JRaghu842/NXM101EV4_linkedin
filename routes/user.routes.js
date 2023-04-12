let express = require("express");
let { UserModel } = require("../models/user.model");
let userRouter = express.Router();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

// register
userRouter.post("/register", (req, res) => {
  let { name, email, gender, password, age, city, is_married } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      let user = new UserModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
        is_married,
      });
      await user.save();
      res.status(200).send({ msg: "Registration is successful" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//user login
userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login is successful",
            token: jwt.sign({ userID: user[0]._id }, "code", { expiresIn: 60 }),
            refreshtoken: jwt.sign({ userID: user[0]._id }, "refreshcode", {
              expiresIn: 180,
            }),
          });
        } else {
          res.status(400).send({ msg: err });
        }
      });
    } else {
      res.status(400).send({ msg: "Wrong Email" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  userRouter,
};
