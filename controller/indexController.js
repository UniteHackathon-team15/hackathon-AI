const express = require("express");
const asyncify = require("express-asyncify").default;
const router = asyncify(express.Router());
const AI = require("./aiController");

router.use("/ai", AI);

module.exports = router;
