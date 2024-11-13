const mongoose = require("mongoose");

const governorateSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  namePrimaryLang: { type: String, required: true },
  nameSecondaryLang: { type: String, required: true }
});

const Governorate = mongoose.model("Governorate", governorateSchema);

module.exports = Governorate;
