const { User } = require('./../../models/User');
const { Todo } = require('./../../models/Todo');
const { ObjectID } = require('mongodb');

const jwt = require('jsonwebtoken');

const to_dos =
    [
        {
            _id: new ObjectID(),
            text: 'This is todo number 1'
        },
        {
            _id: new ObjectID(),
            text: 'This is todo number 2',
            completed: true,
            completedAt: 333
        }

    ];

var UserOneId = new ObjectID();
var UserTwoId = new ObjectID();
var access = 'auth';
var token = jwt.sign({ _id: UserTwoId, access }, 'SaltString').toString();
const users =
    [
        {
            _id : UserOneId,
            email : 'This@isTheEmailOfAHashedPass.com',
            password : 'Another123PassA',
            tokens : [{access,token}]
         },
        
        {
            _id : UserTwoId,
            email: 'This@isaemail.com',
            password: 'APassword123'
        }

    ];

const populateTodos = (done) => {
    Todo.remove({}).then(() =>

        Todo.insertMany(to_dos)

    ).then(() => done());
}

//populate users will have to be coded differently inorder to run its middleware, to hash the password
//  will user the Promise.all[array of promised].then .. utility method

const populateUsers = done => {

    User.remove({}).then(()=>{

        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();
        return Promise.all([user1,user2]);
        

    })
    .then(()=>done());

};

module.exports = { to_dos, populateTodos, users, populateUsers,};