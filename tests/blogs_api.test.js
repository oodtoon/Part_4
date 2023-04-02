const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

test('identifier property of the blog posts is named id,', () => {
  
})
  
  afterAll(async () => {
    await mongoose.connection.close()
  })
  