 const mongoose = require('mongoose')
 const supertest = require('supertest')
 const app = require('../app')

 const api = supertest(app)

 test('Kuinka monta testiä', async () =>{
     const response = await api.get('/api/blogs')

     expect(response.body).toHaveLength(2)
 })

 afterAll(()=>{
     mongoose.connection.close()
 })