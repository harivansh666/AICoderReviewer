const express = require("express");

const app = express();

// Middleware to parse JSON request bodies

app.use(express.json());

app.get("/login", (req, res) => {
  res.send("");
});

app.listen(8080, (err) => {
  console.log(`Server is running on port ${8080}`);
});
