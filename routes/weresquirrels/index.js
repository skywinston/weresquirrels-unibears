var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/weresquirrels-unibears');
// var colonies = db.get('colonies');
var unibears = db.get('unibears');
// var weresquirrels = db.get('weresquirrels');
var ubContract = db.get('ubContract');
var wsContract = db.get('wsContract');
var duels = db.get('duels');
var wsStats = db.get('wsStats');
var Colonies = require('../../lib/colonies.js');
var WereSquirrels = require('../../lib/weresquirrels.js');

router.get('/', function(req, res){
  var weresquirrels,
      contracts,
      colonies;

  WereSquirrels.all()
  .then(function(ws){
    weresquirrels = ws;
    var promises = ws.map(function(squirrel){
      return wsContract.find({weresquirrel_id: squirrel._id});
    });
    return Promise.all(promises);
  })
  .then(function(ctrcs){
    contracts = ctrcs;
    var promises = contracts.map(function(contract){
      return Colonies.byId(contract[0].colonyId);
    })
    return Promise.all(promises);
  })
  .then(function(colnys){
    colonies = colnys;
    var promises = weresquirrels.map(function(s){
      return wsStats.find({weresquirrel_id: s._id});
    });
    return Promise.all(promises);
  }).then(function(allStats){
    console.log(contracts);
    weresquirrels.forEach(function(s){
      s['meat'] = 0;
      s['garlic'] = 0;
    });

    allStats.forEach(function(individualStat, i){
      individualStat.forEach(function(stat){
        weresquirrels[i]['meat'] += stat.meat;
        weresquirrels[i]['garlic'] += stat.garlic;
      })
    });



    console.log(weresquirrels);
  });
})

module.exports = router;
