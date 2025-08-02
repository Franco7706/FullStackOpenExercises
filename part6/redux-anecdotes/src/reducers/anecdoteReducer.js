import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {

    updateAnecdote(state,action) {
      const updated = action.payload
      return state.map(anecdote => (anecdote.id === updated.id) ? updated : anecdote)
    },

    appendAnecdote(state,action) {
      return [...state, action.payload]
    },

    setAnecdotes(state,action) {
      return action.payload
    }
  },
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const initialAnecdote = await anecdoteService.getOne(id)
    const updated = await anecdoteService.updateOne(id,{...initialAnecdote,votes:initialAnecdote.votes+1})
    dispatch(updateAnecdote(updated))
  }
}

export default anecdoteSlice.reducer