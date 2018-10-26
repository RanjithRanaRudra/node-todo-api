const {app} = require('../server');
const request = require('supertest');
const expect = require('expect');


const {Todo} = require('../models/todo');
const {user} = require('../models/user');

const todos = [
    {
        text : 'this is first todo'
    },
    {
        text : 'this is second todo'
    }
];

const users = [
    {
        email: 'User1@ytr.in'
    },
    {
        email: 'User2@ytr.in'
    }
];

describe('Server', () => {
    beforeEach((done) => {
        // Todo.remove({}).then(() => done()); ---------- depecreated
        Todo.deleteMany({}).then(()=> {
            return Todo.insertMany(todos);
        }).then(()=> done());
    });

    describe('#Post/todos', () => {
        it('should create a new todo', (done) => {
            var text ="Test todo test";

            request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err, res)=> {
                if(err) {
                    return done(err);
                }
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    for(let i=0;i<todos.length;i++) {
                        expect(todos[i].text).toBe(text);
                    }
                    done();
                })
                .catch((e)=> done(e));
            });
        });
        it('should create a todo with invalid data', (done) => {
            request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                })
                .catch((e)=> done(e));
            });
        });
    });
    describe('#GET/todos', () => {
        it('should get all todos', (done) => {
            request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
        });
    });
});