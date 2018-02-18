
function getUser() {
 fetch('http://localhost:3000/graphql?query={users%20{id}}')
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
