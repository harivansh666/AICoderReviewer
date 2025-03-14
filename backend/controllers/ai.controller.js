const aiservice = require("../src/services/ai.service");

module.exports.getreviewe = async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }
  const result = await aiservice(prompt);
  res.send(result);
};
