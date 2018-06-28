var Datastore = require('nedb');
var MemDB = function(conf){
  this.db_path = conf.db
}

module.exports = MemDB

MemDB.prototype.connect = function(cbk){
    var self = this;
    var db = {}
    db.users = new Datastore({ filename: self.db_path.users, autoload: true });
    db.feeds = new Datastore({ filename: self.db_path.feeds, autoload: true });
    cbk(db)
}