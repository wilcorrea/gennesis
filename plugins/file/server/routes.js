(function() {

  'use strict';

  var express = require('express');
  var router = express.Router();
  var fs = require('fs');
  var path = require('path');

  var STORAGE = require('node-persist');


  STORAGE.init({

    dir: 'storage',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false, // can also be custom logging function
    continuous: true,
    interval: false,
    ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS

  }, function() {

  } /* optional callback */ ).then(
    /*onSuccess*/
    function() {

    },
    /*onError*/
    function() {

    }
  ); // or use the promise


  /* GET home page. */
  /*
  router.get('/', function(req, res) {
    res.render('index');
  });
  */

  router = require('./routes/tree.js')(router);
  router = require('./routes/resources.js')(router);

  module.exports = router;

}());