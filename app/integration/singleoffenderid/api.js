var client = require('./client');

function Api() {
}

Api.prototype.getOffender = function(id) {
    var url = `/api/offenders/${id}`;
    return client.get(url);
};

Api.prototype.findOffenders = function(page, pageSize, nomsId) {
    var url = `/api/offenders/search?page=${page}&per_page=${pageSize}&noms_id=${nomsId}`;
    return client.get(url);
};

Api.prototype.getOffenders = function(page, pageSize, updatedAfter) {
    var url = `/api/offenders/?page=${page}&per_page=${pageSize}&updated_after=${updatedAfter}`;    
    return client.get(url);
};

Api.prototype.searchIdentities = function(page, pageSize, surname) {
    var url = `/api/identities/search/?page=${page}&per_page=${pageSize}&surname=${surname}`;
    return client.get(url);
};

Api.prototype.listIdentities = function(page, pageSize) {
    var url = `/api/identities/search/?page=${page}&per_page=${pageSize}`;
    return client.get(url);
};

module.exports = Api;