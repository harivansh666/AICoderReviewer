require("dotenv").config();
const express = require("express");
const app = express();

const aiRoutes = require("../routes/ai.routes");

// Middleware to parse JSON request bodies

app.use(express.json());

app.use("/ai", aiRoutes);

app.listen(8080, (err) => {
  console.log(`Server is running on port ${8080}`);
});
