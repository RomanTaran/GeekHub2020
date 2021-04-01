const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
  uid: String,
  date: String,
  reduct: String,
});

const Dates = mongoose.model("Dates", dateSchema);

exports.Dates = Dates;
