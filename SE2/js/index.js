var express = require('express');
var bodyParser = require('body-parser');
var db = require('./dbPediaSearch');
var gsearch = require('./google-search');
var gvision = require('./HttpClient');
var dbpedia = require('./dbPediaSearch');
var util = require('util');
var fs = require('fs');
var util = require('util');
var mime = require('mime');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var gs = require('./googleCStorage');

//instantiate express
var app = express();

app.post('/upload', upload.single('image'), async function (req, res, next) {
    console.log('Sono in upload ' + req.file.path);
    var imageFile = fs.readFileSync(req.file.path);
    var encoded = new Buffer(imageFile).toString('base64');
    //gs.upload(req.file.path);

    const makeRequest = await call();
    async function call() {
        const value1 = await gvision.googleAPIVision(req.file.path);
        var value2;
        if (value1.length > 1)
            value2 = await gsearch.googlesearch(value1[0] + " " + value1[1]);
        else
            value2 = await gsearch.googlesearch(value1[0]);
        const value3 = await dbpedia.dbpedia(value2[2]);
        await new Promise((resolve, reject) => setTimeout(resolve, 5000));
        console.log(value3);
        return value3;
    }


    console.log(makeRequest);
    res.json({ value: makeRequest });
    console.log('Finito');
    //Dovrebbe arrivare un json nella pagina indicata e si può ottenere il risultato cercando il campo value
});

//listen in a specific port
app.listen((process.env.PORT || 8088));

//check status
console.log('Server running at http://localhost:8088/');