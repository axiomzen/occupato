/*
 *  Generates a headless browser for the tests
 */

var Browser = require('zombie');
var fs = require('fs');
var path = require('path');

module.exports = function () {
  var browser = Browser.create({ site: 'http://localhost:3777', silent: true });

  // We use our local copies to save the trip to retrieve them
  browser.resources.mock('https://code.jquery.com/jquery-2.1.1.js', {
    statusCode: 200,
    headers:    { 'ContentType': 'application/x-javascript' },
    body:       fs.readFileSync(path.join(__dirname, '..','resources','jquery-2.1.1.js'), 'utf8')
  });

  browser.resources.mock('https://cdn.socket.io/socket.io-1.0.0.js', {
    statusCode: 200,
    headers:    { 'ContentType': 'application/javascript' },
    body:       fs.readFileSync(path.join(__dirname, '..','resources','socket.io-1.0.0.js'), 'utf8')
  });

  browser.on('console', function(level, message) {
    if (level === 'log' && message.match(/mens/)) {
      browser.socketIOConsoleBuffer = message;
    }
  });

  return browser;
}();
