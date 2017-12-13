'use strict';

const Vision = require('@google-cloud/vision');
const vision = new Vision();
const fetchJson = require('node-fetch-json');
const webNeeded = [ "art", "painting"];

var labels, webDetection, landmarks, location;

class HttpClient {

    constructor() {
        
    }

    async detectLabels (fileName) {
        // [START vision_label_detection]
        
        console.log('Entro in detectLabels con ' + fileName);
        // Creates a client
        
    
        // Performs label detection on the local file
        vision.labelDetection({ source: { filename: fileName } })
        .then((results) => {
            labels = results[0].labelAnnotations;
            console.log('Labels:');
            labels.forEach((label) => console.log(label));
        })
        .catch((err) => {
                console.error('ERROR:', err);
                return err;
        });
        // [END vision_label_detection]
    }
    
    async detectLandmarks (fileName) {
        // [START vision_landmark_detection]
        
        // Creates a client
    
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
    
    async detectWeb (fileName) {
        // [START vision_web_detection]
        
        // Creates a client
        
        console.log('Entro in detectWeb con ' + fileName);
    
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
    
    
    handleJson(data) {
        var find = true;
        var c = 0;
        var array = data.results[0];
        while(find && c < array.address_components.length)
        {
            if(array.address_components[c].types[0] == "locality")
            {
                location = array.address_components[c].short_name;
                find = false;
            }
            c++;
        }
    }

    async elaborate (labels, landmark, latitude, longitude, web) {
        var result = new Array();
        if(landmark != "false")
            result.push(landmark);
        if (latitude != 0 && longitude != 0) {
            const data = latitude+","+longitude;
            fetchJson("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA6ttUgcim5GpmMO2_2p6hmMFNB67pRTY8&latlng="+ data +"&language=en-EN")
            .then(response => {
                this.handleJson(response);
                result.push(location);
            })
            .catch(error => console.log("Si è verificato un errore!"));
            await new Promise((resolve, reject) => setTimeout(resolve, 5000));
            console.log(latitude);
            console.log(longitude);
            console.log(location);
        }
        labels.forEach ( (lab) => {
            console.log(lab);
        });
        if (web != undefined)
            web.forEach ((w) => { 
                result.push(w);
                result.push("");
                result.push("");
                console.log(w);
            });
        return result;
    }


    async googleAPIVision (filename) {
        
        await this.detectLabels(filename);
        await new Promise((resolve, reject) => setTimeout(resolve, 20000));
        if (labels != "err" && webDetection != "err"){
            var landmarkB = false;
            var c = 0;
            var lab = new Array();
            var web = new Array();
            var label;
            var wb = false;
            for (c = 0; c < labels.length; c++) {
                label = labels[c];
                if (webNeeded.indexOf(label) >= 0)
                    wb = true;
                if(label.description == "landmark")
                    landmarkB = true;
                else{
                    if (label.score >= 0.9){
                        lab[c] = label.description;
                    }
                    else
                    c = labels.length;
                }
            }
            
            var lat = 0;
            var long = 0;
            var lm = "false";
            if (landmarkB == true){
                landmarks = await this.detectLandmarks(filename);
                await new Promise((resolve, reject) => setTimeout(resolve, 20000));
                if(landmarks.length == 0)
                    wb = true;
                else {
                    lat = landmarks[0].locations[0].latLng.latitude;
                    long = landmarks[0].locations[0].latLng.longitude;
                    lm = landmarks[0].description;
                }
            }
            else
                wb = true;
            if(wb == true) {
                await this.detectWeb(filename);
                await new Promise((resolve, reject) => setTimeout(resolve, 20000));
                var score = webDetection.webEntities[0].score;
                var webr;
                web[0] = webDetection.webEntities[0].description;
                for (c = 1; c < webDetection.webEntities.length; c++) {
                    webr = webDetection.webEntities[c];
                    if ((webr.score >= 0.8) && (webr.score + 2 > score)){
                        web[c] = webr.description;
                    }
                    else
                        c = webDetection.webEntities.length;
                }
            }
            
            var result = await this.elaborate(lab, lm, lat, long, web);
            return lat, long, result;
        }
        else
            return 0;
    }


}


module.exports = new HttpClient();
