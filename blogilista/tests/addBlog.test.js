const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)



test('Add blog -test', async () =>{
    const newBlog = {
        title: "Reklamaatio Muumilaaksoon",
        author: "Kalle",
        url: "google.fi",
        likes: 1,
     }

     const before = await api.get('/api/blogs')
    
     await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
     
        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(before.body.length + 1)
        expect(titles).toContain('Reklamaatio Muumilaaksoon')


})

afterAll(()=>{
    mongoose.connection.close()
})