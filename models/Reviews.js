const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  name: String,
  ava: String,
  text: String,
});

module.exports = mongoose.model("review", ReviewsSchema);