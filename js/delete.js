let deleteMeetButton = document.querySelector('#delete_meet_button');
let createMeetButton = document.querySelector('#create_meet_button');

deleteMeetButton.addEventListener('click', function () {
    deleteMeet( createWindow() )
});

createMeetButton.addEventListener('click', function () {
    createMeet(createWindow())
});

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