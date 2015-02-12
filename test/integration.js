/*
 *  Just a quick integration test to save us the trouble of loading
 *  the package, firing the browser and simulate the arduino calls
 */

var browser = require('./loaders/browser'),
    request = require('request'),
    server = require('./loaders/server');

describe('integration', function() {
  before(function(done) {
    server.start(function() {
      done();
    });
  });

  describe('when the aplication is running in one client', function() {
    before(function(done) {
      browser.visit('/status');

      function socketIsDefined() {
        return browser.evaluate('window.socket');
      }

      browser.wait(socketIsDefined, function() {
        done();
      });
    });

    describe('when all bathrooms are available', function() {
      it('should show the three columns blue', function() {
        var statuses = getStatuses();
        for (var i in [0,1,2]) {
          statuses[i].should.match(/occupato-empty/);
        }
      });

      describe('when the men bathroom is busy', function() {
         before(function(done) {
          browser.socketIOConsoleBuffer = '';
          emulateArduinoRequest('men', 'busy', function() {
            browser.wait(gotSocketUpdate, function () {
              done();
            });
          });
        });

        it('should show the column of `men` busy, `women` available and `shower` available', function() {
          var statuses = getStatuses();
          statuses[0].should.match(/occupato-mens occupato-empty occupato-occupied/);
          statuses[1].should.match(/occupato-womens occupato-empty\">/);
          statuses[2].should.match(/occupato-shower occupato-empty\">/);
        });

        describe('when the women bathroom is busy', function() {
          before(function(done) {
            browser.socketIOConsoleBuffer = '';
            emulateArduinoRequest('women', 'busy', function() {
              browser.wait(gotSocketUpdate, function () {
                done();
              });
            });
          });

          it('should show the column of `men` busy, `women` busy and `shower` available', function() {
            var statuses = getStatuses();
            statuses[0].should.match(/occupato-mens occupato-empty occupato-occupied/);
            statuses[1].should.match(/occupato-womens occupato-empty occupato-occupied/);
            statuses[2].should.match(/occupato-shower occupato-empty\">/);
          });

          describe('when the shower bathroom is busy', function() {
            before(function(done) {
              browser.socketIOConsoleBuffer = '';
              emulateArduinoRequest('shower', 'busy', function() {
                browser.wait(gotSocketUpdate, function () {
                  done();
                });
              });
            });

            it('should show the column of `men` busy, `women` busy and `shower` busy', function() {
              var statuses = getStatuses();
              statuses[0].should.match(/occupato-mens occupato-empty occupato-occupied/);
              statuses[1].should.match(/occupato-womens occupato-empty occupato-occupied/);
              statuses[2].should.match(/occupato-shower occupato-empty occupato-occupied/);
            });

            describe('when the shower bathroom is available again', function() {
              before(function(done) {
                browser.socketIOConsoleBuffer = '';
                emulateArduinoRequest('shower', 'available', function() {
                  browser.wait(gotSocketUpdate, function () {
                    done();
                  });
                });
              });

              it('should show the column of `men` busy, `women` busy and `shower` available', function() {
                var statuses = getStatuses();
                statuses[0].should.match(/occupato-mens occupato-empty occupato-occupied/);
                statuses[1].should.match(/occupato-womens occupato-empty occupato-occupied/);
                statuses[2].should.match(/occupato-shower occupato-empty\">/);
              });
            });
          });

          describe('when the women bathroom is available again', function() {
            before(function(done) {
              browser.socketIOConsoleBuffer = '';
              emulateArduinoRequest('women', 'available', function() {
                browser.wait(gotSocketUpdate, function () {
                  done();
                });
              });
            });

            it('should show the column of `men` busy, `women` available and `shower` available', function() {
              var statuses = getStatuses();
              statuses[0].should.match(/occupato-mens occupato-empty occupato-occupied/);
              statuses[1].should.match(/occupato-womens occupato-empty\">/);
              statuses[2].should.match(/occupato-shower occupato-empty\">/);
            });
          });
        });

        describe('when the men bathroom is available again', function() {
          before(function(done) {
            browser.socketIOConsoleBuffer = '';
            emulateArduinoRequest('men', 'available', function() {
              browser.wait(gotSocketUpdate, function () {
                done();
              });
            });
          });

          it('should show the column of `men` available, `women` available and `shower` available', function() {
            var statuses = getStatuses();
            statuses[0].should.match(/occupato-mens occupato-empty\">/);
            statuses[1].should.match(/occupato-womens occupato-empty\">/);
            statuses[2].should.match(/occupato-shower occupato-empty\">/);
          });
        });
      });
    });
  });

  after(function() {
    server.stop();
  });
});

/*
 * AUXILIAR FUNCTIONS
 *
 */
function getStatuses() {
  return browser
    .queryAll('.occupato-status')
    .map(function (e) {
      return e.outerHTML.trim();
    });
}

function gotSocketUpdate() {
  return browser.socketIOConsoleBuffer !== '';
}

function emulateArduinoRequest(room, status, callback) {
  var _room, _status;

  switch (room) {
    case 'men':
      _room = 1;
      break;
    case 'women':
      _room = 2;
      break;
    case 'shower':
      _room = 3;
      break;
  }

  switch (status) {
    case 'available':
      _status = 0;
      break;
    case 'busy':
      _status = 1;
      break;
  }

  var uri = 'http://localhost:3777/send/update?id=' + _room + '&open=' + _status;
  return request({ method: 'GET', uri: uri }, callback);
}
