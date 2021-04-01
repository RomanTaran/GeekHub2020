const {Dates} = require("../models/date");
const services = require('../services/services');

exports.get_dates = async (req, res) => {
  try {
    const dates = await Dates.find();
    const filteredDates = dates.filter(date => date.uid === req.user._id)
    res.send(filteredDates);
  } catch (error) {
    res.status(500).send("Ошибка сервера. Перезагрузите страницу");
  }
}

exports.add_dates = async (req, res) => {
  try {
    const {uid, date, reduct} = req.body;
    let dates = new Dates({uid, date, reduct});
    dates = await dates.save();
    res.send(dates);
  } catch (e) {
    res.status(500).send("Ошибка сервера. Перезагрузите страницу");
  }

}

exports.edit_dates = async (req, res) => {
  try {
    const dates = await Dates.findById(req.params.id);
    if (!dates) return res.status(404).send("Дата не найдена в базе данных...");
    if (dates.uid !== req.user._id)
      return res.status(401).send("Изменение даты невозможно. Вы не авторизированы...");
    const {uid, date, reduct} = req.body;
    if (!services.WEEK_DAYS.includes(date))
      return res.status(400).send('Разрешен ввод таких дат: сегодня,вчера, понедельник,' +
        ' вторник, среда, четверг, пятница, суббота, воскресенье');
    const updatedDates = await Dates.findByIdAndUpdate(
      req.params.id,
      {uid, date, reduct},
      {new: true}
    );
    res.send(updatedDates);
  } catch (e) {
    res.status(500).send("Ошибка сервера. Перезагрузите страницу");
  }
}

exports.delete_dates = async (req, res) => {
  try {
    const date = await Dates.findById(req.params.id);
    if (!date) return res.status(404).send("Дата не найдена в базе данных...");
    if (date.uid !== req.user._id)
      return res.status(401).send("Удаление даты невозможно. Вы не авторизированы...");

    const deletedDate = await Dates.findByIdAndDelete(req.params.id);
    res.send(deletedDate);
  } catch (e) {
    res.status(500).send("Ошибка сервера. Перезагрузите страницу");
  }
}
