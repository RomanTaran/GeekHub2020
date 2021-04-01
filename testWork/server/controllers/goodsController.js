const {Good} = require("../models/good");
const {Types} = require("../models/type");
const moment = require('moment');
let now = moment();
const service = require('../services/services')

exports.get_goods = async (req, res) => {
  try {
    const goods = await Good.find();
    const filteredGoods = goods.filter(good => good.uid === req.user._id);
    res.send(filteredGoods);
  } catch (error) {
    res.status(500).send("Внутренняя ошибка сервера. Перезагрузите страницу");
  }
}

exports.add_goods = async (req, res) => {
  try {
    const {uid, good} = req.body;
    const test_sum = /^\d+$/;
    let sumIndex, date, type, sum, comment = '';
    const strArray = good.split(/\s+/);
    for (let i = strArray.length - 1; i > 0; i--) {
      if (strArray[i].match(test_sum)) {
        sumIndex = i;
        break;
      }
    }
    if (sumIndex < strArray.length) {
      for (let i = sumIndex + 1; i < strArray.length; i++) {
        comment += strArray[i] + ' ';
      }
    }
    comment = comment.trim();
    switch (sumIndex) {
      case 1: {
        date = now.format('X');
        sum = strArray[1];
        type = strArray[0];
      }
        break;
      case 2: {
        date = service.getDate(strArray[0]).format('X');
        sum = strArray[2];
        type = strArray[1];
      }
        break;
      case 3: {
        const temp = await service.getFullDate(strArray[1], strArray[0]);
        if (temp) {
          date = temp;
        } else {
          res.status(500).send("Сокращение не найдено. Добавьте его в базу данных");
          return;
        }
        sum = strArray[3];
        type = strArray[2];
      }
        break;
      default: {
        return res.status(500).send("Введите корректную запись");
      }
    }
    const findType = await Types.findOne({reduct: `${type}`}).exec();
    if (findType) type = findType.type;
    let newGood = new Good({uid, date, type, sum, comment});
    newGood = await newGood.save();
    res.send(newGood);
  } catch (err) {
    res.status(500).send("Перезагрузите страницу и попробуйте еще раз");
  }
}

exports.edit_goods = async (req, res) => {
  try {
    const good = await Good.findById(req.params.id);
    if (!good) return res.status(404).send("Запись не найдена...");
    if (good.uid !== req.user._id)
      return res.status(401).send("Изменение записи невозможно. Вы не авторизованы...");

    let {date, type, sum, comment} = req.body.good;
    if (date !== good.date) {
      if (date === '') {
        date = now.format('X');
      } else {
        const strArray = date.split(/\s+/);
        if (strArray.length === 1) date = service.getDate(strArray[0]).format('X');
        if (strArray.length === 2) {
          const temp = await service.getFullDate(strArray[1], strArray[0]);
          if (temp) {
            date = temp;
          } else {
            res.status(500).send("Сокращение не найдено. Добавьте его в базу данных");
            return;
          }
        }
      }
    }
    const findType = await Types.findOne({reduct: `${type}`}).exec();
    if (findType) type = findType.type;
    const updatedGood = await Good.findByIdAndUpdate(
      req.params.id,
      {date, type, sum, comment},
      {new: true}
    );
    res.send(updatedGood);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка при редактировании данных. Перезагрузите страницу и попробуйте еще раз");
  }

}

exports.delete_goods = async (req, res) => {
  try {
    const good = await Good.findById(req.params.id);
    if (!good) return res.status(404).send("Запись не найдена...");
    if (good.uid !== req.user._id)
      return res.status(401).send("Удаление записи невозможно. Вы не авторизованы...");

    const deletedGood = await Good.findByIdAndDelete(req.params.id);

    res.send(deletedGood);
  } catch (err) {
    res.status(500).send("Ошибка при удалении данных. Перезагрузите страницу и попробуйте еще раз");
  }
}
