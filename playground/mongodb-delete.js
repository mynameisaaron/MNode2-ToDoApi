const {MongoClient,ObjectID} = require('mongodb')
var localURL = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(localURL,(err,db)=>{
    if(err){return console.log('there was an error');}

    // deleteMany
    // deleteOne
    // findOneAndDelete

    db.collection('Users').deleteMany({name:"Aaron"})
    .then(result => {
        console.log('Deleted ' + result);
        
        db.collection('Users').findOneAndDelete({_id : new ObjectID("594a96ec6f426d29707829c9")}).then(result=>{console.log('ALL DONE')});
})

});