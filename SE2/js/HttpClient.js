'use strict';

const Vision = require('@google-cloud/vision');
const vision = new Vision();
//var gsearch = require('./google-search');


class HttpClient {

    constructor() {
        
    }

    async detectLabels (fileName) {
        // [START vision_label_detection]
        // Imports the Google Cloud client library
        
        console.log('Entro in detectLabels con ' + fileName);
        // Creates a client
        
        /**
         * TODO(developer): Uncomment the following line before running the sample.
         */
        // const fileName = 'Local image file, e.g. /path/to/image.png';
    
        // Performs label detection on the local file
        vision.labelDetection({ source: { filename: fileName } })
            .then((results) => {
            const labels = results[0].labelAnnotations;
        console.log('Labels:');
        labels.forEach((label) => console.log(label));
        return labels;
    })
    .catch((err) => {
            console.error('ERROR:', err);
    });
        // [END vision_label_detection]
    }
    
    // Funzione che potrebbe essere utile in futuri sviluppi
    detectLabelsGCS (bucketName, fileName) {
        // [START vision_label_detection_gcs]
        bucketName = "wheredidiseenthisbefore";
        fileName = "4ae272556c966a44ca8e14d0d489177c";
        
         // TODO(developer): Uncomment the following lines before running the sample.
         
            // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
            // const fileName = 'Path to file within bucket, e.g. path/to/image.png';
    
        const request = {
                source: {
                    imageUri: `gs://${bucketName}/${fileName}`
                }
            };
    
        // Performs label detection on the gcs file
        vision.labelDetection(request)
        .then((results) => {
            const labels = results[0].labelAnnotations;
            console.log('Labels:');
            labels.forEach((label) => console.log(label));
        })
        .catch((err) => {
            console.error('ERROR:', err.stack);
            return "err";
        });
        // [END vision_label_detection_gcs]
    }
    
    detectLandmarks (fileName) {
        // [START vision_landmark_detection]
        
        // Creates a client
        
        /**
         * TODO(developer): Uncomment the following line before running the sample.
         */
        // const fileName = 'Local image file, e.g. /path/to/image.png';
    
        // Performs landmark detection on the local file
        vision.landmarkDetection({ source: {filename: fileName} })
            .then((results) => {
            const landmarks = results[0].landmarkAnnotations;
        console.log('Landmarks:');
        landmarks.forEach((landmark) => console.log(landmark));
    })
    .catch((err) => {
            console.error('ERROR:', err);
    });
        // [END vision_landmark_detection]
    }
    /* Funzione che potrebbe essere utile in futuri sviluppi
    function detectLandmarksGCS (bucketName, fileName) {
        // [START vision_landmark_detection_gcs]
        // Imports the Google Cloud client libraries
        const Vision = require('@google-cloud/vision')({         projectId: 'wheredidiseenthisbefore',         keyFilename: '../google-service-account/keyfile.json'       });
    
        // Creates a client
        const vision = new Vision();
    
        
         // TODO(developer): Uncomment the following lines before running the sample.
         
            // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
            // const fileName = 'Path to file within bucket, e.g. path/to/image.png';
    
        const request = {
                source: {
                    imageUri: `gs://${bucketName}/${fileName}`
                }
            };
    
        // Performs landmark detection on the gcs file
        vision.landmarkDetection(request)
            .then((results) => {
            const landmarks = results[0].landmarkAnnotations;
        console.log('Landmarks:');
        landmarks.forEach((landmark) => console.log(landmark));
    })
    .catch((err) => {
            console.error('ERROR:', err);
    });
        // [END vision_landmark_detection_gcs]
    }*/
    
    
    async detectWeb (fileName) {
        // [START vision_web_detection]
    
        // Imports the Google Cloud client library
        
        // Creates a client
        
        console.log('Entro in detectWeb con ' + fileName);
        /**
         * TODO(developer): Uncomment the following line before running the sample.
         */
        // const fileName = 'Local image file, e.g. /path/to/image.png';
    
        // Detect similar images on the web to a local file
        console.log(fileName);
        vision.webDetection({ source: { filename: fileName } })
            .then((results) => {
            const webDetection = results[0].webDetection;
    
        if (webDetection.fullMatchingImages.length) {
            console.log(`Full matches found: ${webDetection.fullMatchingImages.length}`);
            webDetection.fullMatchingImages.forEach((image) => {
                console.log(`  URL: ${image.url}`);
            console.log(`  Score: ${image.score}`);
        });
        }
    
        if (webDetection.partialMatchingImages.length) {
            console.log(`Partial matches found: ${webDetection.partialMatchingImages.length}`);
            webDetection.partialMatchingImages.forEach((image) => {
                console.log(`  URL: ${image.url}`);
            console.log(`  Score: ${image.score}`);
        });
        }
    
        if (webDetection.webEntities.length) {
            console.log(`Web entities found: ${webDetection.webEntities.length}`);
            webDetection.webEntities.forEach((webEntity) => {
                console.log(`  Description: ${webEntity.description}`);
            console.log(`  Score: ${webEntity.score}`);
        });
        }
    })
    .catch((err) => {
            console.error('ERROR:', err);
    });
        // [END vision_web_detection]
    }
    
