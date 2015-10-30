var db = require('monk')('localhost/weresquirrels-unibears');
var weresquirrels = db.get('weresquirrels');

module.exports = {
  all: function(){
    return weresquirrels.find({});
  },
  byId: function(id){
    return weresquirrels.findById(id);
  }
}
