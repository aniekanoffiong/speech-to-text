/* 
    You can get these details by creating an account on aws.amazon.com
    and then setting up security credentials
*/
module.exports = {
    accessKeyId: "<YOUR ACCESS KEY ID>",
    secretAccessKey: "<YOUR SECRET ACCESS KEY>",
    sslEnabled: true, // This is optional
    region: "eu-west-1", // This is the only AWS region outside the US that supports transcribe API
};