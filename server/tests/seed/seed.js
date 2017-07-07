
const { Todo } = require('./../../models/Todo');
const { ObjectID } = require('mongodb');





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


const populateTodos = (done) => {
    Todo.remove({}).then(() =>

        Todo.insertMany(to_dos)

    ).then(() => done());
}

module.exports = {to_dos, populateTodos};