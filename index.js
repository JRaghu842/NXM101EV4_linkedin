let express = require("express");
require("dotenv").config();

let { connection } = require("./db");
const { auth } = require("./middleware/auth.middleware");
const { postRouter } = require("./routes/post.routes");
const { userRouter } = require("./routes/user.routes");
const { logoutRouter } = require("./routes/logout.routes");
const { newtokenRouter } = require("./routes/newtoken.routes");

let app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/getnewtoken", newtokenRouter);

app.use(auth);
app.use("/posts", postRouter);
app.use("/logout", logoutRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log("Not able to connect to DB");
  }
  console.log(`server is live at ${process.env.port}`);
});
