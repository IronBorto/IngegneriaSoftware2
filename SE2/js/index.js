var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dbPediaSearch');
var gsearch = require('./google-search');
var gvision = require('./HttpClient');
var dbpedia = require('./dbPediaSearch');
var util = require('util');
var fs = require('fs');
var mime = require('mime');
var multer = require('multer');
var upload = multer({ dest: 'js/public/uploads/' });
var path = require('path');
var engines = require('consolidate');

//instantiate express
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.post('/upload', upload.single('image'), async function (req, res, next) {
    console.log('Sono in upload ' + req.file.path);
    var imageFile = fs.readFileSync(req.file.path);
    var encoded = new Buffer(imageFile).toString('base64');

    const makeRequest = await call();
    async function call() {
        const value1 = await gvision.googleAPIVision(req.file.path);
        for(i = 1; i < value1.length && i < 3; i++){ 
            value1[2][0] += " " + value1[2][i]; 
            console.log(value1[2][0]); 
        }
        const value2 = await gsearch.googlesearch(value1[2][0]); 
        const value3 = await dbpedia.dbpedia(value2[1]); 
        await new Promise((resolve, reject) => setTimeout(resolve, 5000));
        console.log(value3);
        return [value1[0], value1[1], value2[0], value2[2], value3]; 
    }


    console.log(makeRequest[2], makeRequest[3]);

    var result; 
    if(makeRequest[0] != 0 && makeRequest[1] != 0) 
        result = {  name: makeRequest[2], 
                    coordinate: [ 
                        { 
                            latitude: makeRequest[0] 
                        }, 
                        { 
                            longitude: makeRequest[1] 
                        } 
                    ], 
                    wiki: makeRequest[3],
                    description: makeRequest[4], 
                    image: "uploads/" + req.file.path.split('/').pop() }; 
    else 
    result = {  name: makeRequest[2], 
                wiki: makeRequest[3],
                description: makeRequest[4], 
                image: "uploads/" + req.file.path.split('/').pop() }; 

    res.render('result', result);
    
    console.log('Finito');
});

//listen in a specific port
app.listen((process.env.PORT || 8088));

//check status
console.log('Server running at http://localhost:8088/');