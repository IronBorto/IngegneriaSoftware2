
const Storage = require('@google-cloud/storage');

// Your Google Cloud Platform project ID
const projectId = 'wheredidiseenthisbefore';

// Creates a client
const storage = new Storage({
    projectId: projectId,
});

const bucketName = 'wheredidiseenthisbefore';

class googleCStorage {

    constructor() {
        // Creates the new bucket
        storage
            .createBucket(bucketName)
            .then(() => {
                console.log(`Bucket ${bucketName} created.`);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }

    upload(filename) {
        storage
            .bucket(bucketName)
            .upload(filename)
            .then(() => {
                console.log(`${filename} uploaded to ${bucketName}.`);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }
}
module.exports = new googleCStorage();