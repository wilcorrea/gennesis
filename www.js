/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function(port) {

  var express = require('express')
          , path = require('path');

  var www = express();

  www.get('/', function(request, response) {
    response.sendFile(__dirname + "/www/index.html");
  });

  www.use(express.static(path.join(__dirname, 'www')));

  var debug = require('debug')('www:server');
  var http = require('http');

  /**
   * Get port from environment and store in Express.
   */
  port = port ? port : normalizePort(process.env.PORT || '9956');

  www.set('port', port);

  /**
   * Create HTTP server.
   */
  var server = http.createServer(www);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Normalize a port into a number, string, or false.
   * @param {type} val
   * @returns {Boolean|_L62.normalizePort.port}
   */
  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * 
   * Event listener for HTTP server "error" event.
   * 
   * @param {type} error
   * @returns {undefined}
   */
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * 
   * Event listener for HTTP server "listening" event.
   * 
   * @returns {undefined}
   */
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  return port;
};