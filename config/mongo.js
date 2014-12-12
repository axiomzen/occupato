
var config    = require('./config');
var mongoskin = require('mongoskin');
var db        = mongoskin.db(config.mongo.url, {safe: true})

db.bind('bathroom');
db.bind('bathLogs');

var mongo = {
  db: db
}

module.exports = mongo;
