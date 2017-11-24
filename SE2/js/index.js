import {dbpedia} from 'dbpedia-search';
import {googlesearch} from 'google-search';

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
    googlesearch(req.query.value);
});


//handle post req on /
app.post('/page1', function (req, res) {
    res.send('POST Page1');
});


//handle post req on /
app.post('/page2', function (req, res) {
    res.send('POST Page2');
    
});







//listen in a specific port
app.listen((process.env.PORT || 80));

//check status
console.log('Server running at http://localhost:80/');