const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true},
  text: String,
  img:String,
  textFull:String,
});

module.exports = mongoose.model("service", ServicesSchema);