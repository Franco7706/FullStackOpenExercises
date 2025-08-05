const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    user: "6887a4f629d7ff494cb386a0",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    user: "6887a4f629d7ff494cb386a0",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    user: "6887a4f629d7ff494cb386a0",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    user: "6887a50129d7ff494cb386a2",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    user: "6887a50129d7ff494cb386a2",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    user: "6887a50129d7ff494cb386a2",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "First class algebra",
    author: "Franco F. Gallardo",
    url: "https://example.com/example",
    likes: 12,
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const getValidToken = async (api) => {
  const loginUser = {
    username: "Franco",
    password: "FrancoG",
  }
  const response = await api.post("/api/login").send(loginUser).expect(200)
  return response.body.token
}

const getTokenFromOtherUser = async (api) => {
  const loginUser = {
    username: "Diego",
    password: "DiegoA",
  }
  const response = await api.post("/api/login").send(loginUser)

  return response.body.token
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  getValidToken,
  getTokenFromOtherUser,
}
