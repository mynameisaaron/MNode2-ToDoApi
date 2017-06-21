const {MongoClient,ObjectID} = require('mongodb');

const localConnection = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(localConnection,(err,db)=>{
    //MUST USE THE UPDATE OPERATORS HERE $set or $inc
    db.collection('Users').findOneAndUpdate({_id:new ObjectID("594a96fac5c0261bfc00c7b7")},{$inc : {age:1}},{returnOriginal:false})
    .then(result => console.log(result));
})