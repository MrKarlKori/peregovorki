/*
@constructor{Calender} - конструктор календаря
@param{object} el - елемент на странице куда вставлять календарь
@param{boolean} allowChangeMonth - разрешает ли изменять месяцы (из настроек)
@param{boolean} allowAddTasks - разрешает добавление коментариев к ячейке календаря или нет (из настроек)
@param{boolean} allowRemoveTasks - разрешает удаление коментариев из ячейки календаря или нет (из настроек)
@param{string} allowRemoveTasks - разрешает удаление коментариев из ячейки календаря или нет (из настроек)
@param{boolean} date - дата камендаря в формате год/ месяц (из настроек)
@param{object} page - страницы приложения */


/*ползунок с текущим временем*/
class SliderTimeNow {
    constructor(){
        this.date = new Date();
        this.hour = this.date.getHours();
        this.minute = this.date.getMinutes();
    }
    showTime(el){
        this.date = new Date();
        this.hour = this.date.getHours();
        this.minute = this.date.getMinutes();
        el.innerHTML = this.hour + ':' + this.minute;
        let HOUR = 60; //minute
        let EIGHT = 480; //minute
        let COEFFICIENT = 0.103; //из пропорции 100% - ((100%/16)/2) - 900min ; x% - 1min
        let COEFFICIENT1 = 0.8; // на глаз т.к. блок div с временем дает смещение
        let left = (this.hour * HOUR + this.minute - EIGHT) * COEFFICIENT;
        el.style.left = left + (100/16)/2 - COEFFICIENT1  + "%";
        let arrT = document.querySelectorAll('.timeline__hour');
        [].forEach.call(arrT, (el)=>{
            let a = el.textContent.split(':').splice(0,1).join();

            if(this.hour < a){
                el.style.color = '#252525';
            }
        });

    }
    deleteTimeSlider(elem){
        let el = document.querySelector(elem);

        if(el){
            el.parentNode.removeChild(el)
        }

    }
    getTimeNow(elem){
        let el = document.querySelector(elem);
        if( this.hour > 8 && this.hour < 23 ){
            this.showTime(el);

            setInterval(()=>{
                this.showTime(el);
            }, 500) // обновление через каждую минуту

        } else {
            el.style.display = 'none';
        }
    }
    static createTimeBox(){
        let box = document.createElement('div');
        box.className = 'time_box';
        box.id = 'timeBox';
        return box;
    }
}

//текущая дата
class GetDataNow{
    constructor(){
    }
    getDataNow(year,month,day){
        this.data = year ? new Date(year,month,day) : new Date() ;
        this.year = this.data.getFullYear() ;
        this.month = this.data.getMonth();
        this.day = this.data.getDate();
    }
}

//переменные
let calendarDataPrevButton = document.querySelector('#calendar_data_prev_button');
let dataNow = document.querySelector('#data_now');
let calendarNew = document.querySelector('#calendarNew');
let calendarDataNextButton = document.querySelector('#calendar_data_next_button');
let monthNameLarge = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
let monthNameSlim = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
let timeNow = new SliderTimeNow();
let timeSliderBox = document.querySelector("#timeSliderBox");
let dataInCal = new GetDataNow();



//отображение текущей даты
dateShow();

//отображение календаря
showCalender ();

if( dataInCal.year + ' ' + dataInCal.month + ' ' + dataInCal.day !==  new Date().getFullYear() + ' ' + new Date().getMonth() + ' ' + new Date().getDate()){
    timeSliderBox.appendChild( SliderTimeNow.createTimeBox() );
    timeNow.getTimeNow('#timeBox');
}

calendarDataPrevButton.addEventListener('click', ()=>{
    --dataInCal.day;
    dateShow(dataInCal.year, dataInCal.month, dataInCal.day);

});

calendarDataNextButton.addEventListener('click', ()=>{
    ++dataInCal.day;
    dateShow(dataInCal.year, dataInCal.month, dataInCal.day);
});

dataNow.addEventListener('click',()=>{
    calendarNew.classList.toggle("show_none");
    dataNow.classList.toggle("data_now_active");
});

calendarNew.addEventListener('click', (ev)=>{

    if( ev.target.tagName !== 'TD') return;
    if( ev.target.textContent === '') return;

    let a = ev.target.parentNode.parentNode.parentNode;
    let b = a.querySelector('h2').innerText.split(' ');

    monthNameLarge.forEach((month, i)=>{
        if(month === b[0]){
            dateShow(b[1], i, ev.target.textContent);
        }
    });
});

//функция для отображения текущей даты
function dateShow(year,month,day) {
    dataInCal.getDataNow(year,month,day);
    dataNow.innerHTML = '<p>' + dataInCal.day + " " + addNameMonth(dataInCal.month, monthNameSlim)  + " " + dataInCal.year + '</p>';

    if( dataInCal.year + ' ' + dataInCal.month + ' ' + dataInCal.day !==  new Date().getFullYear() + ' ' + new Date().getMonth() + ' ' + new Date().getDate()){
        timeNow.deleteTimeSlider('#timeBox');
    } else {
        timeSliderBox.appendChild( SliderTimeNow.createTimeBox() );
        timeNow.getTimeNow('#timeBox');
    }
}

//функция отображения календаря
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

//конструктор календаря
function Calender ( {el} ) {
    let dateInCalender = new Date();
    let year = dateInCalender.getFullYear();
    let month = dateInCalender.getMonth();

    /*создаем и вставляем оболочку для календаря*/
    let calender = createElementFunc ( el, 'div', 'calendar', el + 'calendar');

    /*создаем и вставляем кнопки управления*/
    let butPrev = createElementFunc ( el, 'button', 'prev__button', el + 'prev_button');
    let butNext = createElementFunc ( el, 'button', 'next__button', el + 'next_button');

    butPrev.innerHTML = '<i class="fas fa-angle-left">';
    butNext.innerHTML = '<i class="fas fa-angle-right">';

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






