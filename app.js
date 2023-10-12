const express = require("express");
const asyncify = require("express-asyncify").default;
const app = asyncify(express());
const Index = require("./controller/aiController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ai", Index);

app.use((err, req, res, next) => {
  var e = err;
  console.error(err.stack);
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});

app.listen(3001);
