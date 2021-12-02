const mongoose = require("mongoose");

const timesTextSchema = new mongoose.Schema({
    uid: String,
    text: String,
    correctWord: String,
    wordPos: Number
});

const TimesText = mongoose.model("TimesText", timesTextSchema);

exports.TimesText = TimesText;
