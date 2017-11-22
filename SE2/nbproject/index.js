var express = require('express');
var bodyParser = require('body-parser');
//inspect variables
var util = require('util');

//instantiate express
var app = express();

//handle get req on /page1
app.get('/page1', function (req, res) {
	dbpedia();
});


//handle get req on /page2
app.get('/page2', function (req, res) {
    res.send('Page2');
});


//handle post req on /
app.post('/page1', function (req, res) {
    res.send('POST Page1');
});


//handle post req on /
app.post('/page2', function (req, res) {
    res.send('POST Page2');
    
});
function dbpedia(){
	var SparqlClient = require('sparql-client');
	var util = require('util');
	var endpoint = 'http://dbpedia.org/sparql';
	var query = "SELECT * FROM <http://dbpedia.org> WHERE {
		?city <http://dbpedia.org/property/leaderName> ?leaderName
	} LIMIT 10";
	var client = new SparqlClient(endpoint);
	console.log("Query to " + endpoint);
	console.log("Query: " + query);
	client.query(query)
	  //.bind('city', 'db:Chicago') 
	  //.bind('city', 'db:Tokyo') 
	  //.bind('city', 'db:Casablanca') 
	  .bind('city', '<http://dbpedia.org/resource/Vienna>')
	  .execute(function(error, results) {
	  process.stdout.write(util.inspect(arguments, null, 20, true)+"\n");1
	});
}





//listen in a specific port
app.listen((process.env.PORT || 80));

//check status
console.log('Server running at http://localhost:80/');