
function getUsers() {
 fetch('http://localhost:3000/graphql?query={users%20{id}}')
 .then(function(response) {
 console.log(response);
 return response.json();
 })
 .then((response)=> console.log(response) )
 .catch( alert );
}

function getRooms() {
 fetch('http://localhost:3000/graphql?query={rooms%20{id, title, capacity, floor}}')
 .then(function(response) {
 console.log(response);
 return response.json();
 })
 .then((response)=> console.log(response) )
 .catch( alert );
}

function addUser() {
 fetch('http://localhost:3000/graphql?query=mutation{createUser(input:{login:"Myname",homeFloor:1}){id}}',
 {
 method: 'post'
 }).then(function(response) {
 console.log(response);
 return response.json();
 })
 .then((response)=> console.log(response) )
 .catch( alert );
}

function updateUser() {
 fetch(`http://localhost:3000/graphql?query=mutation{updateUser(id:4,input:{login:"myName",homeFloor:1}){id, login}}`,
 {
 method: 'post'
 }).then(function(response) {
 console.log(response);
 return response.json();
 })
 .then((response)=> console.log(response) )
 .catch( alert );
}

function addRoom() {
 fetch(`http://localhost:3000/graphql?query=mutation{createRoom(input:{title:"new room",floor:4,capacity:100}){id}}`,
 {
 method: 'post'
 }).then(function(response) {
 console.log(response);
 return response.json();
 })
 .then((response)=> console.log(response) )
 .catch( alert );
}

function addEvent() {
 fetch(`http://localhost:3000/graphql?query=mutation{createEvent(input:{title:"new event"}, usersIds: [1], roomId: 3){id}}`,
 {
 method: 'post'
 }).then(function(response) {
 console.log(response);
 return response.json();
 })
 .then((response)=> console.log(response) )
 .catch( alert );
}

function getEvents() {
 fetch(`http://localhost:3000/graphql?query={events%20{id, title, users{id}, room{id}}}`,
 {
 method: 'post'
 }).then(function(response) {
 console.log(response);
 return response.json();
 })
 .then((response)=> console.log(response) )
 .catch( alert );
}