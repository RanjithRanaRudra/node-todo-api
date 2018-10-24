const {app} = require('../server');
const request = require('supertest');
const expect = require('expect');


const {Todo} = require('../models/todo');
const {user} = require('../models/user');

describe('Server', () => {
    beforeEach((done) => {
        // Todo.remove({}).then(() => done()); ---------- depecreated
        Todo.deleteMany({}).then(()=> done());
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
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[todos.length-1].text).toBe(text);
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
                    expect(todos.length).toBe(0);
                    done();
                })
        