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
            content: `"${DTO.question}" 이 다음에 이어질 스토리를 50자 이하로 적어 줘.`,
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

  async getImg(img) {
    // const { img } = req;
    const response = await openai.images.generate({
      prompt: img,
      size: "1024x1024",
    });

    return response.data[0].url;
  }

  async getTranslatedImg(img) {
    const translate = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `"${img}" 를 영어로 번역만 해 줘.`,
        },
      ],
    });
    const response = await openai.images.generate({
      prompt: translate.choices[0].message.content,
      size: "1024x1024",
    });
    return response.data[0].url;
  }
}

module.exports = AiService;
