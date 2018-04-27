const Storage = require('@google-cloud/storage')

// Create Google Cloud Store
const gcs = new Storage({
    projectId: 'speech-to-text-201621',
    keyFilename: './config/service-account-file.json'
});
const bucket = gcs.bucket('audio-convert-to-text-bucket');

module.exports = filePath => new Promise((resolve, reject) =>
    bucket.upload(filePath, function (err, file) {
        if (err) {
            reject(err);
        } else {
            resolve(file);
        }
    })
);