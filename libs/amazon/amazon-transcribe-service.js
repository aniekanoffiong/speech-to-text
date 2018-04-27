'use strict'

const fs = require('fs');
const crypto = require("crypto");
const convert_audio = require('../convert-audio');
const s3Store = require('./aws-s3-store');
const awsTranscribe = require('./aws-transcribe');
const transcript_returned = require('./aws-retrieve-transcript');

const Spinner = require('clui').Spinner;
const path = require('path');
const chalk = require('chalk');

module.exports = params => {
    try {
        // Console stuff 
        const countdown = new Spinner(`Starting...`);
        countdown.start();

        Promise.resolve(params)
            .then(paths => {
                // countdown.message
                // // (`Converting ${path.basename(paths.input)} 
                // // to ${path.basename(paths.output)}...`);
                // return convert_audio(paths);
            })
            .then(wavFile => {
                countdown.message(`Storing ${path.basename(wavFile)}...`);
                return s3Store(wavFile);
            })
            .then(storageFile => {
                countdown.message(`Transcribing ${storageFile.name}...`);
                return awsTranscribe(storageFile);
            })
            .then(transcription_result => {
                countdown.message('Retrieving Transcript');
                return transcript_returned(transcription_result)
            })
            .then(transcript => {
                console.log(transcript);
                countdown.stop();
                return transcript;
            })
            .catch(err => console.log(err));
    } catch (err) {
        console.log(err);
    }
}