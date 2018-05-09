'use strict'

const fs = require('fs');
const crypto = require("crypto");
const s3Store = require('./aws-s3-store');
const awsTranscribe = require('./aws-transcribe');
const transcript_returned = require('./aws-retrieve-transcript');

const Spinner = require('clui').Spinner;
const path = require('path');
const chalk = require('chalk');

module.exports = params => new Promise((resolve, reject) => {
    const convertedFile = params[0];
    const duration = params[1];
    try {

        Promise.resolve(convertedFile)
            .then(wavFile => {
                console.log(`Storing ${path.basename(wavFile)}...`);
                return s3Store(wavFile);
            })
            .then(storageFile => {
                console.log(`Transcribing ${storageFile.name}...`);
                return awsTranscribe(storageFile);
            })
            .then(transcription_result => {
                console.log('Retrieving Transcript');
                return transcript_returned(transcription_result)
            })
            .then(transcript => {
                const result = new Array();
                result.push(transcript);
                result.push(duration);
                resolve(result);
            })
            .catch(err => console.log(err));
    } catch (err) {
        console.log(err);
    }
});