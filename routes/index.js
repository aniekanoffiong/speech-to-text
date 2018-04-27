// Dependencies
const express = require('express'),
    crypto = require('crypto'),
    mime = require('mime'),
    router = express.Router(),
    google_stt = require('../libs/google/google-stt'),
    amazon_transcribe = require('../libs/amazon/amazon-transcribe-service'),
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
router.post('/convert', upload, (req, res, next) => {
    try {
        file = './upload/' + req.file.filename;
        Promise.resolve(file)
            .then(paths => {
                // return amazon_transcribe(paths);
                return google_stt(paths);
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
});
// router.get('/classes/:class_id', StudentClassController.getClass);

// Return router
module.exports = router;