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
var Colonies = require('../../lib/colonies.js');
var WereSquirrels = require('../../lib/weresquirrels.js');

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
    res.render('colonies/index', {colonies: coloniesPresenter});
  });
});

router.get('/:id', function(req, res, next){
  var ubPresenter;
  var wsPresenter = [];
  var god = {};
  Colonies.byId(req.params.id)
  .then(function(colony){
    god.currentColony = colony;
    return ubContract.find({colonyId: colony._id});
  })
  .then(function(contracts){
    var promises = contracts.map(function(contract){
      return unibears.findById(contract.unibear_id);
    });
    return Promise.all(promises)
  })
  .then(function(unibears){
    ubPresenter = unibears;
    return wsContract.find({colonyId: god.currentColony._id})
  })
  .then(function(wsCons){
    var promises = wsCons.map(function(con){
      return weresquirrels.findById(con.weresquirrel_id)
    });
    return Promise.all(promises);
  })
  .then(function(squirrels){
    squirrels.forEach(function(squirrel){
      wsPresenter.push({name:squirrel.name});
    });
    // wsPresenter['weresquirrels'] = squirrels;
    var promises = squirrels.map(function(squirrel){
      return wsStats.find({weresquirrel_id: squirrel._id});
    })
    return Promise.all(promises);
  }).then(function(playerStats){
    playerStats.forEach(function(player, i){
      wsPresenter[i]['duels'] = [];
      player.forEach(function(duel, j){
        var foods = {};
        foods.meat = duel.meat;
        foods.garlic = duel.garlic;
        wsPresenter[i]['duels'].push(foods);
      });
    });
    console.log(god);
    res.render('colonies/show', {
      weresquirrels: wsPresenter,
      unibears: ubPresenter,
      god: god
    });
  });

});



module.exports = router;
