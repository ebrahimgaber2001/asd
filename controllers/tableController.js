const asyncHandler = require("express-async-handler");
const Table = require("../models/tableModel");
const AppError = require("../utils/AppError");

exports.getTables = asyncHandler(async (req, res, next) => {

    const queryString = req.query;
  let query = {};

  // sorting
  let sort = queryString.sort?.split(",").join(" ") || "-createAt";

  // limit fields
  let fields = queryString.fields?.split(",").join(" ") || "-__v";

  // search
  let keyword = queryString.keyword;
  if (keyword) {
    query.name = { $regex: keyword, $options: "i" };
  }

  // filter
  const skipKeys = ["sort", "keyword", "page", "limit", "fields"];
  Object.keys(queryString).forEach((key) => {
    if (!skipKeys.includes(key)) {
      let queryValue = queryString[key];
      let queryStringValue = JSON.stringify(queryValue);
      let newQueryValue = queryStringValue.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      query[key] = JSON.parse(newQueryValue);
    }
  });

  // pagination
  const page = queryString.page * 1 || 1;
  const limit = queryString.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const endIndex = page * limit;

  const count = await Table.countDocuments(query);
  const numberOfPages = Math.ceil(count / limit);
  const nextPage = endIndex < count ? page + 1 : false;
  const prevPage = skip > 0 ? page - 1 : false;





  const results = await Table.find(query)
  .sort(sort)
  .select(fields)
  .limit(limit)
  .skip(skip);


  res.status(200).json({
    status: "success",
    results: count,
    totalPages: numberOfPages,
    currentPage: page,
    itemsPerPage: limit,
    nextPage: nextPage ? nextPage : null,
    prevPage: prevPage ? prevPage : null,
    data: results,
  });
});

exports.createTable = asyncHandler(async (req, res, next) => {
  const results = await Table.create(req.body);
  res.status(201).json({
    status: "success",
    data: results,
  });
});

exports.getTable = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const table = await Table.findById(id).populate("governorate city");
  if (!table) {
    return next(new AppError("Table not found", 404));
  }
  res.status(200).json({ data: table });
});

exports.deleteTable = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const table = await Table.findById(id);

  if (!table) {
    return next(new AppError("Table not found", 404));
  }
  await table.deleteOne();

  res.status(200).json({ data: "Table deleted successfully" });
});

exports.updateTable = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const table = await Table.findOneAndUpdate(
    {
      _id: id,
    },
    req.body,
    { new: true }
  );
  if (!table) {
    return next(new AppError("Table not found", 404));
  }
  res.status(200).json({ data: table });
});


exports.activeTable = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const table = await Table.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true }
    );
    if (!table) {
      return next(new AppError("Table not found", 404));
    }
    res.status(200).json({ data: 'Table Activated successfully' });
  });
  