var mens = require('../models/room')();
var womens = require('../models/room')();
var shower = require('../models/room')();

module.exports = {

  updateStatus: function(id, open) {
    if (id) {
      switch (id) {
        case "1":
          mens.setStatus(open);
          break;
        case "2":
          womens.setStatus(open);
          break;
        case "3":
          shower.setStatus(open);
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
  }
}
