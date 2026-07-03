const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");
const authRoutes = require("./routes/auth.routes");

app.use(
  cors({
    origin: [
      "https://aicodereviewerbyharivansh666.netlify.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/ai", aiRoutes);
app.use("/api/auth", authRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Database Connected"))
//   .catch((err) => console.log("❌ DB Connection Error:", err));

app.listen(8080, () => {
  console.log(`✅ Server is running on port ${8080}`);
});
