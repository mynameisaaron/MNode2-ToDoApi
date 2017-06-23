const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/Todo');

//MOCHA/SUPERTEST TESTING 

///////////////////////
beforeEach(done => {
    Todo.remove({})
        .then(() => done())
});
//////////////////////

describe('Testing the POST - Todos endpoint', () => {


    it('Should create a new Todo', done => {

        var text = 'test new todo';
        //supertest converts auto-converts sended object into json
        request(app)
            .post('/todos')
            .send({ text })
            .expect(201)
            .expect(res => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Todo.find()
                    .then(todos => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch(e => done(e));



            });


    });

});











