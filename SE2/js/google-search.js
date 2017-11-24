/*var google = require('googleapis');
var plus = google.plus('v1');

var API_KEY = 'AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI'; // specify your API key here
// Ricerca Google Knowledge https://kgsearch.googleapis.com/v1/entities:search?query=pantheon+london&key=AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI&limit=1&indent=True
plus.people.get({
  auth: API_KEY,
  userId: '+google'
}, function (err, user) {
  console.log('Result: ' + (err ? err.message : user.displayName));
});
*/
function googlesearch(param){
    param = "Cristiano Ronaldo";
    var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
    var params = {
    'query': param,
    'limit': 10,
    'indent': true,
    'key' : 'AIzaSyAkLk07xOAE7j0SqXbMttOOXFdwAN9YikI',
    };
    $.getJSON(service_url + '?callback=?', params, function(response) {
    //Funzione per recuperare NOME, URL WIKIPEDIA, TYPE
    }, function (err, user) {
        console.log('Result: ' + (err ? err.message : user.displayName));
    });
}

//type of google knowledge: https://schema.org/docs/full.html