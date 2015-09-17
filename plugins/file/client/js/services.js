(function() {

  'use strict';

  app.service('Storage', ['$log', function(log) {

    this.storage = require('node-persist');

    this.storage.initSync({
      dir: path.resolve(__root,'plugins','file','client','storage','data'),
    });

    /**
     * 
     * @param key
     * @param value
     */
    this.set = function(key, value) {
      return this.storage.setItem(key, value);
    };

    /**
     * 
     * @param key
     */
    this.get = function(key, value) {
      var _get = this.storage.getItem(key);
      if (typeof _get === 'undefined') {
        _get = value;
        this.set(key, _get);
      }
      return _get;
    };
      
  }]);

}());
