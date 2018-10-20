//Hungarian quality software

var mongo = require('mongodb');

module.exports = {
  verify : function(username, password){
    var mongoClient = mongo.MongoClient;

    var url = "mongodb://100.100.230.145:27017/eps";

    mongoClient.connect(url, function(error, db){
      if(error){
        console.log("Unable to connect to database, error: ", error);
      }else {
        console.log(param);
        db.collection('user').find({username: user, password: password}).toArray(function(error, result){
          if(error){
            console.log("Unable to access collection!");
          }else if (result.length) {
            var whose = result[0].username;

            callback(whose);

          }else {
            console.log("No documents found!");
          }

          db.close();
        });
      }
    });
  }
};
