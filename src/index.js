/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */

function map(array, fn) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i], i, array));
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial) {

    let start = 0;

    if (typeof initial == 'undefined') {
        initial = array[0];
        start = 1;
    }

    for (let i = start; i < array.length; i++) {
        initial = fn(initial, array[i], i, array);
    }

    return initial;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {

    let array = [];

    for (let key in obj) {
        if (key) {
            let value = key[0].toUpperCase() + key[0].slice(2);

            array.push(value);
        }
    }

    return array;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {

    let newArray = [];
    let start; // вычисляем номер символа, с которого начинаем копировать в зависимости от разных данных
    let end; // которым заканчиваем

    // ограничиваем зону поиска при вводе значений вне диапазона
    if (to > array.length) {
        to = array.length;
    }

    // ограничиваем зону поиска при вводе значений вне диапазона
    if (from < -array.length) {
        from = 0;
    }

    // предусмотрим различные варианты вычисления значений от и до для разных ситуаций
    if ((from >= 0) && (to >= 0)) {
        start = from;
        end = to;
    }

    if ((from >= 0) && (to < 0)) {
        start = from;
        end = array.length + to;
    }

    if ((from < 0) && (to >= 0)) {
        start = array.length + from;
        to = array.length + to;
    }

    for (let i = start; i < end; i++) {
        newArray.push(array[i]);
    }

    return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let squere = new Proxy(obj, {
        get(target, prop) {
            if (prop in target) {
                return target[prop] * target[prop];
            }
        }
    });

    return squere;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};