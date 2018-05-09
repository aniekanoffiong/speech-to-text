const google_stt = require('./google/google-stt'),
    amazon_transcribe = require('./amazon/amazon-transcribe-service'),
    convert_audio = require('./convert-audio'),
    transcript_returned = require('./amazon/aws-retrieve-transcript');

const Controller = {
    transcribe: (req, res, next) => {
        try {
            file = './upload/' + req.file.filename;
            Promise.resolve(file)
                .then(paths => {
                    // Converting audio file to .flac format 
                    return convert_audio(paths);
                })
                .then((param) => {
                    const convertedFile = param[0];
                    const duration = param[1];
                    if (duration > 1.5) {
                        console.log('Using Amazon Transcribe Service');
                        return amazon_transcribe(param);
                    }
                    console.log('Using Google Speech To Text Service');
                    return google_stt(convertedFile);
                })
                .then(transcript => {
                    // Returning transcribed file
                    console.log('Completed');
                    res.send(transcript);
                })
                .catch((err) => {
                    console.log(err);
                    res.send('Error Transcribing File');
                });
        } catch (err) {
            console.log(err);
            res.send('Error Transcribing File');
        }
    },

    getTranscribe: (req, res, next) => {
        try {
            jobName = req.params.job_name;
            Promise.resolve(jobName)
            .then(transcription_result => {
                return transcript_returned(transcription_result)
            })
            .then(transcript => {
                // Returning transcribed file
                console.log('Completed');
                res.send(transcript);
            })
            .catch((err) => {
                console.log(err);
                res.send('Error Retrieving Transcription');
            });
        } catch (err) {
            console.log(err);
            res.send('Error Retrieving Transcription');
        }
    },
}

module.exports = Controller;
