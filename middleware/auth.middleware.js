let jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/backlist.model");

let auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    const isBlacklisted = await BlacklistModel.findOne({ token });
    if (isBlacklisted) {
      res.status(400).send({ msg: "Please login" });
    } else if (token) {
      let decoded = jwt.verify(token, "code");
      if (decoded) {
        req.body.user = decoded.userID;
        next();
      } else {
        res.status(400).send({ msg: "Wrong token" });
      }
    } else {
      res.status(400).send({ msg: "Please login first" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports = {
  auth,
};
