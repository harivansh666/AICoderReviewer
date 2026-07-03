const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { GoogleGenerativeAI } = require("@google/generative-ai");

class AIServiceError extends Error {
  constructor(message, { statusCode = 500, cause } = {}) {
    super(message);
    this.name = "AIServiceError";
    this.statusCode = statusCode;
    this.cause = cause;
  }
}

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY,
);

const SYSTEM_INSTRUCTION = `your are code reviewer for your project, and you will be able to solve the  problem, and error handling give answers in bullet points and very short lines. you can use imogies for good ui
  
  Code Understanding & Context:

Pehle code ka purpose aur context samjho.
Agar context unclear ho, toh clarifying questions poochho.

Issue Identification:
Syntax Errors: Kya code me syntax issues hain?
Logical Bugs: Kya koi wrong implementation ya edge case handling missing hai?
Performance: Kya code optimize ho sakta hai?
Security: Kya koi vulnerability (e.g., SQL injection, XSS, weak encryption) hai?
Solution Providing Strategy:

Clear aur Structured Explanation do, taki user ko samajhne me aasan ho.
Best Practices suggest karo jo industry standards follow karein.
Agar code ka scalability ya integration issue ho toh uska bhi solution batao.
Real-world examples ya documentation references do for better learning.
Feedback Format (React-style bullets ke sath):

 Issue: [Problem Explanation],
 Solution: [Code fix or approach],
 Best Practice: [How to improve code for future]
Interactive Approach:

Agar user ka question vague ho, toh usse aur details maango.
Alternatives aur trade-offs discuss karo, taki user better decision le sake.
Agar koi complex concept ho, toh example code snippets do.
  
  `;

function getModelNames() {
  const envValue = process.env.GEMINI_MODELS;
  if (envValue && envValue.trim()) {
    return envValue
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableGeminiError(err) {
  const status = err?.status ?? err?.response?.status;
  return (
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
}

function getStatusCode(err) {
  return err?.status ?? err?.response?.status ?? err?.statusCode;
}

function getGenerativeModel(modelName) {
  return genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_INSTRUCTION,
  });
}

async function generateWithRetry(model, prompt, { maxAttempts = 4 } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      lastErr = err;
      if (!isRetryableGeminiError(err) || attempt === maxAttempts) break;

      const baseDelayMs = 400;
      const expDelayMs = baseDelayMs * Math.pow(2, attempt - 1);
      const jitterMs = Math.floor(Math.random() * 250);
      await sleep(expDelayMs + jitterMs);
    }
  }
  throw lastErr;
}

async function generateContent(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new AIServiceError("Missing GEMINI_API_KEY", { statusCode: 500 });
  }
  const safePrompt =
    typeof prompt === "string" ? prompt : JSON.stringify(prompt);

  const modelNames = getModelNames();
  let lastErr;

  for (const modelName of modelNames) {
    try {
      const model = getGenerativeModel(modelName);
      return await generateWithRetry(model, safePrompt, {
        maxAttempts: Number(process.env.GEMINI_MAX_ATTEMPTS) || 4,
      });
    } catch (err) {
      lastErr = err;
      const status = getStatusCode(err);
      const retryable = isRetryableGeminiError(err);
      if (!retryable) break;
      if (status !== 503 && status !== 429) break;
      // Try next model if current is overloaded/rate-limited.
    }
  }

  const status = getStatusCode(lastErr);
  if (status === 429 || status === 503) {
    throw new AIServiceError(
      "AI model is temporarily unavailable (high demand). Please try again.",
      { statusCode: 503, cause: lastErr },
    );
  }
  throw new AIServiceError("AI request failed", {
    statusCode: 502,
    cause: lastErr,
  });
}

module.exports = generateContent;
module.exports.AIServiceError = AIServiceError;
