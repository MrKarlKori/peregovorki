/*
@constructor{Calender} - конструктор календаря
@param{object} el - елемент на странице куда вставлять календарь
@param{boolean} allowChangeMonth - разрешает ли изменять месяцы (из настроек)
@param{boolean} allowAddTasks - разрешает добавление коментариев к ячейке календаря или нет (из настроек)
@param{boolean} allowRemoveTasks - разрешает удаление коментариев из ячейки календаря или нет (из настроек)
@param{string} allowRemoveTasks - разрешает удаление коментариев из ячейки календаря или нет (из настроек)
@param{boolean} date - дата камендаря в формате год/ месяц (из настроек)
@param{object} page - страницы приложения */


/*let calendarBox = document.querySelector('#calendarNew');
let d = new Calender(calendarBox, true, false, true);
calendarBox.appendChild(d);*/



let calendarDataPrevButton = document.querySelector('#calendar_data_prev_button');
let dataNow = document.querySelector('#data_now');
let calendarDataNextButton = document.querySelector('#calendar_data_next_button');

let d = new Date();

let year = d.getFullYear();
let month = d.getMonth();
let day = d.getDate();

console.log(year);
console.log(month);
console.log(day);


let monthNameLarge = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
let monthNameSlim = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

dataNow.innerHTML = d.getDate() + " " + addNameMonth(month, monthNameSlim)  + " " + year + ' - Cегодня';

calendarDataPrevButton.addEventListener('click', ()=>{
    --day;
    let g = new Date(year, month, day);
    dataNow.innerHTML = g.getDate() + " " + addNameMonth(g.getMonth(), monthNameSlim) + " " + g.getFullYear();
});

calendarDataNextButton.addEventListener('click', ()=>{
    ++day;
    let g = new Date(year, month, day);
    dataNow.innerHTML = g.getDate() + " " + addNameMonth(g.getMonth(), monthNameSlim) + " " + g.getFullYear();
});

let fff = document.querySelector('#calendarNew');
fff.addEventListener('click', (ev)=>{

    if( ev.target.tagName !== 'TD') return;
    if( ev.target.textContent === '') return;

    console.log(ev.target.parentNode.parentNode.parentNode);
    let a = ev.target.parentNode.parentNode.parentNode;
    console.log(a.querySelector('h2').innerText);

    day = ev.target.textContent;
    let g = new Date(year, month, day);
    dataNow.innerHTML = g.getDate() + " " + addNameMonth(g.getMonth(), monthNameSlim) + " " + g.getFullYear();
});

showCalender ();

function showCalender () {
    let createCalenderScript = document.querySelector('#calendarNew');
    let idForCalender = 'preview';

    /*создаем обвертку для вставляемого календаря, чтоб использовать несколько на странице*/
    let calenderAddBox = document.createElement('div');
    calenderAddBox.id = idForCalender;
    createCalenderScript.appendChild(calenderAddBox);

    /*запускаем конструктор календаря*/
    new Calender({
        el: "#" + idForCalender,
    })
}

function Calender ( {el} ) {
    let dateInCalender = new Date();
    let year = dateInCalender.getFullYear();
    let month = dateInCalender.getMonth();

    /*создаем и вставляем оболочку для календаря*/
    let calender = createElementFunc ( el, 'div', 'calendar', el + 'calendar');

    /*создаем и вставляем кнопки управления*/
    let butPrev = createElementFunc ( el, 'button', 'prev__button', el + 'prev_button');
    let butNext = createElementFunc ( el, 'button', 'next__button', el + 'next_button');

    butPrev.innerHTML = '<';
    butNext.innerHTML = '>';

    /*отрисовка календаря*/
    CreateCalendar ( el + 'calendar' , year, month, el);

    /*обрабботчики для кнопок управления*/
    butPrev.addEventListener('click', function() {
        CreateCalendar (el + 'calendar', year, month = month - 3, el);
    });

    butNext.addEventListener('click', function() {
        CreateCalendar (el + 'calendar', year, month = month + 3, el);
    });
}

/*функция создание календаря*/
function CreateCalendar(element, year, month) {

    let elem = document.getElementById(element);

    let dataInCalenderPrev = new Date(year, month - 1);
    let dataInCalenderNow = new Date(year, month);
    let dataInCalenderNext = new Date(year, month + 1);

    const PREVMONTH = dataInCalenderPrev.getMonth();
    const THISMONTH = dataInCalenderNow.getMonth();
    const NEXTMONTH = dataInCalenderNext.getMonth();

    function cal(dataInCalender,MONTH){
        let daysOfLastMonth = '', daysOfThisMonth = '', daysNextMonth = '';
        /*шапка календаря*/
        let calenderHead = "<thead><tr><th colspan='7'><h2>" + addNameMonth(MONTH, monthNameLarge) + ' ' + dataInCalender.getFullYear() + "</h2></th></tr></thead>";

        /*тело календаря*/
        let nameDays = '<tbody><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th>' +
            '<th>вс</th></tr><tr>';

        // заполнить первый ряд от понедельника и до дня, с которого начинается месяц * * * | 1  2  3  4
        for (let i = 0; i < getNumDay(dataInCalender); i++) {
            daysOfLastMonth += '<td></td>';

        }

        // ячейки календаря с датами
        while (dataInCalender.getMonth() === MONTH) {
            daysOfThisMonth += '<td>' + dataInCalender.getDate() + '</td>';
            if (getNumDay(dataInCalender) % 7 === 6) { // вс, последний день - перевод строки
                daysOfThisMonth += '</tr><tr>';
            }
            dataInCalender.setDate(dataInCalender.getDate() + 1);
        }

        // добить таблицу пустыми ячейками, если нужно
        if (getNumDay(dataInCalender) !== 0) {
            for (let i = getNumDay(dataInCalender); i < 7; i++) {
                daysNextMonth += '<td></td>';
            }
        }
        //собираем таблицу
        return '<table>' + calenderHead + nameDays + daysOfLastMonth + daysOfThisMonth + daysNextMonth + '</tr></tbody></table>';
    }
    elem.innerHTML = cal(dataInCalenderPrev,PREVMONTH) + cal(dataInCalenderNow,THISMONTH) + cal(dataInCalenderNext,NEXTMONTH);
}

/*функция получения номера дня недели от 0(пн) до 6(вс)(по стандарту 0(вс) до 6(сб))*/
function getNumDay(date) {
    let day = date.getDay();
    if (day === 0) {
        day = 7; //если вс = 0 - по стандарту, приравниваем к 7, возвращаем =6!
    }
    return day - 1; // если пн = 1 - по стандарту, становиться 0 по функции
}

/*функция получения названия месяца*/
function addNameMonth(month, arrMonthName) {
    let nameMonth = '';
    arrMonthName.forEach( function(item, i) {
        if (month === i) {
            nameMonth += item;
        }
    });
    return nameMonth;
}

/*конструктор элементов помещаемых на страницу*/
function createElementFunc (parentElId, nameElem, classNameEl, idNameEl) {
    let newElement = document.createElement(nameElem);
    newElement.className = classNameEl;
    newElement.id = idNameEl;
    return document.querySelector(parentElId).appendChild(newElement);
}




