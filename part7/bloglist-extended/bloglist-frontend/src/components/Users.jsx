import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import User from './User'
import { Link } from 'react-router-dom'
import { Hover, ListDiv, StyledTable } from '../styledElements'

const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (result.isLoading) {
    return <div>Loading data</div>
  }

  const noUnderline = {
    color: 'inherit',
    textDecoration: 'none'
  }
  const users = result.data
  return (
    <div>
      <h2>Users</h2>
      <ListDiv>
        <StyledTable>
          <thead>
            <tr>
              <th>Name</th><th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <tr key={user.id}>
                <td><Link to={`${user.id}`} style={noUnderline}><Hover>{user.name}</Hover></Link></td><td>{user.blogs.length}</td>
              </tr>)}
          </tbody>
        </StyledTable>
      </ListDiv>
    </div>
  )
}

export default Users
