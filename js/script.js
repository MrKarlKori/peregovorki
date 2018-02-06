let a = document.querySelector(".room__time");
let buttonDefault = document.querySelector(".create_meet_button");
let deleteMeetButton = document.querySelector(".delete_meet_button");

buttonDefault.addEventListener('click', ()=>{
    openMain();
    createMeet( createWindow() );
});

deleteMeetButton.addEventListener('click', ()=>{
    openMain()
});

const minute = a.clientWidth / 960;

let room = [];

window.onload = function() {
	createPlusButtons();

	createFirstTimes();

	createBackground();
};

let timer = setInterval(createFirstTime, 30000);

function createFirstTimes() {
	let divs = document.querySelectorAll('.room__time');

	for ( let i = 0; i < divs.length; i++ ) {
		createFirstTime(divs[i], 'first');
	}
}

function createFirstTime(parent, t) {
	let div = document.createElement("div");
	time = minute * getMinutes();
	div.style = 'height: 28px; display: inline-block; background-color: #D4DDE8; width: ' + time + 'px';

	if ( t === 'first' ) {
		parent.insertBefore(div, parent.children[0]) || parent.appendChild(div);
	} else {
		parent.children[0].replaceWith(div);
	}

	parent.addEventListener('click', createMeetingInRoom);
	parent.addEventListener('mouseover', hover);
	parent.addEventListener('mouseout', hoverOut);
}

function createBackground() {
	let div = document.createElement('div');
	div.style = 'position: absolute; height: 100%; width: 244px; border-right: 1px rgba(0,0,0,0.1) solid; top: 122px; background-color: #fff;';
	document.querySelector('.conf-rooms').appendChild(div);
}

function createPlusButtons() {
	let divs = document.querySelectorAll('.room__time');
	for ( let i = 0; i < divs.length; i++ ) {
		divs[i].innerHTML = '<button class="button__plus" onclick="createMeeting()" onmouseout="hoverOut()">+</button>';
	}
}

function createMeeting(e) {
	document.querySelector('.main').style.display = 'none';
	document.querySelector('.button').style.display = 'none';
	document.querySelector('.meeting').style.display = 'block';
	document.querySelector('footer').style.display = 'flex';
}

function openMain(e) {
	document.querySelector('.main').style.display = 'block';
	document.querySelector('.button').style.display = 'block';
	document.querySelector('.meeting').style.display = 'none';
	document.querySelector('footer').style.display = 'none';
}

function createMeetingInRoom(e) {
	if ( checkFreeTime(e) ) {
		return;
	}
	
	createMeeting();
}

function hover(e) {
	if ( checkFreeTime(e) ) {
		return;
	}
	e.toElement.children[1].style.display = 'block';
}

function hoverOut(e) {
	if ( e.toElement.tagName === 'BUTTON' ) {
		return;
	}
	if ( e.fromElement.tagName === 'BUTTON' ) {
		e.fromElement.style.display = 'none';
	}
	console.log(e);
}

function checkFreeTime(e) {
	if ( e.target.className === 'room__time' ) return false;
	return true;
}

function createDiv(n) {
	let div = document.createElement("div");
	n === 'first' ? time = minute * getMinutes() : time = minute * 30;
	div.style = 'height: 28px; display: inline-block; background-color: gray; width: ' + time + 'px';
	div.textContent = Math.round(time);

	return div;
}

function getMinutes() {
	let date = new Date();
	console.log(date.getHours());
	return date.getHours() * 60 + date.getMinutes() - 453;
}


//Alex Sherstyuk
function createWindow() {
    let a = document.createElement('div');
    a.className = 'delete_meet_window';
    return document.body.appendChild(a);
}

function createMeet(element) {
    let b = document.createElement('div');
    b.className = 'create_window';
    document.body.appendChild(b);

    b.innerHTML = `
        <p> Встреча создана! </p>
        <div class="create_window_data">
            <span> сюда значение даты, время </span>
            <span> кто, этаж </span>
        
        </div>
        

        <div class="create_window_buttons">
            <button type="button" value="Отмена" id="buttonWell"> Хорошо </button>               
        </div>

    `;

    let buttonWell = document.querySelector('#buttonWell');

    buttonWell.addEventListener('click', ()=>{
        document.body.removeChild(element);
        document.body.removeChild(b);
    });
}

function deleteMeet(element) {
    let b = document.createElement('div');
    b.className = 'delete_window';
    document.body.appendChild(b);

    b.innerHTML = `
        <p> Встреча будет удалена безвозвратно </p>
        <div class="delete_window_buttons">
            <button type="button" value="Отмена" id="buttonCancel"> Отмена </button>           
            <button type="button" value="Удалить" id="buttonDel"> Удалить </button>     
        </div>
    `;

    let buttonCancel = document.querySelector('#buttonCancel');
    let buttonDel = document.querySelector('#buttonDel');

    buttonCancel.addEventListener('click', ()=>{
        document.body.removeChild(element);
        document.body.removeChild(b);
    });
    buttonDel.addEventListener('click', ()=>{
        console.log('на удаление');
        document.body.removeChild(element);
        document.body.removeChild(b);
    });
}