const aiservice = require("../src/services/ai.service");

module.exports.getreviewe = async (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).send("code is required");
  }
  const result = await aiservice(code);
  res.send(result);
};
