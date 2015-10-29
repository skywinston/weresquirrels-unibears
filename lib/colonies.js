var db = require('monk')('localhost/weresquirrels-unibears');
var colonies = db.get('colonies');

module.exports = {
  all: function(){
    return colonies.find({});
  },

  byId: function(id){
    return colonies.findById(id);
  }
};
