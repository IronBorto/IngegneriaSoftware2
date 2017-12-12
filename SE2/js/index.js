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
var upload = multer({ dest: 'uploads/' });
var gs = require('./googleCStorage');
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
    //gs.upload(req.file.path);

    const makeRequest = await call();
    async function call() {
        const value1 = await gvision.googleAPIVision(req.file.path);
        var value2;
        for(i = 1; i < value1.length && i < 3; i++){
            value1[0] += " " + value1[i];
            console.log(value1[0]);
        }
        /*if(value1.length > 1)
            value2 = await gsearch.googlesearch(value1[0]+" "+value1[1]);
        else*/
            value2 = await gsearch.googlesearch(value1[0]);
        const value3 = await dbpedia.dbpedia(value2[2]);
        await new Promise((resolve, reject) => setTimeout(resolve, 5000));
        console.log(value3);
        return [value2[0], value2[1], value3];
    }


    console.log(makeRequest[0], makeRequest[2]);

    var result = { name: makeRequest[0],
                    types: makeRequest[1],
                    description: makeRequest[2] };

    res.render('result', result);
    //res.json(result);
    
    console.log('Finito');
    //Dovrebbe arrivare un json nella pagina indicata e si può ottenere il risultato cercando il campo value
});

//listen in a specific port
app.listen((process.env.PORT || 8088));

//check status
console.log('Server running at http://localhost:8088/');