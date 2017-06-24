var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');


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
    
    Todo.findById(TodoID)
    .then(singleObject=>{
        if(!singleObject)
        {
           return res.status(404).send("Not Found");
        }
        res.send(singleObject);
    },e=>{res.send(e)})
});



/////////////////////////////////////
/////////////////////////////////////
var ListeningPort = 3000;
app.listen(ListeningPort,()=>{
    console.log('You are connected to port '+ ListeningPort);
});


module.exports = {app};

