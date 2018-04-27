const S3 = require('aws-sdk/clients/s3');
const path = require('path');  
const credentials = require('../../config/aws-credentials');

const s3 = new S3(credentials);

module.exports = filePath => new Promise((resolve, reject) => {
    const params = {
        Body: filePath,
        Bucket: "speech-to-text-files",
        Key: path.basename(filePath),
    };

    s3.putObject(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            reject(err);
        }
        else {
            console.log(data);
            resolve(params.Key);
        }
    });
});
