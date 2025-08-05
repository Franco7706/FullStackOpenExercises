import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> class OnSubmit and sends correct data', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(input[0], 'First class algebra')
  await user.type(input[1], 'Franco F.')
  await user.type(input[2], 'https://example.com/example')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('First class algebra')
  expect(createBlog.mock.calls[0][0].author).toBe('Franco F.')
  expect(createBlog.mock.calls[0][0].url).toBe('https://example.com/example')
})
