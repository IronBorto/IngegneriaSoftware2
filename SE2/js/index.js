var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dbPediaSearch');
var gsearch = require('./google-search');
var util = require('util');
var fs = require('fs');
var util = require('util');
var mime = require('mime');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

//instantiate express
var app = express();

//handle get req on /page1
app.get('/page1', function (req, res) {
	db.dbpedia(req.query.value);
});


//handle get req on /page2
app.get('/page2', function (req, res) {
    gsearch.googlesearch(req.query.value);
});


//handle post req on /
app.post('/page1', function (req, res) {
    res.send('POST Page1');
});


//handle post req on /
app.post('/page2', function (req, res) {
    res.send('POST Page2');
    
});


app.post('/upload', upload.single('image'), function(req, res, next) {
      console.log('Sono in upload ' + req.file.path);
        fs.unlinkSync(req.file.path);
        console.log('fine e cancellazione')
    });



//listen in a specific port
app.listen((process.env.PORT || 80));

//check status
console.log('Server running at http://localhost:80/');