const asyncHandler = require("express-async-handler");
const City = require("../models/CityModel");

exports.getCity = asyncHandler(async (req, res, next) => {
  const results = await City.find({ governorate: req.params.id });
  res.status(200).json({
    status: "success",
    data: results,
  });
});
