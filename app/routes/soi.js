var express = require('express');
var router = express.Router();
var SingleOffenderId = require('../integration/singleoffenderid');
var api = new SingleOffenderId.api();

router.get('/identities/search', function(req, res, next) {
  res.render('soi/search', { });  
});

router.post('/identities/search', function(req, res, next) {
    api.searchIdentities(1,10,req.body.surname)
    .then(function(data) {
        res.render('soi/search', { title: 'Search identies', data: JSON.stringify(data) });
    }, function(error) {
        console.error(error);
    });
});

router.get('/identities', function(req, res, next) {
    api.listIdentities(1,10)
    .then(function(data) {
        res.render('soi/identities', { title: 'Search identies', data: JSON.stringify(data) });
    }, function(error) {
        console.error(error);
    });
});


module.exports = router;
