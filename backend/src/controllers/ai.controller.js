const aiservice = require("../services/ai.service");

module.exports.getreviewe = async (req, res) => {
  try {
    const code = req.body?.code;
    if (!code) {
      return res.status(400).json({ error: "code is required" });
    }
    const result = await aiservice(code);
    return res.send(result);
  } catch (err) {
    const statusCode =
      err?.statusCode ||
      err?.status ||
      (err?.name === "AIServiceError" ? err.statusCode : undefined) ||
      500;

    const message =
      err?.message || "Unexpected error while generating review";

    return res.status(statusCode).json({ error: message });
  }
};
