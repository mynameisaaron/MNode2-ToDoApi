const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/Todo');

//MOCHA/SUPERTEST TESTING 

///////////////////////

const to_dos = 
[
    {
        text:'This is todo number 1'
    },
    {
        text:'This is todo number 2'
    }

]

beforeEach(done => {
    Todo.remove({})
    .then(()=>
        Todo.insertMany(to_dos)
    )
    .then(()=>done());
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

                Todo.find({text})
                    .then(todos => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch(e => done(e));



            });


    });

    it('Should not save invalid post',done=>{

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){return done(err)}

            Todo.find()
            .then(todos => {
                expect(todos.length).toBe(2);
                done();
                
            })
            .catch(e=>done(e));

        });

    });

});

describe('Testing the GET - Todos endpoint',()=>{
it('Should get all of the todos',done=>{


    request(app)
    .get('/todos')
    .expect(200)
    .expect(res=>{
        expect(res.body.length).toBe(2);
        
    })
    .end(done);


});


});











