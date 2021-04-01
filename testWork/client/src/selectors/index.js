import { createSelector } from 'reselect'
import moment from "moment";
import 'moment/locale/ru';
moment.locale('ru');

const getMonth = (arr) => {
  const perMonth = arr.map((item) => {
    const date = moment.unix(item.date).format('MMMM');
    return {type: item.type, sum: item.sum, date: date};
  })
  return perMonth;
}

const reduceTypes = (arr) => {
  return arr.reduce(function (r, e) {
    if (!r[e.type]) r[e.type] = Object.assign({}, e)
    else r[e.type].sum += e.sum
    return r;
  }, {});
}

const reduceMonth = (arr) => {
  return arr.reduce(function (r, e) {
    if (!r[e.date]) r[e.date] = Object.assign({}, e)
    else r[e.date].sum += e.sum
    return r;
  }, {});
}

const difValueByKey = (obj1, obj2) => {
  const result = [];
  for (let key in obj1) {
    if (key in obj2) {
      result.push({type: obj1[key].type, sum: obj1[key].sum, diff: (obj1[key].sum - obj2[key].sum)})
    } else {
      result.push({type: obj1[key].type, sum: obj1[key].sum, diff: obj1[key].sum})
    }
  }
  return result;
}

const totalPerTypes = (array) => {
  const perMonth = getMonth(array);
  const currentMonth = perMonth.filter(item => item.date === moment().format('MMMM'));
  const reduceCurrentMonth = reduceTypes(currentMonth);
  const prevMonth = perMonth.filter(item => item.date === moment().subtract(1, "month").format('MMMM'))
  const reducePrevMonth = reduceTypes(prevMonth);
  return difValueByKey(reduceCurrentMonth, reducePrevMonth)
};

const findInd = (arr, i) => {
  return arr.findIndex(item => item.date === moment.months()[i])
}

const totalPerMonth = (array) => {
  const perMonth = getMonth(array);
  const result = [];
  let diff = 0;
  const redMonth = Object.values(reduceMonth(perMonth));
  for (let i = 0; i < 12; i++) {
    if (findInd(redMonth, i) === -1) {
      result.push({month: moment.months()[i], sum: '0', diff: - diff});
      diff = 0;
    } else {
      const index = findInd(redMonth, i)
      result.push({month: moment.months()[i], sum: redMonth[index].sum, diff: redMonth[index].sum - diff})
      diff = redMonth[index].sum;
    }
  }
  return result;
}


const getGoods = state => state.goods

export const getAllGoods = createSelector(
  [getGoods],
  goods => {
    const transormGoods = goods.map(item => {
      const date = moment.unix(item.date);
      return {...item, date: date.calendar({
          sameDay: '[сегодня] HH:mm',
          lastDay: '[вчера] HH:mm',
          lastWeek: 'dddd HH:mm',
          sameElse: 'DD MMMM HH:mm'
      })};
    })
    return transormGoods;
  }
)

export const getTypesInMonth = createSelector(
  [getGoods],
  goods => totalPerTypes(goods)
)

export const getTotalInMonth = createSelector(
  [getGoods],
  goods => totalPerMonth(goods)
)
