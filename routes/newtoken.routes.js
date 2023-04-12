let express = require("express");
let jwt = require("jsonwebtoken");

let newtokenRouter = express.Router();

newtokenRouter.get("/", (req, res) => {
  let refreshtoken = req.headers.authorization;
  let decoded = jwt.verify(refreshtoken, "refreshcode");
  if (decoded) {
    let token = jwt.sign({ userID: decoded.userID }, "code", { expiresIn: 60 });
    res.send(token);
  } else {
    res.send("invalid refresh token, plz login again");
  }
});

module.exports = {
  newtokenRouter,
};
