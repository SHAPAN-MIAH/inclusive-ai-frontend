// // eslint-disable-next-line @typescript-eslint/no-var-requires
// // const { Configuration, OpenAIApi } = require("openai");

import { Configuration, OpenAIApi } from "openai";
const API_KEY = "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";
const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function sendMessageToOpenAi(message: string) {
  const res = await openai.createCompletion(
    {
      model: "gpt-3.5-turbo",
      prompt: message,
      max_tokens: 80,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }

  );

  return res.data.choices[0].text;
}







// import { Configuration, OpenAIApi } from "openai";

// const API_KEY = "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";

// const configuration = new Configuration({
//   apiKey: API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// export async function sendMessageToOpenAi(message: string): Promise<string> {
//   try {
//     const response = await openai.createCompletion({
//       model: "text-davinci-002",
//       prompt: message,
//       temperature: 0.7,
//       max_tokens: 50,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });

//     return response.data.choices[0].text;

//   } catch (error) {
//     console.error("Error fetching response:", error);
//     throw error;
//   }
// }


