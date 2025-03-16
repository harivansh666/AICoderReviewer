require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const aiRoutes = require("../routes/ai.routes");
app.use(cors());

app.use(
  cors({
    origin: "https://aicoderreviewer-client.onrender.com",
    methods: "GET, POST",
    credentials: true,
  })
);
app.use(cors());

app.use(express.json());

app.use("/ai", aiRoutes);

app.listen(8080, (err) => {
  console.log(`Server is running on port ${8080}`);
});
