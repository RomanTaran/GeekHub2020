function Csv() {
}
//  Метод parse
Csv.prototype.parse = function parse(string, separator) {
  //  Разбиваем исходную строку на массив подстрок по разделителю "перевод строки"
  const arr = string.split('\n');
  //  Объявляем функцию поиска разделителя
  function getSeparator(array, sym) {
    sym.forEach((element) => {
      const arrSymbol = [];
      array.forEach((elem) => {
        let count = 0;
        let position = elem.indexOf(element);
        while (position !== -1) {
          count += 1;
          position = elem.indexOf(element, position + 1);
        }
        arrSymbol.push(count);
      });
      if (arrSymbol.every(el => el === arrSymbol[0]) && arrSymbol[0] !== 0) {
        separator = element;
      }
    });
    return separator;
  }
  //  Определяем, какой у нас будет разделитель
  if (separator === undefined) {
    const symbols = [',', ';', '\t'];
    separator = getSeparator(arr, symbols);
  }
  //  Разбиваем каждый элемент массива на подмассивы по найденному разделителю
  const inputString = [];
  for (let i = 0; i < arr.length; i += 1) {
    inputString[i] = arr[i].split(separator);
  }
  //  Определяем количество строк и столбцов в будущей таблице
  const numberRows = arr.length;
  const numberColumns = inputString[0].length;
  //  Создаем таблицу
  const table = [];
  for (let i = 0; i < numberRows; i += 1) {
    const row = [];
    for (let j = 0; j < numberColumns; j += 1) {
      row.push(inputString[i][j]);
    }
    table.push(row);
  }
  //  Возвращаем таблицу из функции
  return table;
};
//  Метод generate
Csv.prototype.generate = function generate(array, separator) {
  return array.map(elem => elem.join(separator)).join('\n');
};

//  Наследуем CsvArray от Array
CsvArray.prototype = Object.create(Array.prototype);
//  Создаем конструктор CsvArray
function CsvArray() {
}
CsvArray.prototype.parse = function parse(string, separator) {
  const arr = string.split('\n');

  //  Объявляем функцию поиска разделителя
  function getSeparator(array, sym) {
    sym.forEach((element) => {
      const arrSymbol = [];
      array.forEach((elem) => {
        let count = 0;
        let position = elem.indexOf(element);
        while (position !== -1) {
          count += 1;
          position = elem.indexOf(element, position + 1);
        }
        arrSymbol.push(count);
      });
      if (arrSymbol.every(el => el === arrSymbol[0]) && arrSymbol[0] !== 0) {
        separator = element;
      }
    });
    return separator;
  }

  //  Определяем, какой у нас будет разделитель
  if (separator === undefined) {
    const symbols = [',', ';', '\t'];
    separator = getSeparator(arr, symbols);
  }
  //  Разбиваем каждый элемент массива на подмассивы по найденному разделителю
  const inputString = [];
  for (let i = 0; i < arr.length; i += 1) {
    inputString[i] = arr[i].split(separator);
  }
  //  Определяем количество строк и столбцов в будущей таблице
  const numberRows = arr.length;
  const numberColumns = inputString[0].length;
  //  Создаем таблицу
  for (let i = 0; i < numberRows; i += 1) {
    const row = [];
    for (let j = 0; j < numberColumns; j += 1) {
      row.push(inputString[i][j]);
    }
    this.push(row);
  }
};
CsvArray.prototype.generate = function generate(separator) {
  return this.map(elem => elem.join(separator)).join('\n');
};
CsvArray.prototype.getCell = function getCell(str) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  return this[str[1] - 1][letters.indexOf(str[0])];
};

const table = new CsvArray();
table.parse('42,qwe,92\n12,asd,73');
console.log(table.length, table[0][0], table[1][2]);
table[0][0] = 'zxc';
console.log(table.generate());
console.log(table.getCell('C2'));
