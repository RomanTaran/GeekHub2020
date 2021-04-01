const moment = require('moment');
const {Dates} = require("../models/date")
let now = moment();
const WEEK_DAYS = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'сегодня', 'вчера'];

const getDate = (str) => {
  return moment({hour: str.substr(0, 2), minute: str.substr(3, 2)});
};

const getFullDate = async (str, day) => {
  try {
    const foundDay = await Dates.findOne({reduct: `${day}`}).exec();
    if (foundDay) {
      let inputDay = WEEK_DAYS.indexOf(foundDay.date);
      if (inputDay === 7) return getDate(str);
      if (inputDay === 8) return getDate(str).subtract(1, 'day');
      if (now.day() === inputDay) return getDate(str).subtract(7, 'day');
      if (now.day() > inputDay) {
        const delta = now.day() - inputDay;
        return getDate(str).subtract(delta, 'day')
      }
      if (now.day() < inputDay) {
        const delta = now.day() - inputDay + 7;
        return getDate(str).subtract(delta, 'day')
      }
    }
  } catch (e) {
    return new Error(e);
  }
}

module.exports.getDate = getDate;
module.exports.getFullDate = getFullDate;
module.exports.WEEK_DAYS = WEEK_DAYS;
