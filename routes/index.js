var express = require('express');
var router = express.Router();
var monitor = require('../models/monitor');

var mongo  = require('../config/mongo');

/* GET home page. */
router.get('/send/update', function(req, res) {

  var log = {
    bathId: req.query.id,
    open: req.query.open,
    createdAt: new Date()
  };

  mongo.db.bathLogs.insert(log, function(err) {
    //mongo.db.close();
    monitor.updateStatus(log.bathId, log.open);
    res.send({});
  });

});

router.get('/ascii/getupdate', function(req, res) {
  res.setHeader('content-type', 'text/plain');
  var to_send = "";
  for(var i = 1; i <= 3; i++) {
    to_send += i.toString();
    if(monitor.getStatusBoolean(i.toString())) {
      to_send += "t";
    } else {
      to_send += "f";
    }
  }
  console.log(to_send);
  res.send(to_send);
})

router.get('/status', function(req, res) {
  res.render('status', {
    title: 'Bathroom Status',
    mens: monitor.getStatusString("1"),
    womens: monitor.getStatusString("2"),
    shower: monitor.getStatusString("3")
    });
});

module.exports = router;
