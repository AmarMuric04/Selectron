import useGetUsers from '@renderer/hooks/useGetUsers'
import React from 'react'

const UsersList: React.FC = () => {
  const users = useGetUsers()

  return (
    <ul>
      {users.map((user) => (
        <li key={user.email}>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </li>
      ))}
    </ul>
  )
}

export default UsersList
