//Hungarian quality software

var mongo = require('mongodb');

module.exports = {
  createArticle : function(){
    var mongoClient = mongo.MongoClient;

    var url = "mongodb://localhost:27017/local";

    var sources = [{}];

    mongoClient.connect(url, function(error, db){
      if(error){
        console.log("Unable to connect to database, error: ", error);
      }else {

        var tweets = [];

        db.collection('sources').find({}).toArray(function(error, result){
          if(error){
            console.log("Unable to access collection!");
          }else if (result.length) {
            for (var i = 0; i < result.length; i += 1){
              console.log(i); 
            }

          }else {
            console.log("No documents found!");
          }

          db.close();
        });
      }
    });
  }
};

function insert(ret){
  var mongoClient = mongo.MongoClient;

  var url = "mongodb://localhost:27017/local";

  var sources = [{}];


    mongoClient.connect(url, function(error, db){

      db.collection('tweets').update({
        name:ret.name,
        handle:ret.handle,
        id:ret.id,
        tweetId:ret.tweetId,
        retweet_count:ret.retweet_count,
        text:ret.text,
        links:ret.links
      }, {
        name:ret.name,
        handle:ret.handle,
        id:ret.id,
        tweetId:ret.tweetId,
        retweet_count:ret.retweet_count,
        text:ret.text,
        links:ret.links
      },{
        upsert: true
      }).then(function(result){
        console.log("Updated/Insertes tweet from " + ret.handle)
        db.close();
      });
    });
}
