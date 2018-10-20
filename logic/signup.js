//Hungarian quality software

var mongo = require('mongodb');

module.exports = {
  signup : function(uname, pass, callback){
    var mongoClient = mongo.MongoClient;

    var url = "mongodb://p3h3.de:27017/eps";

    mongoClient.connect(url, function(error, db){
      if(error){
        console.log("Unable to connect to database, error: ", error);
      }else {
        db.collection('user').find({username: uname}).toArray(function(error, result){
          if(error){
            callback(false);
          }else if(result.length){
            console.log(result);
            callback(false);
          }else{
             db.collection('user').update({
                username: uname,
                password: pass
             }, {
                username: uname,
               password: pass
             },{
               upsert: true
             }).then(function(result){
               console.log("Updated/Inserted")
               callback(true);
               db.close();
             });
          }
        });
      }
    });
  }
};
