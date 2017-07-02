const mongoose = require('mongoose');
const validator = require('validator');

const jwt = require('jsonwebtoken');
const _ = require('lodash');

// We want to 'tack-on' some custom methods to the model
//   SO > we need to user the mongoose.Schema constructor method to create mongoose model
//       , in order to add functions/methods to the model


var UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
        unique:true,
        //validate w/ validator & message property - part of mongoosejs custom validation
        //validate function will return true if validated
        // 
        //FOLLOW THIS STRUCTURE
        validate:{
            validator : function(value)
            {
               return validator.isEmail(value); //=> true
            },
            message: "I'm sorry that is not a valid email"
        }
    },
    password : {
        type:String,
        require:true,
        minlength:6
    },
    tokens:[{
        
            access:{
                type:String,
                required:true
            }
        
        ,
        
            token : {
                type:String,
                required:true
             }
        
        
    }]
})


//HERE WE WANT TO OVERRIDE THE USER.TOJSON METHOD, TO LIMIT THE INFORMATION SETBACK FROM A POST
// ONLY SENDS BACK EMAIL (NO PASSWORD OR TOKENS)
UserSchema.methods.toJSON = function(){
    var user = this;

    var userObject = user.toObject();

    return _.pick(userObject,['_id', 'email']);
}



// UserSchema.methods is an object, can add all the instance methods to objects here!
        //SIDENOTE , Arrow functions 'do not bind the 'THIS' keyword'   We need to bind the 'this' keyword
        //  NEED TO BIND 'THIS' TO THE INSTANCE OF THIS MODEL
UserSchema.methods.generateAuthToken = function(){
//ex of sidenote >   var user = this;
var user = this;

var access = 'auth';
var token = jwt.sign({ _id:user._id.toHexString(), access}, 'SaltString').toString();

user.tokens.push({access,token});

//this is returning a promise with the token passed in
return user.save().then(() => {
     return token;
   });
// 'token' is passed in as the next success argument for the promise

}

var User = mongoose.model('User', UserSchema);

module.exports = {User};