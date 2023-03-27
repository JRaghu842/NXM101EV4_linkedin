let jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
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
};

module.exports = {
  auth,
};
