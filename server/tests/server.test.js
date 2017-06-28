const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/Todo');

const { ObjectID } = require('mongodb');


const to_dos =
    [
        {
            _id: new ObjectID(),
            text: 'This is todo number 1'
        },
        {
            _id: new ObjectID(),
            text: 'This is todo number 2'
        }

    ];



beforeEach(done => {
    Todo.remove({}).then(() =>

        Todo.insertMany(to_dos)

    ).then(() => done());
});


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
            //*** IN TEST SETTING REMEMBER THAT QUERRY TO DATABASE IS IN THE .END() VERBOSE FORM
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Todo.find({ text })
                    .then(todos => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch(e => done(e));



            });


    });

    it('Should not save invalid post', done => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) { return done(err) }

                Todo.find()
                    .then(todos => {
                        expect(todos.length).toBe(2);
                        done();

                    })
                    .catch(e => done(e));

            });

    });

});

describe('Testing the GET - Todos endpoint', () => {
    it('Should get all of the todos', done => {


        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.length).toBe(2);

            })
            .end(done);


    });


});

describe('Testing the GET/id - Todos endpoint', () => {

    it('Get a single record by id and checking by text property', (done) => {

        // to hexstring call not exactly nessisary here becuase the concating with the string already casts it
        request(app)
            .get(`/todos/${to_dos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(to_dos[0].text);
            })
            .end(done);

    });

    it('Return a 404 when id is valid but not found', done => {
        var validIdObject = new ObjectID();
        var validIdObject_String = validIdObject.toHexString();

        request(app)
            .get(`/todos/${validIdObject_String}`)
            .expect(404)
            .end(done);

    });

    it('Return a 404 when url is valid but non-id', done => {

        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);

    });
});

describe('Testing the DELETE/id - Todos endpoint', () => {

    it('Deletes Todo Object by ID', done => {
        request(app)
            .delete(`/todos/${to_dos[0]._id}`)
            .expect(200)
            .expect(res =>
                expect(res.body._id).toBe(to_dos[0]._id.toHexString())
            )
            //*** IN TEST SETTING REMEMBER THAT QUERRY TO DATABASE IS IN THE .END() VERBOSE FORM
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(to_dos[0]._id.toHexString())
                    .then(nullDocument => {
                        expect(nullDocument).toNotExist();
                        done();
                    })
                    .catch(e => done(e))

            });
    });

    it('Should return 404 if id is not found', done => {

        var validId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${validId}`)
            .expect(404)
            .end(done);
    });

    it('Should return 404 if id is invalid', done => {
        request(app)
            .delete('/todos/abc')
            .expect(404)
            .end(done);
    });


});











