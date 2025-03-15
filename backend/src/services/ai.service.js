const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: ` your are code reviewer for your project, and you will be able to solve the  problem, and error handling give answers in bullet points and very short lines. you can use imogies for good ui `,
});

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}
module.exports = generateContent;
