/**
 * Inports
 * Start
 */
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { user } = require('./models/user');
const fs = require('fs');

/**
 * Inports
 * End
 */

var app = express();

app.use(bodyParser.json());


var port = process.env.PORT || 3000;

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log+'\n', (err)=> {
        if(err) {
            console.log('Unable to append tto server.log');
        }
        else {
            next();
        }
    });
});

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(JSON.stringify(doc, undefined, 2));
    }, (err) => {
        res.status(400).send(err);
    });

});

app.post('/users', (req, res) => {
    var User = new user({
        email: req.body.email
    });

    User.save().then((doc)=>{
        res.send(JSON.stringify(doc, undefined, 2));
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos)=> {
        res.send(JSON.stringify({todos}, undefined, 2));
    }, (err)=> {
        res.status(400).send(err);
    });
});
app.get('/users', (req, res) => {
    user.find().then((users)=> {
        res.send(JSON.stringify({users}, undefined, 2));
    }, (err)=> {
        res.status(400).send(err);
    });
});

app.get('/todos/:id' , (req, res)=> {
    var id = req.params.id;
    //  Id Vaidation
    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    //getting result
    Todo.findById(id).then((todos)=> {
        if(!todos) {
            res.status(404).send();
        }
        res.send(JSON.stringify({todos}, undefined, 2));
    }).catch((err)=> res.status(400).send(err));
});


app.listen(port, () => {
    console.log(`Server Started on port : ${port}`);
});

module.exports = { app };

