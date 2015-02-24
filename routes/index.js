var express = require('express');
var router = express.Router();
var monitor = require('../models/monitor');
var Record = require('../models/record');

/* GET home page. */
router.get('/send/update', function(req, res) {
  monitor.updateStatus(req.query.id, req.query.open);
  res.send({});
});

router.get('/api/usage', function(req, res) {
  new Record({
    bathroom_id: 'm1',
    occupied: true,
    last_changed: new Date().toString(),
    duration: 1000,
  }).save(function(err, record) {
    console.log('record saved', record);
    res.send('done');
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
});

router.get('/status', function(req, res) {
  res.render('status', {
    title: 'Bathroom Status',
    mens: monitor.getStatusString("1"),
    womens: monitor.getStatusString("2"),
    shower: monitor.getStatusString("3")
    });
});

module.exports = router;
