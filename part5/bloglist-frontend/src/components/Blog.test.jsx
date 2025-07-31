import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author only by default', () => {
  const newBlog = {
    title: 'First class algebra',
    author: 'Franco F.',
    url: 'https://example.com/example',
    likes: 12,
    user: {
      name: 'Franco Gallardo'
    }
  }

  render(<Blog blog = {newBlog} />)

  const title = screen.findByText('First class algebra')
  const author = screen.findByText('Franco F.')
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  const url = screen.queryByText('https://example.com/example')
  const likes = screen.queryByText('12')
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders url and likes when view button is clicked', async () => {
  const newBlog = {
    title: "First class algebra",
    author: "Franco F.",
    url: "https://example.com/example",
    likes: 12,
    user: {
      name: 'Franco Gallardo'
    }
  }

  render(<Blog blog = {newBlog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.findByText('https://example.com/example')
  const likes = screen.findByText('12')
  expect(url).toBeDefined()
  expect(likes).toBeDefined()


})

test('like handler function is called twice when like button is clicked twice', async () => {
  const newBlog = {
    title: "First class algebra",
    author: "Franco F.",
    url: "https://example.com/example",
    likes: 12,
    user: {
      name: 'Franco Gallardo'
    }
  }
  const mockHandler = vi.fn()

  render(<Blog blog = {newBlog} updateLikes={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})