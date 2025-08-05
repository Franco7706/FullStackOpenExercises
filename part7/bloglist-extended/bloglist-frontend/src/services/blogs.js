import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog) => {
  const url = `${baseUrl}/${updatedBlog.id}`
  const response = await axios.put(url, updatedBlog)
  return response.data
}

const getOne = async (id) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.get(url)
  return response.data
}

const deleteB = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blog.id}`
  await axios.delete(url, config)
  return blog
}

const postComment = async (data) => {
  const url = `${baseUrl}/${data.id}/comments`
  const commentObject = { text: data.text}
  console.log(commentObject)
  const response = await axios.post(url, commentObject)
  return response.data
}

export default { getAll, setToken, create, update, deleteB, getOne, postComment }
