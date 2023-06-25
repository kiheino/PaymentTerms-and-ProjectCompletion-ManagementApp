require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;
const auth = require("./src/v1/routes");

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/v1", auth);

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("データベースと接続中");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中…");
});
