
module.exports = function(app) {
  
  var BrowserWindow = require('browser-window')
    , ipc = require('ipc')
    , host = 'localhost'
    , port = 4477;

  app.file = new BrowserWindow({
    width: 800,
    height: 400,
    show: false
  });
  
  app.file.setMenuBarVisibility(false);
  app.file.setMenu(null);

  app.file.on('close', function(event){
    event.preventDefault();
    app.file.hide();
  });

  ///home/william/Documentos/HTML5/gennesis/plugins
  require('./file/server/app.js');

  ipc.on('file.show', function () {
    if (!app.file.isVisible()) {
      app.file.show();
      if (!app.file.loaded) {
        app.file.loadUrl('http' + '://' + host + ':' + port);
        app.file.loaded = true;
      }
    }
  });

  ipc.on('file.hide', function () {
    if (app.file.isVisible()) {
      app.file.hide();
    }
  });
  
  return app;
};
