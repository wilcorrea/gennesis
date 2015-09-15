/**
 * 
 * start electron stand alone
 */
var app = require('app')
  , BrowserWindow = require('browser-window')
  //, Menu = require('menu')
  , ipc = require('ipc');

require('crash-reporter').start();

app.on('ready', function() {

  var host = 'localhost'
    , port = 4477;

  app.main = new BrowserWindow({
    width: 1000,
    height: 600,
    center: true,
    icon: __dirname + '/resources/icon.png',
    show: false
  });

  require('./server/app.js')(port);
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

  app.preview = new BrowserWindow({
    'width': 1000,
    'height': 600,
    'center': true,
    'icon': __dirname + '/resources/icon.png',
    // 'frame': false,
    // 'always-on-top': true,
    // 'resizable': false,
    'show': false
  });

  app.preview.on('close', function(event){
    event.preventDefault();
    app.preview.hide();
  });

  ipc.on('preview.show', function() {
    app.preview.show();
  });

  ipc.on('preview.hide', function() {
    app.preview.hide();
  });

  ipc.on('preview.open', function(event, url, x, y, width, height) {
    app.preview.show();
    app.preview.setBounds({x: x, y: y, width: width, height: height});
    app.preview.loadUrl(url);
  });

});
