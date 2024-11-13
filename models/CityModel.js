const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  governorate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Governorate",
    required: true,
  },
  code: { type: String, required: true },
  name: { type: String, required: true },
  namePrimaryLang: { type: String, required: true },
  nameSecondaryLang: { type: String, required: true },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
