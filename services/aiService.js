require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.AI_APIKEY,
});

class AiService {
  async getFirstStory(DTO) {
    try {
      console.log(DTO);
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `Please write a story on a topic with “${DTO.question}” as the keyword in 50 characters or less, at least 3 sentences in Korean. End with a question to the reader. And 
            Convert the recommended image feeling into text that fits this story is distinguished by 추천하는 이미지 배경: "" in 50 characters or less, and printed together.`,
          },
        ],
      });
      return response.choices[0].message.content;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async getStory(DTO) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `Please write the story that continues "${DTO.question}" in 50 characters or less in Korean, at least 2 sentences. End by asking a question about the situation. And write the appropriate background as 추천하는 배경: "" in 50 characters or less.`,
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
          content: `translate "${img}"in english. Don't use any other word.`,
        },
      ],
    });
    console.log(translate.choices[0].message.content);

    const response = await openai.images.generate({
      prompt: `${translate.choices[0].message.content} `,
      size: "1024x1024",
    });
    return response.data[0].url;
  }
}

module.exports = AiService;
