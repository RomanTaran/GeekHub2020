const mongoose = require("mongoose");

const goodSchema = new mongoose.Schema({
  uid: String,
  date: String,
  type: String,
  sum: Number,
  comment: String,
});

const Good = mongoose.model("Good", goodSchema);

exports.Good = Good;
