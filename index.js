
var app = require('app') 
  , BrowserWindow = require('browser-window')
  //, Menu = require('menu')
  , ipc = require('ipc');

global.__root = __dirname;

require('crash-reporter').start();

app.on('ready', function() {

  var port = require('./www.js')()
    , host = 'localhost';

  app.main = new BrowserWindow({
    width: 1000,
    height: 600,
    center: true,
    icon: __dirname + '/resources/icon.png',
    show: false
  });

  //require('./plugins/file.js')(app);

  app.main.loadUrl('http' + '://' + host + ':' + port);

  app.main.show();

  app.main.maximize();

  app.main.on('close', function() {
    app.exit();
  });

  ipc.on('app.quit', function() {
    app.quit();
  });

  ipc.on('app.tools.open', function() {
    app.main.toggleDevTools();
  });

  ipc.on('app.reload', function() {
    app.main.reload();
  });

  ipc.on('tools-open', function() {
    app.main.toggleDevTools();
  });

  ipc.on('tools-open', function() {
    app.main.toggleDevTools();
  });

});
