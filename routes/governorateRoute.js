const express = require("express");
const { getGovernorate } = require("../controllers/governorateContoller");

const router = express.Router();

router.route("/").get(getGovernorate);

module.exports = router;
