var MongoClient = require('mongodb').MongoClient;

var localHostUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(localHostUrl,(err,db)=>{

if(err)
{return console.log(err)}


db.collection('Users').find({name:'Erin'}).toArray()
.then(result => 
{console.log(JSON.stringify(result,undefined,2))
}, err =>{console.log('there was an error ' + err)});


});
