const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/admin1', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDb Server');
    }
    else {
        console.log('Connected to MongoDb Server');
        const db = client.db('admin1');
        db.collection('admin1.1').find().toArray().then((docs) => {
            console.log('Admin1');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch admin1');
        });
        db.collection('admin1.1').find({_id: new ObjectID('5bcb8adcdbaef7f00e4153e4')}).toArray().then((docs) => {
            console.log('Admin1 by Id');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch admin1 with Id');
        });
        db.collection('admin1.1').find({name: 'Castlewania'}).toArray().then((docs) => {
            console.log('Admin1 by name');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch admin1 with name');
        });

        // Delete Many
        db.collection('admin1.3').deleteMany().then((result) => {
            console.log(result.result);
        });
        // Delete Many by Selector
        db.collection('admin1.4').deleteMany({name: 'Diablo'}).then((result) => {
            console.log(result.result);
        });
        // Delete One
        db.collection('admin1.5').deleteOne({name: 'Dracula'}).then((result) => {
            console.log(result.result);
        });
        // Find one and delete
        db.collection('admin1.5').findOneAndDelete({name: 'Castlewania'}).then((result) => {
            console.log(JSON.stringify(result, undefined, 2));
        });
        // Find one and update
        db.collection('admin1.5').findOneAndUpdate({
            _id: new ObjectID('5bcb90f0dbaef7f00e415479')
        },
        {
            $set: {
                completed: true
            }
        },{
                returnOriginal: true
        }).then((result)=> {
            console.log(result);
        });
    }
    client.close();
});