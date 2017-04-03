var AsyncLock = require('async-lock');
var request = require('request');
var jwt = require('jsonwebtoken');
const cache = require('memory-cache');
const config = require('../../config');

var lock = new AsyncLock();

function getSignedPayload() {
    let settings = config.clientSettings.nomis;
    let d = new Date();
    let seconds = Math.round(d.getTime() / 1000);
    let payload = {
        "iat" : seconds,
        "token" : settings.token
    };

    var signedPayload = jwt.sign(payload, settings.key, { algorithm: 'ES256' });

    return signedPayload;
}

function getRequestOptions(url) {
    var token = getSignedPayload();
    return {
        url,
        headers: {
            'Accept': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    };
}

function get(url) {
    let settings = config.clientSettings.nomis;
    var fullUrl = `${settings.baseUri}/nomisapi/${url}`;

    var promise = new Promise((resolve, reject) => {

        var options = getRequestOptions(fullUrl);

        request.get(options, function(err, response, body) {
                if (err) {
                    reject(err);
                }
                var jsonResponse = JSON.parse(body);
                resolve(jsonResponse);
        });
    });

    return promise;
}

module.exports = {
    get: get
};