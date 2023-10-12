const express = require("express");
const asyncify = require("express-asyncify").default;
const AiService = require("../services/aiService");
const router = asyncify(express.Router());

const aiService = new AiService();

router.get("/story", async (req, res) => {
  const DTO = req.body;
  const result = await aiService.getStory(DTO);

  return res.status(200).send(result);
});

router.post("/choice", async (req, res) => {
  const DTO = req.body;
  const result = await aiService.getChoice(DTO);

  return res.status(200).send(result);
});

router.post("/image", async (req, res) => {
  const { image } = req.body;
  const result = await aiService.getImg(image);

  return res.status(200).send(result);
});

router.post("/translateImage", async (req, res) => {
  const { image } = req.body;
  const result = await aiService.getTranslatedImg(image);
  return res.status(200).send(result);
});
module.exports = router;
