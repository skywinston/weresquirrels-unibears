var db = require('monk')('localhost/weresquirrels-unibears');
var weresquirrels = db.get('weresquirrels');
var wsContracts = db.get('wsContract');
var colonies = db.get('colonies');

module.exports = {
  all: function(){
    return weresquirrels.find({});
  },
  byId: function(id){
    return weresquirrels.findById(id);
  },
  getColonyName: function(weresquirrel){
    return wsContracts.findOne({weresquirrel_id: weresquirrel._id}).then(function(contract){
      return colonies.findById(contract.colonyId).then(function(colony){
        return colony.name;
      });
    });
  }
}
