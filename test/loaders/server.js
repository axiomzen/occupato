/*
 *  Loads the occupato server in a child process
 */

var child,
    path = require('path'),
    server = {},
    spawn = require('child_process').spawn;

module.exports = server;

server.start = function(callback) {
  process.env.DEBUG = 'server'

  child = spawn(path.join(__dirname,'..', '..','bin','www'), [], { env: process.env });

  // TODO
  // Not sure why the debug library is outputing into stderr
  child.stderr.on('data', function(data) {
    if (data.toString().match(/Express server listening on port/)) {
      return callback();
    }
  });
}

server.stop = function() {
  child.kill('SIGINT');
}
