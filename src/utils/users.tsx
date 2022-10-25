import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { useClient } from 'context/auth-context'

const useGetUsers = (query: string) => {
	const client = useClient()

	const result = useQuery({
		queryKey: ['users', { query }],
		queryFn: () =>
			client(`users?page=${query}`, { method: 'GET' }).then(res => res.data),
	})

	return { ...result, users: result.data ?? [] }
}

export { useGetUsers }
