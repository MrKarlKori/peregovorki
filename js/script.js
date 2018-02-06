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




const minute = a.clientWidth / 1440;

let room = [];

window.onload = function() {
	createFirstTime('first');
};

let timer = setInterval(createFirstTime, 30000);

function createFirstTime(t) {
	let div = document.createElement("div");
	time = minute * getMinutes();
	div.style = 'height: 28px; display: inline-block; background-color: purple; width: ' + time + 'px';
	div.textContent = Math.round(time);

	if ( t === 'first' ) {
		a.insertBefore(div, a.children[0]) || a.appendChild(div);
	} else {
		a.children[0].replaceWith(div);
	}
}

a.addEventListener('click', createMeetingInRoom);






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

a.addEventListener('mouseover', hover);
a.addEventListener('mouseout', hoverOut);
document.querySelector('.button__plus').addEventListener('mouseout', hoverOut);

function hover(e) {
	if ( checkFreeTime(e) ) {
		return;
	}
	document.querySelector('.button__plus').style.display = 'block';
}

function hoverOut(e) {
	if ( e.toElement.tagName === 'BUTTON' ) {
		return;
	}
	document.querySelector('.button__plus').style.display = 'none';	
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
	return date.getHours() * 60 + date.getMinutes();
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