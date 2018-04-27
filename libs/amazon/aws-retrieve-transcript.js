const Transcribe = require('aws-sdk/clients/transcribeservice');
const credentials = require('../../config/aws-credentials');

const transcribe = new Transcribe(credentials);

module.exports = transcript => new Promise((resolve, reject) => {
    const params = {
        // TranscriptionJobName: transcript,
        TranscriptionJobName: transcript.TranscriptionJob.TranscriptionJobName,
    };

    transcribe.getTranscriptionJob(params, function (err, data) {
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
