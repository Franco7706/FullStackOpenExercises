import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'


export const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async(anecdote) => {
  const response = await axios.post(baseUrl,asObject(anecdote))
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const updateOne = async (id,newAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`,newAnecdote)
  return response.data
}

export default { getAll, createNew, getOne, updateOne }