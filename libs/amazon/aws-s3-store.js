const S3 = require('aws-sdk/clients/s3'),
    path = require('path'),
    credentials = require('../../config/aws-credentials'),
    fs = require('fs'),
    s3 = new S3(credentials);

module.exports = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {    
        const params = {
            Body: data,
            Bucket: "speech-to-text-files",
            Key: path.basename(filePath),
        };
    
        s3.putObject(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            }
            else {
                resolve(params.Key);
            }
        });
    });
});
