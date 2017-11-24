var express = require('express');
var bodyParser = require('body-parser');
//inspect variables
var util = require('util');

//instantiate express
var app = express();

//handle get req on /page1
app.get('/page1', function (req, res) {
	dbpedia(req.query.value);
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

function dbpedia(param){
	var SparqlClient = require('sparql-client');
	var util = require('util');
	var endpoint = 'http://dbpedia.org/sparql';
	var query = /*"prefix dbpedia: <http://dbpedia.org/resource/>"+*/
	"prefix dbpedia-owl: <http://dbpedia.org/ontology/>"+
	
	"select ?abstract ?thumbnail where { "+
	"  <http://dbpedia.org/resource/"+ param +"> dbpedia-owl:abstract ?abstract ;"+
							   "dbpedia-owl:thumbnail ?thumbnail ."+
	"  filter(langMatches(lang(?abstract),\"en\"))"+
	"}";
	var client = new SparqlClient(endpoint);
	console.log("Query to " + endpoint);
	console.log("Query: " + query);
	client.query(query)
	  .execute(function(error, results) {
	  process.stdout.write(util.inspect(arguments, null, 20, true)+"\n");1
	});
}





//listen in a specific port
app.listen((process.env.PORT || 80));

//check status
console.log('Server running at http://localhost:80/');