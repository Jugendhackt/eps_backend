//Hungarian quality software

var mongo = require('mongodb');

module.exports = {
  login : function(uname, pass, callback){
    var mongoClient = mongo.MongoClient;

    var url = "mongodb://p3h3.de:27017/eps";

    mongoClient.connect(url, function(error, db){
      if(error){
        console.log("Unable to connect to database, error: ", error);
      }else {
        db.collection('user').find({username: uname, password: pass}).toArray(function(error, result){
          if(error){
            console.log("Unable to access collection!");
          }else if (result.length) {
            console.log(result);
            callback(true);
          }else {
            console.log("No documents found!");
            callback(false);
          }
          db.close();
        });
      }
    });
  }
};
