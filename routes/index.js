var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/weresquirrels-unibears');
var colonies = db.get('colonies');
var unibears = db.get('unibears');
var weresquirrels = db.get('weresquirrels');
var ubContract = db.get('ubContract');
var wsContract = db.get('wsContract');
var duels = db.get('duels');
var wsStats = db.get('wsStats');
var Colonies = require('../lib/colonies.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var coloniesPresenter = [];
  Colonies.all().then(function(colonies){
    var promises = colonies.map(function(colony){
      return duels.find({winner: colony._id}).then(function(win){
        coloniesPresenter.push({wins: win.length, name: colony.name, id: colony._id});
      });
    });
    return Promise.all(promises)
  }).then(function(){
    res.render('index', {colonies: coloniesPresenter});
  });
});

module.exports = router;
