var db = require('mongoose');
var config = require('./config');

console.log('mongo url', config.mongo);
db.connect(config.mongo, {
    db: { safe: true }
  },
  function(err) { });
