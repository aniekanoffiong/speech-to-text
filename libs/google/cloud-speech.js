const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient({
    projectId: 'speech-to-text-201621',
    keyFilename: './config/service-account-file.json'    
});

const config = {
    encoding: 'FLAC',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
};

module.exports = fileName =>
    new Promise((resolve, reject) => {
        request = {
            config: config,
            audio: {
                uri: fileName,
            },
        }
        client.longRunningRecognize(request)
            .then(data => {
                const response = data[0];
                const operation = response.promise();
                return operation;
            })
            .then(data => {
                const response = data[0];
                const transcription = response.results
                    .map(result => result.alternatives[0].transcript)
                    .join('\n');
                resolve(transcription);
            })
            .catch(err => {
                console.error('ERROR:', err)
            });
    });