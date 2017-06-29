require('./config/config');

var _ = require('lodash');
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


//PATCH/UPDATE ENDPOINT IS SPECIAL  
//  user lowdash _.pick() return new object with only these two properties present 'text' and 'completed'
//  ALSO NOTICE that Todo.findByIdAndUpdate(_id,{$set:body},{new:true})
//  {new:true} config object is the differnt way to return the new document ,, same result as {returnOriginal:false}
//      
app.patch('/todos/:id',(req,res,next)=>{
    var _id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(_id))
    {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed === true)
    {
        body.completedAt = new Date().getTime();
    }
    else
    {
        body.completed = false;
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(_id,{$set:body},{new:true})
    .then(newDocument=>{

        if(!newDocument){
            return res.status(404).send();
        }

        return res.send(newDocument);
    })
    .catch(e => res.status(400).send());
});


///////////USERS API ENDPOINTS//////////
////////////////////////////////////////

app.post('/users',(req,res,next)=>{
    var body = _.pick(req.body,['email', 'password']);

    var newUser = new User(body);
    newUser.save()
    .then(document=>res.status(201).send(document))
    .catch(e=>res.status(400).send(e));

});


////////////////////////////////////////




var ListeningPort = process.env.PORT || 3000;
app.listen(ListeningPort,()=>{
    console.log('You are connected to port '+ ListeningPort);
});


module.exports = {app};

