function Csv() {
    //Метод parse
    this.parse = function (string, separator) {
        //Разбиваем исходную строку на массив подстрок по разделителю "перевод строки"
        let arr = string.trim().split('\n');
        //Объявляем функцию поиска разделителя
        function getSeparator(array, sym) {
            let separator;
            sym.forEach(function (element) {
                let arrSymbol = [];
                array.forEach(function (elem) {
                    let count = 0;
                    let position = elem.indexOf(element);
                    while (position !== -1) {
                        count++;
                        position = elem.indexOf(element, position + 1)
                    }
                    arrSymbol.push(count);
                });
                 if(arrSymbol.every(function (el) {
                    return el == arrSymbol[0];})&&arrSymbol[0]!=0){
                    separator = element;
                }
            })
            return separator;
        }
        //Определяем, какой у нас будет разделитель
        if(separator == undefined){
            let symbols = [',',';','\t'];
            separator = getSeparator(arr, symbols);
        }
        //Разбиваем каждый элемент массива на подмассивы по найденному разделителю
        let inputString = [];
        for (let i = 0; i < arr.length; i++) {
            inputString[i]=arr[i].split(separator);
        }
        //Определяем количество строк и столбцов в будущей таблице
        let numberRows = arr.length;
        let numberColumns = inputString[0].length;
        //Создаем таблицу
        let table = [];
        for (let i = 0; i < numberRows; i++) {
            let row = [];
            for (let j = 0; j < numberColumns; j++) {
                row.push(inputString[i][j]);
            }
            table.push(row);
            }
        //Возвращаем таблицу из функции
        return table;
    };
    //Метод generate
    this.generate = function (array, separator){
        let str = array[0].join(separator);
        for(let i = 1; i < array.length; i++){
            str += "\n" + array[i].join(separator);
        }
        return str;
    };
}

//Наследуем CsvArray от Array
CsvArray.prototype = Object.create(Array.prototype);
//Создаем конструктор CsvArray
function CsvArray() {
    this.parse = function (string, separator) {
        let arr = string.trim().split('\n');

        //Объявляем функцию поиска разделителя
        function getSeparator(array, sym) {
            let separator;
            sym.forEach(function (element) {
                let arrSymbol = [];
                array.forEach(function (elem) {
                    let count = 0;
                    let position = elem.indexOf(element);
                    while (position !== -1) {
                        count++;
                        position = elem.indexOf(element, position + 1)
                    }
                    arrSymbol.push(count);
                });
                if (arrSymbol.every(function (el) {
                    return el == arrSymbol[0];
                }) && arrSymbol[0] != 0) {
                    separator = element;
                }
            })
            return separator;
        }

        //Определяем, какой у нас будет разделитель
        if (separator == undefined) {
            let symbols = [',', ';', '\t'];
            separator = getSeparator(arr, symbols);
        }
        //Разбиваем каждый элемент массива на подмассивы по найденному разделителю
        let inputString = [];
        for (let i = 0; i < arr.length; i++) {
            inputString[i] = arr[i].split(separator);
        }
        //Определяем количество строк и столбцов в будущей таблице
        let numberRows = arr.length;
        let numberColumns = inputString[0].length;
        //Создаем таблицу
        for (let i = 0; i < numberRows; i++) {
            let row = [];
            for (let j = 0; j < numberColumns; j++) {
                row.push(inputString[i][j]);
            }
            this.push(row);
        }
    }
    this.generate = function (separator){
        let str = this[0].join(separator);
        for(let i = 1; i < this.length; i++){
            str += "\n" + this[i].join(separator);
        }
        return str;
    };
}
