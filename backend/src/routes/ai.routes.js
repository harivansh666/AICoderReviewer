const express = require("express");
const router = express.Router();

const aicontroller = require("../controllers/ai.controller");

router.post("/get-review", aicontroller.getreviewe);

module.exports = router;
