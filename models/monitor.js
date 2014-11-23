var mens = require('../models/room')();
var womens = require('../models/room')();
var shower = require('../models/room')();

var io;

sendUpdates = function() {
  if (io) {
    io.emit('update', {
      mens: mens.getStatusString(),
      womens: womens.getStatusString(),
      shower: shower.getStatusString()
    });
  }
}

module.exports = {

  updateStatus: function(id, open) {
    if (id !== null) {
      switch (id) {
        case "1":
          mens.setStatus(open);
          sendUpdates();
          break;
        case "2":
          womens.setStatus(open);
          sendUpdates();
          break;
        case "3":
          shower.setStatus(open);
          sendUpdates();
          break;
      }
    }
    return;
  },

  getStatusString: function(id) {
    switch (id) {
      case "1":
        return mens.getStatusString();
      case "2":
        return womens.getStatusString();
      case "3":
        return shower.getStatusString();
    }
  },

  addIO: function(app_IO) {
    io = app_IO;
  }
}
