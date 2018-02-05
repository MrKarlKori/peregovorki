let a = document.querySelector(".room__time");
const minute = a.clientWidth / 1440;

let room = [];

window.onload = function() {
	createFirstTime('first');
}

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