const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;