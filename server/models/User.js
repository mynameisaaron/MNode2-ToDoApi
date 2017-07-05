const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        //validate w/ validator & message property - part of mongoosejs custom validation
        //validate function will return true if validated
        // 
        //FOLLOW THIS STRUCTURE
        validate: {
            validator: function (value) {
                return validator.isEmail(value); //=> true
            },
            message: "I'm sorry that is not a valid email"
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{

        access: {
            type: String,
            required: true
        }

        ,

        token: {
            type: String,
            required: true
        }


    }]
})
///////////////////////////////////////////////////////////////////////////////
// HERE WE ARE GOING TO MAKE A STATIC METHOD FOR USER, TO FIND BY TOKEN 

// UserSchema.statics.findByToken = function (token) {
//     var User = this;

//     var UserId = jwt.verify(token, 'SaltString')._id;

//    return User.findOne({_id:UserId});



UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'SaltString');
    } catch (e) {

        //return new Promise((resolve,reject)=>{reject()});
        // also can write this as
        return Promise.reject();
        
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};




////////////////////////////////////////////////////////

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'SaltString').toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
}

var User = mongoose.model('User', UserSchema);

module.exports = { User };