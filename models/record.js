var db = require('mongoose');

var schema = new db.Schema({
  bathroom_id: { type: String, required: true },
  occupied: { type: Boolean, required: true },
  last_changed: { type: Date, required: true },
  duration: { type: Number, required: true },
});

var Record = db.model('Record', schema);
module.exports = Record;
