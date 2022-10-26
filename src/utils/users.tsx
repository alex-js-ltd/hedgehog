import React from 'react'
import { useEffect } from 'react'
import {
	useQuery,
	useMutation,
	useQueryClient,
	Updater,
} from '@tanstack/react-query'
import { useClient } from 'context/auth-context'
import { PostUser, UserObject, GetUsers } from 'types'

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

const useRemoveUser = (user: UserObject) => {
	const client = useClient()
	const queryClient = useQueryClient()

	return useMutation(
		() =>
			client(`users/${user.id}`, {
				method: 'DELETE',
			}),
		{
			onSuccess: () => {
				queryClient.setQueriesData(
					['users'],
					(oldData: GetUsers | undefined) => {
						if (!oldData) return

						let copyData = { ...oldData }

						let userArr = [...copyData.data]

						let filterUserArr = userArr.filter(({ id }) => id !== user.id)

						copyData.data = filterUserArr

						return copyData
					},
				)
			},
		},
	)
}

export { useGetUsers, useCreateUser, useRemoveUser }
