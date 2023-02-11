import express from "express";
import bodyParser from "body-parser";
import { getTotal } from "./getTotal.js";

const app = express();
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("connected");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/total", async (req, res) => {
  const username = req.body.username;
  const cookie = req.body.cookie;

  const total = await getTotal(username, cookie);

  res.json({
    total: total,
  });
});
