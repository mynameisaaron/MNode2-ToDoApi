//var MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');




var localHostUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(localHostUrl, (err, db) => {
    if (err) {
        return console.log('There was an error connecting');
    }
    console.log('Connected');


    db.collection('Users').insertOne({
        name : "Aaron",
        age: 35,
        location : 'Detroit, Michigan'
    },(err,result)=>{
        if(err){
            return console.log('There was an error ' + err);
        }
        // console.log(JSON.stringify(result.ops,undefined,2));
        console.log(result.ops[0]._id.getTimestamp());
    })


db.close();

});

   