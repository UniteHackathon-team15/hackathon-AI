require("dotenv").config();
const OpenAI = require("openai");

class AiService {
  async getGPT(DTO) {
    try {
      console.log(DTO.question);
      const openai = new OpenAI({
        apiKey: process.env.AI_APIKEY,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: `${DTO.question}` }],
      });
      return response.choices[0].message.content;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

module.exports = AiService;