    /* Funzione che potrebbe essere utile in futuri sviluppi
    function detectWebGCS (bucketName, fileName) {
        // [START vision_web_detection_gcs]
    
        // Imports the Google Cloud client libraries
        const Vision = require('@google-cloud/vision')({         projectId: 'wheredidiseenthisbefore',         keyFilename: '../google-service-account/keyfile.json'       });
    
        // Creates a client
        const vision = new Vision();
    
        
         // TODO(developer): Uncomment the following lines before running the sample.
         
            // const bucketName = 'Bucket where the file resides, e.g. my-bucket';
            // const fileName = 'Path to file within bucket, e.g. path/to/image.png';
    
        const request = {
                source: {
                    imageUri: `gs://${bucketName}/${fileName}`
                }
            };
    
        // Detect similar images on the web to a remote file
        vision.webDetection(request)
            .then((results) => {
            const webDetection = results[0].webDetection;
    
        if (webDetection.fullMatchingImages.length) {
            console.log(`Full matches found: ${webDetection.fullMatchingImages.length}`);
            webDetection.fullMatchingImages.forEach((image) => {
                console.log(`  URL: ${image.url}`);
            console.log(`  Score: ${image.score}`);
        });
        }
    
        if (webDetection.partialMatchingImages.length) {
            console.log(`Partial matches found: ${webDetection.partialMatchingImages.length}`);
            webDetection.partialMatchingImages.forEach((image) => {
                console.log(`  URL: ${image.url}`);
            console.log(`  Score: ${image.score}`);
        });
        }
    
        if (webDetection.webEntities.length) {
            console.log(`Web entities found: ${webDetection.webEntities.length}`);
            webDetection.webEntities.forEach((webEntity) => {
                console.log(`  Description: ${webEntity.description}`);
            console.log(`  Score: ${webEntity.score}`);
        });
        }
    })
    .catch((err) => {
            console.error('ERROR:', err);
    });
        // [END vision_web_detection_gcs]
    }*/

    async elaborate (labels, latitude, longitude, web) {
        if (latitude != 0 && longitude != 0) {
            //Visualizza su sito
            console.log(latitude);
            console.log(longitude);
        }
        labels.forEach ( (lab) => {
            //Aggiungi Label su sito
            console.log(lab);
        });
        var result = new Array();
        web.forEach ((w) => {
            //Ricerca w su google-search.js
            console.log(w);
            //var result = gsearch.googlesearch(w);
            result.push(w);
        });
        return result;
    }


