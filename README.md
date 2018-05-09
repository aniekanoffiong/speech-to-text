# AUDIO TO TEXT CONVERTER

This is an implementation of the Audio to Text Conversion using Google Cloud Speech To Text API.

## INSTALLATION

* Clone the repo: `git clone https://github.com/aniekanoffiong/speech-to-text.git`
* Change directory into the folder: `cd speech-to-text`
* Install dependencies: `npm install`
* Get the necessary Authentication/Authorization Credentials here:
  * Google Cloud Speech To Text API - [GCP Console](https://console.cloud.google.com/apis/credentials/serviceaccountkey?authuser=1&_ga=2.13578992.-657070447.1524165073)
  * Amazon Transcribe API - Sign up for/Login into account [AWS Transcribe API](aws.amazon.com)

* Add the credetials in the config files provided:
  * GCP: config/service-account-file.dummy.json
  * AWS Transcribe: config/aws-credentials.dummy.js
  * Remove .dummy from file names so they become service-account-file.json and aws-credentials.js respectively.

* Start the development server by running command: `node server`
* Visit `localhost:3000` in the browser to view and test app.

## LICENSE

MIT