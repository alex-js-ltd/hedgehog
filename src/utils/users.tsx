import React from 'react'
import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from 'context/auth-context'
import { PostUser, UserObject } from 'types'

const useGetUsers = (query: number) => {
	const client = useClient()

	const result = useQuery({
		queryKey: ['users', { query }],
		queryFn: () =>
			client(`users?page=${query}`, { method: 'GET' }).then(res => res),
	})

	useEffect(() => {
		console.log(result.data)
	}, [result.data])

	return {
		...result,
		users: result.data?.data ?? [],
		total_pages: result?.data?.total_pages | 0,
	}
}

const useCreateUser = () => {
	const client = useClient()
	const queryClient = useQueryClient()
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
				queryClient.setQueriesData(
					['users'],
					(oldData: UserObject[] | undefined) => oldData && [data, ...oldData],
				)
			},
		},
	)
}

export { useGetUsers, useCreateUser }
