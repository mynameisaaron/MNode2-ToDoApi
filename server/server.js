const mongoose = require('mongoose');

//Telling Mongoose what promise library to use, promise behavior
// history: Promises were originally part of the library called Blue Bird, was later added to JS language
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


//mongoose needs 'model' structure to save to collection
//  // Second argument here is the Schema/Object
var Todo = mongoose.model('Todo',{
    text : {
        type:String,
        required : true,
        trim : true,
        minlength : 1
    },
    completed : {
        type : Boolean,
        default : false
    },
    completedAt :
    {
        type : Number,
        default : null
    }
});


var User = mongoose.model('User', {
    email : {
        type : String,
        required : true,
        trim : true,
        minlength : 1
    }
});


// Now can instatiate a model
var newTodo = new Todo({
    text : '          New todo with validation    '
});

var newUser = new User({email:'     aaronbrightman@gmail.com                '});



// thats all
newTodo.save()
.then(document=>{
   console.log(JSON.stringify(document,undefined,2));
}
,err=>console.log(err));


newUser.save()
.then(document=>{
   console.log(JSON.stringify(document,undefined,2));
}
,err=>console.log(err));


