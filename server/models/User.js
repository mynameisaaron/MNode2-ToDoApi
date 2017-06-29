const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
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
});

module.exports = {User};