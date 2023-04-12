let express = require("express");
const { BlacklistModel } = require("../models/backlist.model");

let logoutRouter = express.Router();

logoutRouter.post("/", async (req, res) => {
  try {
    let token = req.headers.authorization;
    let blacklistedToken = new BlacklistModel({ token });
    await blacklistedToken.save();
    res.status(400).send({ msg: "logout successful" });
  } catch (error) {
    res.status(200).send({ msg: error.message });
  }
});

module.exports = {
  logoutRouter,
};
