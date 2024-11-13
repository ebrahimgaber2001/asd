const { check } = require("express-validator");
const { ValidationMiddleware } = require("../middleware/ValidationMiddleware");

const egyptianPhoneRegex = /^(01)[0-9]{9}$/;

exports.tableValidation = [
  check("name").isString().withMessage("Name is required").trim().notEmpty(),
  check("phone")
    .matches(egyptianPhoneRegex)
    .withMessage(
      "Phone must be a valid Egyptian number starting with '01' followed by 9 digits"
    )
    .trim()
    .notEmpty(),
  check("count").isNumeric().withMessage("Count must be a number").notEmpty(),
  check("governorate")
    .isMongoId()
    .withMessage("Invalid governorate ID")
    .notEmpty(),
  check("city").isMongoId().withMessage("Invalid city ID").notEmpty(),
  check("village")
    .isString()
    .withMessage("Village is required")
    .trim()
    .notEmpty(),
  check("location").isURL().optional().withMessage("Invalid URL for location"),
  check("descriptionLocation").optional().trim(),
  ValidationMiddleware,
];
