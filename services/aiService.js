require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.AI_APIKEY,
});
class AiService {
  async getStory(DTO) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `"${DTO.question}" 이 다음에 이어질 스토리를 100자 이하로 적어 줘.`,
          },
        ],
      });
      return response.choices[0].message.content;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async getChoice(DTO) {
    const { question, count } = DTO;
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `"${question}" 이것과 연관지어서 선택지를 ${count} 개 적어 줘.`,
          },
        ],
      });
      return response.choices[0].message.content;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

module.exports = AiService;
