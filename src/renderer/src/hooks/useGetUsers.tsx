import { useEffect, useState } from 'react'

export default function useGetUsers(): User[] {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      try {
        const fetchedUsers = await window.api.getUsers()
        setUsers(fetchedUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  return users
}
