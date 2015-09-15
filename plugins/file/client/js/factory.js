(function() {

  'use strict';

  app.factory('FileFactory', ['$http', function($http) {

    var _factory = {};

    _factory.get = function(id, host) {
      host ? host : config.host;
      return $http.get(host + '/api/resource/get/' + encodeURIComponent(id));
    };

    _factory.set = function(id, file, callback, host) {

      host ? host : config.host;
      return $http.post(host + '/api/resource/set/' + encodeURIComponent(id), {
          file: file
        })
        .then(function(response) {
          try {
            callback.call(this, response);
          } catch (e) {

          }
        });
    };

    _factory.mv = function(source, target, callback, host) {

      host ? host : config.host;
      return $http.post(host + '/api/resource/mv/' + encodeURIComponent(source) + '/' + encodeURIComponent(target))
        .then(function(response) {
          try {
            callback.call(this, response);
          } catch (e) {

          }
        });
    };

    _factory.cp = function(source, target, callback, host) {

      host ? host : config.host;
      return $http.post(host + '/api/resource/cp/' + encodeURIComponent(source) + '/' + encodeURIComponent(target))
        .then(function(response) {
          try {
            callback.call(this, response);
          } catch (e) {

          }
        });
    };

    _factory.rm = function(id, callback, host) {

      host ? host : config.host;
      return $http.post(host + '/api/resource/rm/' + encodeURIComponent(id))
        .then(function(response) {
          try {
            callback.call(this, response);
          } catch (e) {

          }
        });
    };

    _factory.mkdir = function(id, callback, host) {

      host ? host : config.host;
      return $http.post(host + '/api/resource/mkdir/' + encodeURIComponent(id))
        .then(function(response) {
          try {
            callback.call(this, response);
          } catch (e) {

          }
        });
    };

    _factory.search = function(host, id, query, callback) {
      host ? host : config.host;
      return $http.get(host + '/api/resource/search/' + encodeURIComponent(id) + '/' + encodeURIComponent(query)).then(function(response) {
          try {
            callback.call(this, response);
          } catch (e) {

          }
        });
    };

    return _factory;
  }]);

}());