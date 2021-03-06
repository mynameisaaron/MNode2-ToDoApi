const expect = require('expect');
const request = require('supertest');
const { app } = require('../server');
const { Todo } = require('../models/Todo');
const { ObjectID } = require('mongodb');
const { to_dos, populateTodos, users, populateUsers, token } = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

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

describe('Testing the PATCH/id - Todos endpoint', () => {

    it('Will Update text and completed properties of the Todo document', done => {

        var updateObject = { text: 'UPUPDATED', completed: true }

        request(app)
            .patch(`/todos/${to_dos[0]._id}`)
            .send(updateObject)
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe('UPUPDATED');
                expect(res.body.completed).toBe(true);

            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(to_dos[0]._id.toHexString())
                    .then(document => {
                        expect(document.text).toBe('UPUPDATED');
                        expect(document.completed).toBe(true);
                        done();
                    })
                    .catch(e => done(e));

            });

    });

    it('It Will Changed Text and Completed at to false', done => {

        var updateObject = {
            text: "UPDATED and Completed set to false",
            completed: false
        };

        request(app)
            .patch(`/todos/${to_dos[1]._id}`)
            .send(updateObject)
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe("UPDATED and Completed set to false");
                expect(res.body.completed).toBe(false);
                expect(res.body.completedAt).toBe(null);

            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Todo.findById(to_dos[1]._id.toHexString())
                    .then(document => {

                        expect(document.text).toBe(updateObject.text);
                        expect(document.completed).toBe(false);
                        expect(document.completedAt).toBe(null);
                        done();

                    })

            });


    })

});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            //   .expect((res) => {
            //     expect(res.body._id).toBe(users[0]._id.toHexString());
            //     expect(res.body.email).toBe(users[0].email);
            .end(done);
    })

});

