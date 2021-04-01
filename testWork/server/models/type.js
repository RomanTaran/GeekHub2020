const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  uid: String,
  type: String,
  reduct: String,
});

const Types = mongoose.model("Types", typeSchema);

exports.Types = Types;
