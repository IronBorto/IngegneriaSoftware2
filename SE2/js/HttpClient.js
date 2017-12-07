'use strict';

const Vision = require('@google-cloud/vision');
const vision = new Vision();
//var gsearch = require('./google-search');

var labels, webDetection, landmarks;

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
            labels = results[0].labelAnnotations;
            console.log('Labels:');
            labels.forEach((label) => console.log(label));
            //return labels;
        })
        .catch((err) => {
                console.error('ERROR:', err);
                return err;
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
    
    async detectLandmarks (fileName) {
        // [START vision_landmark_detection]
        
        // Creates a client
        
        /**
         * TODO(developer): Uncomment the following line before running the sample.
         */
        // const fileName = 'Local image file, e.g. /path/to/image.png';
    
        // Performs landmark detection on the local file
        vision.landmarkDetection({ source: {filename: fileName} })
            .then((results) => {
            landmarks = results[0].landmarkAnnotations;
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
        vision.webDetection({ source: { filename: fileName } })
        .then((results) => {
            webDetection = results[0].webDetection;
    
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
            //return webDetection;
        })
        .catch((err) => {
                console.error('ERROR:', err);
                return err;
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
        
        await this.detectLabels(filename);
        await new Promise((resolve, reject) => setTimeout(resolve, 20000));
        await this.detectWeb(filename);
        await new Promise((resolve, reject) => setTimeout(resolve, 20000));
        //labels = require('./sampleLabel.json');
        //webDetection = require('./sampleWeb.json');
        if (labels != "err" && webDetection != "err"){
            var landmarkB = false;
            var c = 0;
            var lab = new Array();
            var web = new Array();
            var label;
            for (c = 0; c < labels.length; c++) {
                label = labels[c];
                if(label.description == "landmark")
                    landmarkB = true;
                else{
                    if (label.score >= 0.9){
                        lab[c] = label.description;
                        //Tieni buoni quei valori per analisi
                    }
                    else
                    c = labels.length;
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
                landmarks = await this.detectLandmarks(filename);
                await new Promise((resolve, reject) => setTimeout(resolve, 20000));
                //const landmark = require('./sampleLandmark.json');
                lat = landmarks[0].locations[0].latLng.latitude;
                long = landmarks[0].locations[0].latLng.longitude;
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
            var score = webDetection.webEntities[0].score;
            var webr;
            web[0] = webDetection.webEntities[0].description;
            for (c = 1; c < webDetection.webEntities.length; c++) {
                webr = webDetection.webEntities[c];
                if ((webr.score >= 0.8) && (webr.score + 2 > score)){
                    web[c] = webr.description;
                    //Tieni buoni quei valori per analisi
                }
                else
                    c = webDetection.webEntities.length;
            }
            var result = await this.elaborate(lab, lat, long, web);
            return result;
        }
        else
            return 0;
    }


}


module.exports = new HttpClient();
