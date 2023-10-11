const express = require("express");
const app = express();
const AI = require("./controller/aiController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", AI);
app.listen(3001);
console.log("app listening at " + 3001);
