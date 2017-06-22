const mongoose = require('mongoose');

//Telling Mongoose what promise library to use, promise behavior
// history: Promises were originally part of the library called Blue Bird, was later added to JS language
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


//mongoose needs 'model' structure to save to collection
//  // Second argument here is the Schema/Object
var Todo = mongoose.model('Todo',{
    text : {
        type:String
    },
    completed : {
        type : Boolean
    },
    completedAt :
    {
        type : Number
    }
});


// Now can instatiate a model
var newTodo = new Todo({
    text : 'Go out to dinner'
});


// thats all
newTodo.save()
.then(document=>{
    console.log(document);
    console.log(JSON.stringify(document,undefined,2));
}
,err=>console.log(err));




