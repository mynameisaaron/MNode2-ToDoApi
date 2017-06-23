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

/////////////////////////////////////
/////////////////////////////////////
var ListeningPort = 3000;
app.listen(ListeningPort,()=>{
    console.log('You are connected to port '+ ListeningPort);
});

