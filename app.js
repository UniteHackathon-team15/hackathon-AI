const express = require("express");
const app = express();
const Index = require("./controller/aiController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ai", Index);

app.listen(3001);
console.log("app listening at " + 3001);
