var client = require('./client');

function Api() {
}

Api.prototype.getActiveOffender = function(nomsId, dateOfBirth) {
    var url = `/lookup/active_offender/?noms_id=${nomsId}&date_of_birth=${dateOfBirth}`;
    return client.get(url);
};

Api.prototype.getDetails = function(nomsId) {
    var url = `/offenders/${nomsId}`;
    return client.get(url);
}


module.exports = Api;