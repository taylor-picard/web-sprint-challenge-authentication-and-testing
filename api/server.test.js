const server = require('./server');
const supertest = require('supertest');
const request = supertest(server);
const jokes = require('./jokes/jokes-data');

//JOKES EP.
describe('Jokes endpoint', ()=> {
  it('[1] Jokes cannot be accessed without a token', async ()=> {
    const res = await request.get('/api/jokes').send({Authorization: "badtoken"})
    expect(res.body.message).toBe("token required")
  })
  it('[2] Jokes can be accessed with a token', async ()=> {
    const res = await request.get('/api/jokes')
    expect(res.body).toBe(jokes)
  })
})
//REGISTER EP.
describe('Register endpoint', ()=> {
  it('[3] returns new user info on successful registration', async ()=> {
    const res = await request.post('/api/auth/register').send({
      username: "josh",
      password: 1234
    })
    expect(res.body).toBe()
  })
  it('[4] returns error message when username taken', async()=> {
    const res = await request.post('/api/auth/register').send({
      username: "taylor",
      password: 1234
    })
    
  })
})
//LOGIN EP.
describe('Login endpoint', ()=> {
  it('[5] returns welcome message and token on successful login', async()=> {
    const res = await request.post('/api/auth/login').send({
      username: "josh",
      password: 1234
    })
    
  })
  it('[6] returns invalid message if login info is incorrect', async()=> {
    const res = await request.post('/api/auth/login').send({
      username: "wrong",
      password: 12341
    })
    
  })
})