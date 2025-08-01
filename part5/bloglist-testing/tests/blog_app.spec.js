const { test, expect, beforeEach, describe } = require('@playwright/test')
const { isSorted } = require('./test_helper.js')
let token = null

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Franco Gallardo',
        username: 'Franco',
        password: 'Gallardo'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Diego Ayala',
        username: 'Diego',
        password: 'Ayala'
      }
    })
    /* a blog is created by user Diego Ayala */
    const response = await request.post('http://localhost:3003/api/login', {
      data: {
        username: 'Diego',
        password: 'Ayala'
      }
    })
    const responseBody = await response.json()
    token = responseBody.token
    await request.post('http://localhost:3003/api/blogs', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {
        title: 'calculus',
        author: 'Diego Ayala',
        url: 'calculus.ayala.com'
      }
    })


    await page.goto('http://localhost:5173')


  })

  test('Login form is shown', async ({ page }) => {
    const username = page.getByTestId('username')
    const password = page.getByTestId('password')

    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
    const button = page.getByRole('button', { name: 'login' })
    await expect(button).toBeVisible()

  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('Franco')
      await page.getByTestId('password').fill('Gallardo')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Franco Gallardo logged in ')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('Franco')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('Franco')
      await page.getByTestId('password').fill('Gallardo')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      const createButton = page.getByRole('button', { name: 'create' })
      await expect(createButton).toBeVisible()
      await createButton.click()
      await page.getByTestId('title').fill('Introduction to FullStack Development')
      await page.getByTestId('author').fill('F. Gallardo')
      await page.getByTestId('url').fill('fsdev.gallardo.com')
      await page.getByRole('button', { name: 'save' }).click()
      const messageDiv = page.locator('.message')
      await expect(messageDiv).toContainText('a new blog Introduction to FullStack Development by F. Gallardo added')
    })

    test('a blog can be liked', async ({ page }) => {
      const blogDiv = page.getByTestId('blog')
      await expect(blogDiv).toBeVisible()
      await blogDiv.getByRole('button', { name: 'view' }).click()
      const likeDiv = blogDiv.getByTestId('likes')
      const initialLikes = parseInt(await likeDiv.textContent())
      blogDiv.getByRole('button', { name: 'like' }).click()
      await expect(likeDiv).toHaveText(String(initialLikes + 1))
    })

    test('Delete button is not shown in a blog created by other user', async ({ page }) => {
      const blogDiv = page.getByTestId('blog')
      await expect(blogDiv).toBeVisible()
      await blogDiv.getByRole('button', { name: 'view' }).click()
      await expect(blogDiv.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })
  })

  describe('When logged in with user that created a blog', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('Diego')
      await page.getByTestId('password').fill('Ayala')
      await page.getByRole('button', { name: 'login' }).click()
    })
    test('The delete button is visible', async ({ page }) => {
      const blogDiv = page.getByTestId('blog')
      await expect(blogDiv).toBeVisible()
      await blogDiv.getByRole('button', { name: 'view' }).click()

      const deleteButton = blogDiv.getByRole('button', { name: 'remove' })
      await expect(deleteButton).toBeVisible()
    })
    test('The blog can be deleted', async ({ page }) => {
      const blogDiv = page.getByTestId('blog')
      await expect(blogDiv).toBeVisible()
      await blogDiv.getByRole('button', { name: 'view' }).click()
      page.once('dialog', async dialog => {
        await dialog.accept()
      })
      await blogDiv.getByRole('button', { name: 'remove' }).click()

      const messageDiv = page.locator('.message')
      await expect(messageDiv).toContainText('Blog calculus by Diego Ayala deleted')
      await expect(page.getByTestId('blog')).toHaveCount(0)
    })
  })

  describe('When three more blogs are created with different numbers of likes and a user is logged in', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/blogs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          title: 'physics',
          author: 'Diego Ayala',
          url: 'physics.ayala.com'
        }
      })
      await request.post('http://localhost:3003/api/blogs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          title: 'chemistry',
          author: 'Diego Ayala',
          url: 'chemistry.ayala.com'
        }
      })
      await request.post('http://localhost:3003/api/blogs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          title: 'language',
          author: 'Diego Ayala',
          url: 'language.ayala.com'
        }
      })
      await page.reload()

      await page.getByTestId('username').fill('Franco')
      await page.getByTestId('password').fill('Gallardo')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('The blogs are shown in the page sorted by their number of likes, the one with the most likes first', async ({ page }) => {
      const blogDivs = await page.getByTestId('blog').all()
      const likes = []
      for  (const blogDiv of blogDivs) {
        await blogDiv.getByRole('button', { name: 'view' }).click()
        const likeDiv = blogDiv.getByTestId('likes')
        likes.push( parseInt(await likeDiv.textContent()) )
      }
      expect(isSorted(likes)).toBe(true)
    })
  })
})