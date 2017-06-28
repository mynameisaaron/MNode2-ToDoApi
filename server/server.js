var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var {ObjectID} = require('mongodb');

var app = express();

/////////////////////////////////////
/////////////////////////////////////
app.use(bodyParser.json());

app.post('/todos',(req,res,next)=>{
    
    var newTodo = new Todo({
        text:req.body.text
    });

    newTodo.save()
    .then(document=>res.status(201).send(document))
    .catch(e=>res.status(400).send(e));
});

app.get('/todos',(req,res,next)=>{
    Todo.find()
        .then(todos=>{res.send(todos)}, e=>{res.status(400).send(e)});
});

app.get('/todos/:id',(req,res,next)=>{
    var TodoID = req.params.id;

    var isValid = ObjectID.isValid(TodoID);

    if(!isValid)
    {
        res.status(404).send();
    }
    
    Todo.findById(TodoID)
    .then(singleObject=>{
        if(!singleObject)
        {
           return res.status(404).send();
        }
        res.send(singleObject);
    })
    .catch(e=>res.status(400).send())
});

app.delete('/todos/:id',(req,res,next)=>{
    var _id = req.params.id;

    if(!ObjectID.isValid(_id))
    {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(_id)
    .then(document => {
        if(!document){
            return res.status(404).send();
        }

        res.send(document);
    })
    .catch(e => res.status(400).send());

});




var ListeningPort = process.env.PORT || 3000;
app.listen(ListeningPort,()=>{
    console.log('You are connected to port '+ ListeningPort);
});


module.exports = {app};

