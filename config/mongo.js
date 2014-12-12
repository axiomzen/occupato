
var config    = require('./config');
var mongoskin = require('mongoskin');
var db        = mongoskin.db(config.mongo.url, {safe: true})

db.bind('bathroom');
db.bind('bathLogs');

db.counters.insert({_id: 'bathLogsId', seq: 0}, function(){});

var mongo = {
  db: db,
  getNextSequence: function(name, fn) {
    db.counters.findAndModify(
      {
        query: { _id: name },
        update: { $inc: { seq: 1 } },
        new: true
      },
      fn
    );
  }
}

module.exports = mongo;
