const Transcribe = require('aws-sdk/clients/transcribeservice');
const credentials = require('../../config/aws-credentials');
const crypto = require('crypto');

const transcribe = new Transcribe(credentials);

module.exports = fileName => new Promise((resolve, reject) => {
    const params = {
        LanguageCode: "en-US",
        Media: {
            MediaFileUri: "https://s3-eu-west-1.amazonaws.com/speech-to-text-files/"
            + fileName,
        },
        MediaFormat: "flac",
        TranscriptionJobName: crypto.randomBytes(20).toString('hex'),
    };

    transcribe.startTranscriptionJob(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            reject(err);
        }
        else {
            console.log(data);
            resolve(data);
        }
    });
});
