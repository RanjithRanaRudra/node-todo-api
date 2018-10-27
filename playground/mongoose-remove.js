var {ObjectID} = require('mongodb');

var { mongoose } = require('./../server/db/mongoose');
var { Todo } = require('./../server/models/todo');
var { user } = require('./../server/models/user');


// find one and remove
Todo.findOneAndRemove({'_id':'5bd4430e8d9043001590858b'}).then((todo)=> {
    console.log('todo :', todo);
});

Todo.findByIdAndRemove('5bd4430e8d9043001590858b').then((todo)=> {
    console.log('todo :', todo);
});