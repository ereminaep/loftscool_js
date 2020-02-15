/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */



function delete_cookie(cookie_name) {
    var cookie_date = new Date(); // Текущая дата и время
    cookie_date.setTime(cookie_date.getTime() - 1);
    document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}


// функция работы с таблицей куков (или кук)
function cookieEditor(listTable) {
    let editor = {};

    //превращаем таблицу с куками в массив с объектами. с ключами и значениями
    editor.parserCookie = function() {
        let objectCookie = [];
        let key = 0;

        for (let item of document.cookie.split(';')) {

            let [name, value] = [item.split('=')[0], item.split('=')[1]];

            objectCookie[key] = {
                'name': name,
                'value': value
            }

            key++;
        }

        return objectCookie;
    }

    // метод делает строку и кладет в нее все, что есть в массиве аргументов. в массиве аргументов пары вида ключ, значение
    editor.makeRow = function(array, key) {
        let tr = document.createElement('tr');
        for (let item of array) {
            let element = document.createElement(item.name);

            [element.textContent, element.dataset.type] = [item.value, item.name];

            tr.append(element);
        }
        tr.dataset.id = key;
        return tr;
    }

    // построение таблицы
    editor.createCookieTable = function() {

        listTable.innerHTML = '';
        let cookie = this.parserCookie();
        let key = 0;
        for (let item of cookie) {

            let tr = this.makeRow([{
                'name': 'td',
                'value': item.name,
            }, {
                'name': 'td',
                'value': item.value,
            }, {
                'name': 'button',
                'value': 'Удалить',
            }], key);

            listTable.append(tr);
            key++;
        }
    }

    // добавление в таблицу
    editor.addInCookieTable = function(name, value) {
        document.cookie = name + '=' + value;
        this.createCookieTable();
    }

    // удаление из таблицы
    editor.removeInCookieTable = function(name) {
        let cookieDate = new Date(); // Текущая дата и время
        cookieDate.setTime(cookieDate.getTime() - 1);
        document.cookie = name += "=; expires=" + cookieDate.toGMTString();
        this.createCookieTable();
    }

    // фильтрация по полю
    editor.filterCookieTable = function(filterValue) {
        let tdCollection = listTable.querySelectorAll('tr');
        for (let item of tdCollection) {
            if ((item.childNodes[0].textContent.indexOf(filterNameInput.value) == -1) && (item.childNodes[1].textContent.indexOf(filterNameInput.value) == -1)) {
                item.innerHTML = '';
            }
        }
    }

    return editor;

}

const homeworkContainer = document.querySelector('#homework-container'); // текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input'); // текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input'); // текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input'); // кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button'); // таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let editor = new cookieEditor(listTable);

editor.createCookieTable();
editor.filterCookieTable(filterNameInput.value);

filterNameInput.addEventListener('keyup', function() {
    editor.createCookieTable();
    editor.filterCookieTable(filterNameInput.value);
});

addButton.addEventListener('click', () => {
    editor.addInCookieTable(addNameInput.value, addValueInput.value);
});

listTable.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        editor.removeInCookieTable(e.target.parentNode.firstChild.textContent);
    }
});