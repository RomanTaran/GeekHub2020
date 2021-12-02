const {TimesText} = require("../models/timesText");

exports.get_timesText = async (req, res) => {
  try {
    const timesText = await TimesText.find();
    res.send(timesText);
  } catch (error) {
    res.status(500).send("Внутренняя ошибка сервера. Перезагрузите страницу");
  }
}
