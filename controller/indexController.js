const express = require("express");
const router = express.Router();
const AI = require("./aiController");

router.use("/ai", AI);

module.exports = router;
