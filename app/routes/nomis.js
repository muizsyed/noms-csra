var express = require('express');
var router = express.Router();
var Nomis = require('../integration/nomis');
var api = new Nomis.api();

router.get('/', function(req, res, next) {


    res.render('nomis/index');
});

router.post('/', function(req, res, next) {
    api.getActiveOffender(req.body.nomsid, req.body.dob)
    .then(function(data) {
        res.render('nomis/index', { data: JSON.stringify(data) });  
    }, function(error) {
        console.error(error);
    })
});

module.exports = router;