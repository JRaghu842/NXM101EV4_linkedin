let express = require("express");
require("dotenv").config();
let cors = require("cors");

let { connection } = require("./db");
const { auth } = require("./middleware/auth.middleware");
const { postRouter } = require("./routes/post.routes");
const { userRouter } = require("./routes/user.routes");
let app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log("Not able to connect to DB");
  }
  console.log(`server is live at ${process.env.port}`);
});
