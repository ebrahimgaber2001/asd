const mongoose = require("mongoose");

// Table Schema
const tableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  count: { type: Number, required: true },
  description: { type: String },
  governorate: { type: mongoose.Schema.Types.ObjectId, ref: "Governorate", required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  village: { type: String, required: true },
  location: { type: String },
  descriptionLocation: { type: String },
  status: {type: Boolean, default: false},
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
