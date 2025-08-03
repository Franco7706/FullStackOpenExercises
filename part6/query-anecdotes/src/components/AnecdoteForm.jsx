import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      notificationDispatch({ type: 'SET', payload: { text: error.response.data.error } })
      setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000)
    }
  })

  const notificationDispatch = useNotificationDispatch()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'SET', payload: { text: `A new anecdote '${content}' has been created` } })
    setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
