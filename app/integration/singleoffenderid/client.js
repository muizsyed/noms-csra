var AsyncLock = require('async-lock');
var request = require('request');
const cache = require('memory-cache');
const config = require('../../config');

var lock = new AsyncLock();

function getToken() {
    let key = '__singleoffenderid__';

    var cachedTokenPromise = new Promise((resolve, reject) => {
        lock.acquire(key, function(done) {

            var token = cache.get(key);

            if (token) {
                done();
                resolve(token);
            } else {
                getNewToken().then(function(newToken) {
                    var expiresInMs = newToken.expires_in * 60 * 0.9;
                    cache.put(key, newToken, expiresInMs);
                    done();
                    resolve(newToken);
                });
            }
            
        }, function(err, ret) {
            if (err) {
                reject(err);
            }
        });
    });

    return cachedTokenPromise;
}

function getNewToken() {

    var tokenPromise = new Promise((resolve, reject) => {
        let settings = config.clientSettings.singleOffenderId;

        let tokenUri = `${settings.baseUri}/oauth/token?grant_type=client_credentials&client_id=${settings.clientKey}&client_secret=${settings.clientSecret}`;

        request.post({ url: tokenUri }, function(err, response, body) {
            if (err) {
                reject(err);
            }
            var token = JSON.parse(body);
            resolve(token);
        });
    });

    return tokenPromise;
}

function getRequestOptions(url, token) {
    return {
        url,
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    };
}

function get(url) {

    let settings = config.clientSettings.singleOffenderId;
    let fullUrl = `${settings.baseUri}${url}`;
    var promise = new Promise((resolve, reject) => {
        getToken()
        .then(function(token) {

            var options = getRequestOptions(fullUrl, token.access_token);

            request.get(options, function(err, response, body) {
                if (err) {
                    reject(err);
                }
                var jsonResponse = JSON.parse(body);
                resolve(jsonResponse);
            });

        }, function(error) {
            console.error(error);
            reject(error);
        })
    });

    return promise;
}

module.exports = {
    get: get
}