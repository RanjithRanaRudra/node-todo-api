const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/admin1', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDb Server');
    }
    else {
        console.log('Connected to MongoDb Server');
        const db = client.db('admin1');
        db.collection('admin1.1').insertOne({
            name:'Dracula',
            age: '100M',
            completed: 'false'
        }, (err, result) => {
            if(err) {
                return console.log('Unable to insert into admin1', err);
            }
            else {
                return console.log(result.ops, undefined, 2);
            }
        });
        db.collection('admin1.2').insertOne({
            name:'Diablo',
            age: '1M',
            completed: 'false'
        }, (err, result) => {
            if(err) {
                return console.log('Unable to insert into admin1', err);
            }
            else {
                return console.log(result.ops, undefined, 2);
            }
        });
    }
    client.close();
});