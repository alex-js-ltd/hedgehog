import React from 'react'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useClient } from 'context/auth-context'
import { PostUser } from 'types'

const useGetUsers = (query: string) => {
	const client = useClient()

	const result = useQuery({
		queryKey: ['users', { query }],
		queryFn: () =>
			client(`users?page=${query}`, { method: 'GET' }).then(res => res.data),
	})

	return { ...result, users: result.data ?? [] }
}

const useCreateUser = () => {
	const client = useClient()

	return useMutation(
		({ first_name, last_name, email, avatar }: PostUser) =>
			client(`users`, {
				method: 'POST',
				data: {
					first_name,
					last_name,
					email,
					avatar,
				},
			}),
		{
			onSuccess: data => {
				console.log(data)
			},
		},
	)
}

export { useGetUsers, useCreateUser }
