var express = require('express');
var router = express.Router();

var mens = require('../models/room')();
var womens = require('../models/room')();
var shower = require('../models/room')();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query);
  if (req.query.id) {
    switch (req.query.id) {
      case "1":
        mens.setStatus(req.query.open);
        break;
      case "2":
        womens.setStatus(req.query.open);
        break;
      case "3":
        shower.setStatus(req.query.open);
        break;
    }
  }
  res.send({});
});

router.get('/status', function(req, res) {
  res.render('status', {
    title: 'Bathroom Status',
    mens: mens.getStatusString(),
    womens: womens.getStatusString(),
    shower: shower.getStatusString()
    });
});

module.exports = router;
