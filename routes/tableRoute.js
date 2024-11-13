const express = require("express");
const { getTable, getTables, createTable, updateTable, deleteTable, activeTable } = require("../controllers/tableController");
const { tableValidation } = require("../utils/TableValidation");
const { protect } = require("../controllers/authController");

const router = express.Router();


router.route("/").get(getTables).post(tableValidation,createTable);


router.route("/:id").get(getTable).put(tableValidation,updateTable).delete(deleteTable);
router.route("/active/:id").put(protect,activeTable);


module.exports = router;
