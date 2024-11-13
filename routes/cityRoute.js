const express = require("express");
const { getCity } = require("../controllers/cityContoller");

const router = express.Router();

router.route("/:id").get(getCity);

module.exports = router;