    async googleAPIVision (filename) {
        
        //vision = new visions.ImageAnnotatorClient();
        
        const labels = await this.detectLabels(filename);
        //var labels = require('./sampleLabel.json');
        const webs = await this.detectWeb(filename);
        //var webs = require('./sampleWeb.json');
        await new Promise((resolve, reject) => setTimeout(resolve, 3000));
        if (labels != "err" && webs != "err"){
            var landmarkB = false;
            var c = 0;
            var lab = new Array();
            var web = new Array();
            var label;
            for (c = 0; c < labels.responses[0].labelAnnotations.length; c++) {
                label = labels.responses[0].labelAnnotations[c];
                if(label.description == "landmark")
                    landmarkB = true;
                else{
                    if (label.score >= 0.9){
                        lab[c] = label.description;
                        //Tieni buoni quei valori per analisi
                    }
                    else
                    c = labels.responses[0].labelAnnotations.length;
                }
            }
            /*labels.responses.labelAnnotations.forEach((label) => {
                c++;
                if(label == "landmark")
                    landmarkB = true;
                else{
                    if (lab.score >= 1  && b == true){
                        lab[c] = label.description;
                        //Tieni buoni quei valori per analisi
                    }
                    else
                        b = false;
                }
            });*/
            var lat = 0;
            var long = 0;
            if (landmarkB == true){
                //const landmark = this.detectLandmarks(filename).first;
                const landmark = require('./sampleLandmark.json');
                lat = landmark.responses[0].landmarkAnnotations[0].locations[0].latLng.latitude;
                long = landmark.responses[0].landmarkAnnotations[0].locations[0].latLng.longitude;
                // Utilizza il landmark per ottenere nome e coordinate -->
                /*
                "locations": [
                    {
                    "latLng": {
                        "latitude": 45.464239,
                        "longitude": 9.190171
                    }
                    }
                ]
                */
            }
            var score = webs.responses[0].webDetection.webEntities[0].score;
            var webr;
            for (c = 0; c < webs.responses[0].webDetection.webEntities.length; c++) {
                webr = webs.responses[0].webDetection.webEntities[c];
                if ((webr.score >= 0.8) && (webr.score + 2 > score)){
                    web[c] = webr.description;
                    //Tieni buoni quei valori per analisi
                }
                else
                    c = webs.responses[0].webDetection.webEntities.length;
            }
            var result = await this.elaborate(lab, lat, long, web);
            return result;
        }
        else
            return 0;
    }


}


module.exports = new HttpClient();



