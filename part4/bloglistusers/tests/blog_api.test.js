const assert = require('node:assert')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

describe('when there are initially some blogs saved and two users are created', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('FrancoG', 10)
    const user = new User({ username: 'Franco', name: 'Franco', passwordHash: passwordHash , _id: '6887a4f629d7ff494cb386a0', blogs: helper.initialBlogs.slice(0,3).map(blog=>blog._id) })
    await user.save()

    const passwordHashOtherUser = await bcrypt.hash('DiegoA', 10)
    const otherUser = new User({ username: 'Diego', name: 'Diego', passwordHash: passwordHashOtherUser, _id: '6887a50129d7ff494cb386a2', blogs: helper.initialBlogs.slice(3,6).map(blog=>blog._id) })
    await otherUser.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(e => e.title)
    assert.strictEqual(titles.includes(helper.initialBlogs[0].title), true)
  })

  test('blog identifier is named id', async () => {
    const blogs = await helper.blogsInDb()
    assert(blogs[0].id)
    assert.strictEqual('_id' in blogs[0], false)
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: "First class algebra",
        author: "Franco F. Gallardo",
        url: "https://example.com/example",
        likes: 12,
      }
      const token = await helper.getValidToken(api)
      
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(n => n.title)
      assert(titles.includes('First class algebra'))
    })

    test('blog without likes is added, and likes default to 0', async () => {
      const newBlog = {
        title: "First class algebra",
        author: "Franco F. Gallardo",
        url: "https://example.com/example",
      }
      const token = await helper.getValidToken(api)

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      assert.strictEqual(response.body.likes, 0)

    })

    test('blog without title is not added, and responded with status 400', async () => {
      const newBlog = {
        author: "Franco F. Gallardo",
        url: "https://example.com/example",
        likes: 12,
      }
      const token = await helper.getValidToken(api)
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('blog without url is not added, and responded with status 400', async () => {
      const newBlog = {
        title: "First class algebra",
        author: "Franco F. Gallardo",
        likes: 12,
      }
      const token = await helper.getValidToken(api)
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('post by without token fails, and is responded with status 401', async () => {
      const newBlog = {
        title: "First class algebra",
        author: "Franco F. Gallardo",
        url: "https://example.com/example",
        likes: 12,
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('search and/or deletion of a blog', () => {
    test('succeeds when searching an existing blog', async () => {
      const response = await api
        .get(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .expect(200)

      assert.strictEqual(response.body.title, helper.initialBlogs[0].title)
    })

    test('fails when searching a blog with an invalid id', async () => {
      const response = await api
        .get(`/api/blogs/${await helper.nonExistingId()}`)
        .expect(404)

      assert.deepStrictEqual(response.body, {})
    })

    test('when searching and deleting an existing blog, returns status 204', async () => {
      const token = await helper.getValidToken(api)
      await api
        .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })

    test('when searching and deleting a non existing blog, returns status 204', async () => {
      const token = await helper.getValidToken(api)
      await api
        .delete(`/api/blogs/${await helper.nonExistingId()}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('update of a blog', () => {
    test('suceeds when updating an existing blog with correct data, and updates only entered fields', async () => {
      const newBlog = {
        url: "https://example.com/example",
        likes: 12,
      }
      await api
        .put(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .send(newBlog)
        .expect(200)

      const response = await api
        .get(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .send(newBlog)
        .expect(200)

      assert.strictEqual(response.body.url, newBlog.url)
      assert.strictEqual(response.body.likes, newBlog.likes)
      assert.strictEqual(response.body.title, helper.initialBlogs[0].title)
    })

    test('fails when updating a not existing blog', async () => {
      const newBlog = {
        url: "https://example.com/example",
        likes: 12,
      }
      await api
        .put(`/api/blogs/${await helper.nonExistingId()}`)
        .send(newBlog)
        .expect(404)

    })


  })
})

after(async () => {
  await mongoose.connection.close()
})