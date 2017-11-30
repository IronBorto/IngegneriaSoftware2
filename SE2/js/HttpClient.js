'use strict';

const Vision = require('@google-cloud/vision')({
    projectId: 'wheredidiseenthisbefore',
    keyFilename: '../private/serviceAccount.json'
  });
let vision;

  
function googleAPIVision (filename) {
    
    vision = new Vision();
    const labels = detectLabels(filename);
    const webs = detectWeb(filename);
    if (labels != err && web != err){
        var landmarkB = false;
        var c = 0;
        labels.forEach((label) => {
            c++;
            if(label == "landmark")
                landmarkB = true;
            else{
                if (c <= 5){
                    // Tieni buoni quei valori per analisi
                }

            }
        });
        if (landmarkB == true){
            const landmark = detectLandmarks(filename).first;
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
        var w = 0;
        webs.forEach((web) => {
            w++;
            if (w <= 5){
                //Tieni buoni quei valori per analisi
            }
            else
                return 0;
        });
    }
    else
        return 0;
}

function detectLabels (fileName) {
    // [START vision_label_detection]
    // Imports the Google Cloud client library
    

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

/* Funzione che potrebbe essere utile in futuri sviluppi
function detectLabelsGCS (bucketName, fileName) {
    // [START vision_label_detection_gcs]
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

    // Performs label detection on the gcs file
    vision.labelDetection(request)
        .then((results) => {
        const labels = results[0].labelAnnotations;
    console.log('Labels:');
    labels.forEach((label) => console.log(label));
})
.catch((err) => {
        console.error('ERROR:', err);
});
    // [END vision_label_detection_gcs]
}*/

function detectLandmarks (fileName) {
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


function detectWeb (fileName) {
    // [START vision_web_detection]

    // Imports the Google Cloud client library
    
    // Creates a client

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const fileName = 'Local image file, e.g. /path/to/image.png';

    // Detect similar images on the web to a local file
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