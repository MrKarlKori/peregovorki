let deleteMeetButton = document.querySelector('#delete_meet_button');
let createMeetButton = document.querySelector('#create_meet_button');

deleteMeetButton.addEventListener('click', function () {
    deleteMeet( createWindow() )
});

createMeetButton.addEventListener('click', function () {
    createMeet(createWindow())
});

