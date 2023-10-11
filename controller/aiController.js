const express = require("express");
const AiService = require("../services/aiService");
const router = express.Router();

const aiService = new AiService();

router.post("/ai", async (req, res) => {
  const DTO = req.body;
  console.log(DTO);
  const result = await aiService.getGPT(DTO);
  return res.status(200).send(result);
});
module.exports = router;
