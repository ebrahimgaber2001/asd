const asyncHandler = require("express-async-handler");
const Governorate = require("../models/governorateModel");

exports.getGovernorate = asyncHandler(async (req, res, next) => {
  const results = await Governorate.find();
  res.status(200).json({
    status: "success",
    data: results,
  });
});
