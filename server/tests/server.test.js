const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/Todo');

const { ObjectID } = require('mongodb');
//MOCHA/SUPERTEST TESTING 

///////////////////////

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

    ]

beforeEach(done => {
    Todo.remove({})
        .then(() =>
            Todo.insertMany(to_dos)
        )
        .then(() => done());
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

    it('Return a 404 when id is valid but not found',done=>{
        var validIdObject = new ObjectID();
        var validIdObject_String = validIdObject.toHexString();

        request(app)
            .get(`/todos/${validIdObject_String}`)
            .expect(404)
            .end(done);

    });

    it('Return a 404 when url is valid but non-id',done=>{

        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);

    });
});











