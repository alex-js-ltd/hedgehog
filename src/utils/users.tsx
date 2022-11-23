import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from 'utils/use-client'
import { useAsync } from './useAsync'
import { PostUser, UserObject, GetUsers } from 'types'
import userPlaceholderSvg from 'assets/user-placeholder.svg'
import { toBase64 } from './base64'

const loadingUser = {
	first_name: 'Loading',
	last_name: '...',
	avatar: userPlaceholderSvg,
	email: 'Loading...',
}

const loadingUsers = Array.from({ length: 10 }, (v, index) => ({
	id: index + 1,
	...loadingUser,
}))

const useGetUsers = (query: number) => {
	const { read } = useClient()

	const result = useQuery({
		queryKey: ['users', { query }],
		queryFn: () => read(`users?page=${query}`),
	})

	return {
		...result,
		users: result.data?.data ?? loadingUsers,
		total_pages: result.data?.total_pages || 0,
	}
}

const useCreateUser = () => {
	const { create } = useClient()
	const queryClient = useQueryClient()
	const mutation = useMutation(
		({ first_name, last_name, email, avatar }: PostUser) =>
			create(`users`, {
				first_name,
				last_name,
				email,
				avatar,
			}),
		{
			async onSuccess(data, variables, _context) {
				const avatar = (await toBase64(variables.avatar)) as string

				queryClient.setQueriesData(
					['users'],
					(oldData: GetUsers | undefined) => {
						if (!oldData) return

						const copyData = { ...oldData }

						const userArr = [...copyData.data]

						const userObject: UserObject = {
							...data,
							avatar,
						}

						const newArr = [userObject, ...userArr]

						copyData.data = newArr

						return copyData
					},
				)
			},
		},
	)

	const onSubmit = (data: PostUser) => mutation.mutateAsync(data)

	const { isLoading, run, setError, error, isError } = useAsync()

	return { onSubmit, isLoading, run, setError, error, isError }
}

const useRemoveUser = (user: UserObject) => {
	const { remove } = useClient()
	const queryClient = useQueryClient()

	return useMutation(() => remove(`users/${user.id}`), {
		onSuccess: () => {
			queryClient.setQueriesData(['users'], (oldData: GetUsers | undefined) => {
				if (!oldData) return

				const copyData = { ...oldData }

				const userArr = [...copyData.data]

				const filterUserArr = userArr.filter(({ id }) => id !== user.id)

				copyData.data = filterUserArr

				return copyData
			})
		},
	})
}

export { useGetUsers, useCreateUser, useRemoveUser }
