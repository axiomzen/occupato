var express = require('express');
var router = express.Router();
var monitor = require('../models/monitor');

/* GET home page. */
router.get('/', function(req, res) {
  monitor.updateStatus(req.params.id, req.params.open);
  res.send({});
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
