// Requiring all Dependencies
const fs = require('fs');
    convert_audio = require('../convert-audio'),
    cloudStore = require('./cloud-storage'),
    cloudSpeech = require('./cloud-speech'),
    Spinner = require('clui').Spinner,
    path = require('path'),
    chalk = require('chalk');

module.exports = params => new Promise((resolve, reject) => {
    try {
        // Console stuff 
        const countdown = new Spinner(`Starting...`);
        countdown.start();
    
        Promise.resolve(params)
            .then(wavFile => {
                // Storing on Zgoogle Cloud Storage
                countdown.message(`Storing ${path.basename(wavFile)}...`);
                return cloudStore(wavFile);
            })
            .then(storageFile => {
                // Transcribing Stored audio file
                countdown.message(`Transcribing ${storageFile.name}...`);
                countdown.stop();
                resolve(cloudSpeech('gs://audio-convert-to-text-bucket/'
                    + storageFile.name));
            })
            .catch(err => {
                reject(err);
                console.log(err)
            });
    } catch (err) {
        reject(err);
        console.log(err);
    }
})