/*
require(`yargs`) // eslint-disable-line
    .demand(1)
    .command(
        `faces <fileName>`,
        `Detects faces in a local image file.`,
        {},
        (opts) => detectFaces(opts.fileName)
)
.command(
    `faces-gcs <bucketName> <fileName>`,
    `Detects faces in an image in Google Cloud Storage.`,
    {},
    (opts) => detectFacesGCS(opts.bucketName, opts.fileName)
)
.command(
    `labels <fileName>`,
    `Detects labels in a local image file.`,
    {},
    (opts) => detectLabels(opts.fileName)
)
.command(
    `labels-gcs <bucketName> <fileName>`,
    `Detects labels in an image in Google Cloud Storage.`,
    {},
    (opts) => detectLabelsGCS(opts.bucketName, opts.fileName)
)
.command(
    `landmarks <fileName>`,
    `Detects landmarks in a local image file.`,
    {},
    (opts) => detectLandmarks(opts.fileName)
)
.command(
    `landmarks-gcs <bucketName> <fileName>`,
    `Detects landmarks in an image in Google Cloud Storage.`,
    {},
    (opts) => detectLandmarksGCS(opts.bucketName, opts.fileName)
)
.command(
    `text <fileName>`,
    `Detects text in a local image file.`,
    {},
    (opts) => detectText(opts.fileName)
)
.command(
    `text-gcs <bucketName> <fileName>`,
    `Detects text in an image in Google Cloud Storage.`,
    {},
    (opts) => detectTextGCS(opts.bucketName, opts.fileName)
)
.command(
    `logos <fileName>`,
    `Detects logos in a local image file.`,
    {},
    (opts) => detectLogos(opts.fileName)
)
.command(
    `logos-gcs <bucketName> <fileName>`,
    `Detects logos in an image in Google Cloud Storage.`,
    {},
    (opts) => detectLogosGCS(opts.bucketName, opts.fileName)
)
.command(
    `properties <fileName>`,
    `Detects image properties in a local image file.`,
    {},
    (opts) => detectProperties(opts.fileName)
)
.command(
    `properties-gcs <bucketName> <fileName>`,
    `Detects image properties in an image in Google Cloud Storage.`,
    {},
    (opts) => detectPropertiesGCS(opts.bucketName, opts.fileName)
)
.command(
    `safe-search <fileName>`,
    `Detects safe search properties in a local image file.`,
    {},
    (opts) => detectSafeSearch(opts.fileName)
)
.command(
    `safe-search-gcs <bucketName> <fileName>`,
    `Detects safe search properties in an image in Google Cloud Storage.`,
    {},
    (opts) => detectSafeSearchGCS(opts.bucketName, opts.fileName)
)
.command(
    `crops <fileName>`,
    `Detects crop hints in a local image file.`,
    {},
    (opts) => detectCropHints(opts.fileName)
)
.command(
    `crops-gcs <bucketName> <fileName>`,
    `Detects crop hints in an image in Google Cloud Storage.`,
    {},
    (opts) => detectCropHintsGCS(opts.bucketName, opts.fileName)
)
.command(
    `web <fileName>`,
    `Finds similar photos on the web for a local image file.`,
    {},
    (opts) => detectWeb(opts.fileName)
)
.command(
    `web-gcs <bucketName> <fileName>`,
    `Finds similar photos on the web for an image in Google Cloud Storage.`,
    {},
    (opts) => detectWebGCS(opts.bucketName, opts.fileName)
)
.command(
    `fulltext <fileName>`,
    `Extracts full text from a local image file.`,
    {},
    (opts) => detectFulltext(opts.fileName)
)
.command(
    `fulltext-gcs <bucketName> <fileName>`,
    `Extracts full text from an image in Google Cloud Storage.`,
    {},
    (opts) => detectFulltextGCS(opts.bucketName, opts.fileName)
)
.example(`node $0 faces ./resources/face_no_surprise.jpg`)
    .example(`node $0 faces-gcs my-bucket your-image.jpg`)
    .example(`node $0 labels ./resources/wakeupcat.jpg`)
    .example(`node $0 labels-gcs my-bucket your-image.jpg`)
    .example(`node $0 landmarks ./resources/landmark.jpg`)
    .example(`node $0 landmarks-gcs my-bucket your-image.jpg`)
    .example(`node $0 text ./resources/wakeupcat.jpg`)
    .example(`node $0 text-gcs my-bucket your-image.jpg`)
    .example(`node $0 logos ./resources/logos.png`)
    .example(`node $0 logos-gcs my-bucket your-image.jpg.png`)
    .example(`node $0 properties ./resources/landmark.jpg`)
    .example(`node $0 properties-gcs my-bucket your-image.jpg`)
    .example(`node $0 safe-search ./resources/wakeupcat.jpg`)
    .example(`node $0 safe-search-gcs my-bucket your-image.jpg`)
    .example(`node $0 crops ./resources/wakeupcat.jpg`)
    .example(`node $0 crops-gcs my-bucket your-image.jpg`)
    .example(`node $0 web ./resources/wakeupcat.jpg`)
    .example(`node $0 web-gcs my-bucket your-image.jpg`)
    .example(`node $0 fulltext ./resources/wakeupcat.jpg`)
    .example(`node $0 fulltext-gcs my-bucket your-image.jpg`)
    .wrap(120)
    .recommendCommands()
    .epilogue(`For more information, see https://cloud.google.com/vision/docs`)
    .help()
    .strict()
    .argv;

*/