const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor,getTokenFrom } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', getTokenFrom, userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'user missing or not valid' })
  }

  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs=user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', getTokenFrom, userExtractor, async (request, response) => {
  const user = request.user
  const searchedBlog = await Blog.findById(request.params.id)
  if(!searchedBlog){
    response.status(204).end()
  }
  if(searchedBlog.user._id.toString() === user._id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  else{
    response.status(401).json({ error: 'user has no permission to delete blog' })
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    blog.title=body.title || blog.title
    blog.author=body.author || blog.author
    blog.url=body.url || blog.url
    blog.likes=body.likes || blog.likes
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  }
  else {
    response.status(404).end()
  }

})

module.exports = blogsRouter