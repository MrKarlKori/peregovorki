let floorsInPage = new Set();
let parent = document.querySelector('.conf-rooms');
let eventBus = new EventBus();

eventBus.on('отрисовать комнаты',(roomT)=>{
    console.log(roomT);
    let r = roomT.data.rooms;
    r.forEach( el => {
        floorsInPage.add(el.floor);
    });

    floorsInPage.forEach( el => {
        showFloor(el, parent);
    });

    let floors = document.querySelectorAll('.floor');

    [].forEach.call(floors, floor => {
        r.forEach( room => {

            if( +floor.innerText.slice(0,1) === room.floor ){
                showRoom(room.title, room.capacity, floor );
            }
        });
    });

    eventBus.trigger('отрисовать встречи')
});

function showFloor(florName, parent) {
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="floor">
            <span> ${florName} ЭТАЖ </span>
        </div>
    `;
    parent.appendChild(div);
}

function showRoom(roomName, capacity, parent ) {
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="floor__room">
            <div class="room__name">
                <div class="room-name__person">
                    ${roomName}
                </div>
                <div class="room-name__count">
                    ${capacity} человек
                </div>
            </div>
            <div class="room__time"></div>
        </div>
    `;
    parent.appendChild(div);
}


let eventS = [
    {
        dateEnd: 12,
        dateStart: 8,
        id: "1",
        room: 'Деньги',
        title: "ШРИ 2018 - начало",
        users: null
    },
    {
        dateEnd: 23,
        dateStart: 20,
        id: "1",
        room: 'Деньги',
        title: "ШРИ 2018 - начало",
        users: null
    },{

        dateEnd: 16,
        dateStart: 12,
        id: "2",
        room: 'Карты',
        title: "👾 Хакатон 👾",
        users: null
    },{

        dateEnd: 24,
        dateStart: 18,
        id: "2",
        room: 'Карты',
        title: "👾 Хакатон 👾",
        users: null
    },{
        dateEnd: 20,
        dateStart: 16,
        id: "3",
        room: 'Ствола',
        title: "🍨 Пробуем kefir.js",
        users: null
    },{
        dateEnd: 11,
        dateStart: 8,
        id: "3",
        room: 'Ствола',
        title: "🍨 Пробуем kefir.js",
        users: null
    }
];

eventBus.on('отрисовать встречи',()=>{
    let rooms = document.querySelectorAll('.room-name__person');
    [].forEach.call(rooms, roomName => {
        var newArr = [];

        eventS.forEach(eventS => {
            if(roomName.innerText === eventS.room){
                newArr.push(eventS);
            }
        });
        let parent = roomName.parentNode.parentNode.querySelector('.room__time');
        b(newArr, parent);
        newArr = [];

    });
});




function showEvent(elem, className, width, left){
    let el = document.createElement('div');
    el.className = className;
    el.style.width = Math.round( width * 100 ) / 100 + '%';
    el.style.left = Math.round( left * 100 ) / 100  + '%';
    return elem.appendChild(el)
}

function b(arr, elem) {
    let COEFFICIENT = 6.6666666667; //из пропорции 100% - ((100%/16)/2) - 900min ; x% - 1min

    if( arr.length === 0){
        a('timeline__free',  23  * COEFFICIENT,  8  * COEFFICIENT);
        return;
    }

    arr.forEach((el,i)=>{
        let left = ( el.dateStart - 8) * COEFFICIENT;
        let width =  ( el.dateEnd - el.dateStart ) * COEFFICIENT;

        if( arr[i - 1] === undefined && arr[i + 1] === undefined){
            if( 8  - el.dateStart < 0){
                a('timeline__free', ( el.dateStart - 8 ) * COEFFICIENT , 0)
            }
            a('timeline__busy', width, left);
            if( el.dateEnd < 23){
                a('timeline__free', ( 23 - el.dateEnd ) * COEFFICIENT, ( el.dateEnd - 8 ) * COEFFICIENT)
            }
            return
        }

        if( arr[i - 1] === undefined ){
            if( 8  - el.dateStart < 0){
                a('timeline__free', ( el.dateStart - 8 ) * COEFFICIENT , 0)
            }
            a('timeline__busy', width, left);
            return
        }

        if( arr[i - 1].dateEnd ){
            if( arr[i - 1].dateEnd  - el.dateStart < 0){
                a('timeline__free', ( el.dateStart - arr[i - 1].dateEnd ) * COEFFICIENT, (arr[i - 1].dateEnd - 8) * COEFFICIENT )
            }
            a('timeline__busy', width, left);
        }

        if( arr[i + 1] === undefined ){
            if( el.dateEnd < 23){
                a('timeline__free', ( 23 - el.dateEnd ) * COEFFICIENT, ( el.dateEnd - 8 ) * COEFFICIENT)
            }
        }
    });

    function a(className, width, left) {
        showEvent(elem, className, width, left)
    }
}


/**/
let classNameBusyBox = 'timeline__busy';
let classNameFreeBox = 'timeline__free';
let classNameBlueButtonWithPlus = 'button__plus';
let classNameBlueButtonCreateMeet = 'meeting meeting__new';
let classNameDeleteButtonCreateMeet = 'button button__default delete_meet_button';
let mainPage = document.querySelector('.main');
let footerNew = document.querySelector('.footer__new');




//обработчик mouseover
document.body.addEventListener('mouseover', (ev)=>{
    let target = ev.target;
    if( target.className !== classNameFreeBox) return;
    createBluButton (target);
});

//обработчик mouseout
document.body.addEventListener('mouseout', (ev)=>{
    let target = ev.target;
    if(target.className !== classNameBlueButtonWithPlus) return;
    deleteBluButton (target);
});

//обработчик click
document.body.addEventListener('click', (ev)=>{
    let target = ev.target;

    if(target.className === classNameBlueButtonWithPlus) {
        let pageCreateMeet = document.querySelector('.meeting__new');
        console.log(pageCreateMeet);
        if( pageCreateMeet.style.display = 'none'){
            pageCreateMeet.style.display = 'block';
            footerNew.style.display = 'block';



            mainPage.style.display = 'none';
        }

        nameFloor = target.closest('.floor').querySelector('span').innerText;
        nameRoom = target.closest('.floor__room').querySelector('.room-name__person').innerText;

    }

    if( target.className === classNameBusyBox) {
        let changeMeetPage = document.querySelector('.change_meet_page');
        if( changeMeetPage.classList.contains('none_show')){
            changeMeetPage.classList.remove('none_show');
        }
    }

    if( target.className === classNameBlueButtonCreateMeet) {
        addMeet(nameFloor,nameRoom);
    }

    if( target.className ===  classNameDeleteButtonCreateMeet) {

    }
});

//создание голубой кнопки на свободной зоне
function createBluButton (elem) {
    let delBut = document.querySelectorAll('.button__plus');
    [].forEach.call(delBut, (el)=>{
        el.parentNode.removeChild(el);
    });
    elem.innerHTML = '<button class="button__plus" style="display: block"> + </button>';
}

//удаление голубой кнопки когда мышь покинула свободную зону
function deleteBluButton (elem) {
    elem.parentNode.removeChild(elem)
}
