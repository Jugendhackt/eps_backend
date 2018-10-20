//Hungarian quality software

var mongo = require('mongodb');
var alasql = require('alasql');

var getRanked = function(callback){

  var mongoClient = mongo.MongoClient;

  var url = "mongodb://localhost:27017/local";

  mongoClient.connect(url, function(error, db){
    if(error){
      console.log("Unable to connect to database, error: ", error);
    }else {

      getSources(function(sources){

        var selection = [];

          db.collection('tweets').find({handle: sources[Math.floor(Math.random() * sources.length)].handle}).toArray(function(error, result){
            if(error){
              console.log("Unable to access collection!");
            }else if (result.length) {
              var selection2 = alasql('SELECT * FROM ? ORDER BY retweet_count',[result]).reverse().slice(0,36);

              var final = selection2[Math.floor(Math.random() * selection2.length)];

              var whatToSend = {
                'tweet': final.text,
                'id': final.tweetId
              };

              callback(whatToSend);
            }else {
              console.log("No documents found!");
            }

            db.close();
          });


      });
    }
  });
}

var getSources = function(callback){
  var mongoClient = mongo.MongoClient;

  var url = "mongodb://localhost:27017/local";

  var sources = [];

  mongoClient.connect(url, function(error, db){
    if(error){
      console.log("Unable to connect to database, error: ", error);
    }else {

      db.collection('sources').find({}).toArray(function(error, result){
        if(error){
          console.log("Unable to access collection!");
        }else if (result.length) {
          for (var i = 0; i < ((result.length > 4)?4:result.length); i += 1){
            sources[i] = {
              'name': result[i].name,
              'handle': result[i].handle
            };
          }
          callback(sources);

        }else {
          console.log("No documents found!");
        }

        db.close();
      });
    }
  });
}

module.exports = {
  getRanked: getRanked,
  getSources: getSources
}
