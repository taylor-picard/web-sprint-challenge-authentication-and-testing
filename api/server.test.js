const db = require('../data/dbConfig');
const server = require('./server');
const supertest = require('supertest');
const request = supertest(server);
const jokes = require('./jokes/jokes-data');

beforeAll(async ()=> {
  await db.migrate.rollback()
  await db.migrate.latest()
})

//JOKES EP.
describe('Jokes endpoint', ()=> {
  it('[1] Jokes cannot be accessed without a token', async ()=> {
    const res = await request.get('/api/jokes')
    expect(res.body.message).toBe("token required")
  })
  it('[2] Jokes can be accessed with a token', async ()=> {
    await request.post('/api/auth/register').send({
      username: "newUser",
      password: "1234"
    })
    const login = await request.post('/api/auth/login').send({
      username: "newUser",
      password: "1234"
    })
    const res = await request.get('/api/jokes').set("Authorization", login.body.token)
    expect(res.body).toStrictEqual(jokes)
  })
})
//REGISTER EP.
describe('Register endpoint', ()=> {
  it('[3] returns new user info on successful registration', async ()=> {
    const res = await request.post('/api/auth/register').send({
      username: "josh",
      password: "1234"
    })
    expect(res.body).toStrictEqual({
      id: res.body.id,
      username: res.body.username,
      password: res.body.password
    })
  })
  it('[4] returns error message when username taken', async()=> {
    await request.post('/api/auth/register').send({
      username: "taylor",
      password: "1234"
    })
    const res = await request.post('/api/auth/register').send({
      username: "taylor",
      password: "1234"
    })
    expect(res.body.message).toBe("username taken")
  })
})
//LOGIN EP.
describe('Login endpoint', ()=> {
  it('[5] returns welcome message and token on successful login', async()=> {
    await request.post('/api/auth/register').send({
      username: "josh",
      password: "1234"
    })
    const res = await request.post('/api/auth/login').send({
      username: "josh",
      password: "1234"
    })
    expect(res.body).toStrictEqual({
      message: `welcome, josh`,
      token: res.body.token
    })
  })
  it('[6] returns invalid message if login info is incorrect', async()=> {
    const res = await request.post('/api/auth/login').send({
      username: "wrong",
      password: "12341"
    })
    expect(res.body.message).toBe("invalid credentials")
  })
})