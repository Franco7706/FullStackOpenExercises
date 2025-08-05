import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import { useUserValue } from './UserContext'
import { Hover, ListDiv, StyledTable } from '../styledElements'
import { Link } from "react-router-dom"

const List = () => {
  const userValue = useUserValue()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if (result.isLoading && userValue !== null) {
    return <div>loading data</div>
  }
  const blogs = result.data
  const noUnderline = {
    color: 'inherit',
    textDecoration: 'none'
  }

  return (
    <ListDiv>
      <StyledTable>
        <thead>
          <tr>
            <th>Title</th><th>Author</th>
          </tr>
        </thead>

        <tbody>
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => (
              //<Blog
              //  key={blog.id}
              //  blog={blog}
              ///>
              <>
                <tr>
                  <td>
                    <div key={blog.id}><Link to={`/blogs/${blog.id}`} style={noUnderline} state={blog}><Hover>{blog.title}</Hover></Link></div>
                  </td>
                  <td>{blog.author}</td>
                </tr>
              </>
            ))}

        </tbody>
      </StyledTable>
    </ListDiv>
  )
}
export default List