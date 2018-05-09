const Transcribe = require('aws-sdk/clients/transcribeservice');
const credentials = require('../../config/aws-credentials');

const transcribe = new Transcribe(credentials);

module.exports = transcript => new Promise((resolve, reject) => {
    const transcription = (typeof transcript === 'string' || transcript instanceof String)
        ? transcript : transcript.TranscriptionJob.TranscriptionJobName;
    const params = {
        TranscriptionJobName: transcription,
    };

    transcribe.getTranscriptionJob(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            reject(err);
        }
        else {
            resolve(data);
        }
    });
});
