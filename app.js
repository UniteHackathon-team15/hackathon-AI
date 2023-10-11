const express = require("express");
const app = express();
const Index = require("./controller/indexController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Index);

app.listen(3001);
console.log("app listening at " + 3001);
