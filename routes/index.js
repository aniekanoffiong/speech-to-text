// Dependencies
const express = require('express'),
    crypto = require('crypto'),
    mime = require('mime'),
    router = express.Router(),
    Controller = require('../libs/Controller'),
    google_stt = require('../libs/google/google-stt'),
    amazon_transcribe = require('../libs/amazon/amazon-transcribe-service'),
    convert_audio = require('../libs/convert-audio'),
    multer = require('multer');

// File Upload Handling
const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./upload");
    },
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            callback(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});
const upload = multer({ storage: Storage }).single('image');

// Routes For Classes
router.post('/convert', upload, Controller.transcribe);
router.get('/retrieve/:job_name', Controller.getTranscribe);

// Return router
module.exports = router;