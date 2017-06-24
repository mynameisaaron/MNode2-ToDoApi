const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');

var databaseId = '594d475f3887a58821bea4a8';
var databaseId_InvalidObjectID = '194d475f3887a58821bea4a8a';

//findarry

Todo.find({_id:databaseId})
.then(Arrayresult=>console.log( Arrayresult))

//findone

Todo.findOne({_id:databaseId})
.then(singleResult=>
{
    if(!singleResult)
    {
        return console.log('Record Not Found')
    }
    console.log('findOne' +singleResult)
})
.catch(e=>{console.log('This will fire if the ObjectId is invalid, ie cannot be cast to an ObjectId object ' + e)})
;

//findbyid
Todo.findById(databaseId)
.then(singleResult=>console.log('findById ' + singleResult))





//ONE OTHER WAY TO TEST FOR A VALID OBJECTID
// this static function
const {ObjectID} = require('mongodb');
console.log('This is a VALID ObjectId ' + ObjectID.isValid(databaseId));
console.log('This is an InValid ObjectId ' + !ObjectID.isValid(databaseId_InvalidObjectID));
