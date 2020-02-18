/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

/*языковые данные*/
const LOAD = 'Загрузка...';
const RELOAD = 'Повторить загрузку';
const DATA = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
let townsList = [];

//сортировка
function sortByAsc(arr) {
    arr.sort((a, b) => a.name > b.name ? 1 : -1);
}

//загрузка городов
function loadTowns() {
    let myPromise = new Promise(async function(resolve, rejected) {
        try {
            let response = await fetch(DATA);
            let towns = await response.json();
            sortByAsc(towns);
            makeTownList(towns);
            resolve(towns);
            townsList = towns;
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';
            filterResult.style.display = 'none';
            document.querySelector('button').remove();

        } catch {
            rejected();
        }

    });

    return myPromise;
}

// проверка на вхождение 
function isMatching(full, chunk) {

    if (full.toLowerCase().indexOf(chunk.toLowerCase()) == -1) {
        return false;
    }

    return true;
}

// построение блока с городами
function makeTownList(towns) {

    towns.reduce(function(previousValue, currentValue, index, array) {
        let div = document.createElement('div');
        div.textContent = currentValue.name;
        filterResult.append(div);
    });
}

function reloadTownList(towns) {
    let button = document.createElement('button');
    button.textContent = RELOAD;
    homeworkContainer.append(button);
    button.onclick = loadTowns;
}

const loadingBlock = homeworkContainer.querySelector('#loading-block'); /* Блок с надписью "Загрузка" */
const filterBlock = homeworkContainer.querySelector('#filter-block'); /* Блок с текстовым полем и результатом поиска */
const filterInput = homeworkContainer.querySelector('#filter-input'); /* Текстовое поле для поиска по городам */
const filterResult = homeworkContainer.querySelector('#filter-result'); /* Блок с результатами поиска */

loadTowns().then(function(towns) {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
}, function(towns) {
    reloadTownList(towns);
});

filterInput.addEventListener('keyup', function() {
    filterResult.innerHTML = '';
    makeTownList(townsList);
    if (filterInput.value !== '') {
        filterResult.style.display = 'block';
        let townList = filterResult.querySelectorAll('div');
        for (let item of townList) {
            if (!isMatching(item.textContent, filterInput.value)) {
                item.remove();
            }
        }
    } else {
        filterResult.innerHTML = '';
    }
});


export {
    loadTowns,
    isMatching
};