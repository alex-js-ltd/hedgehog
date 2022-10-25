/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { useGetUsers, useCreateUser } from 'utils/users'

import { UserListUL, Spinner } from 'comps/library'
import { UserRow } from 'comps/user-row'
import { UserData } from 'types'

const UsersScreen = () => {
	const [query, setQuery] = useState<string>('1')
	const { users, error, isLoading, isError, isSuccess } = useGetUsers(query)

	const mutation = useCreateUser()

	const post = {
		email: 'hello@gmail.com',
		first_name: 'hello',
		last_name: 'hello',
		avatar:
			'https://i.picsum.photos/id/10/200/200.jpg?hmac=Pal2P4G4LRZVjNnjESvYwti2SuEi-LJQqUKkQUoZq_g',
	}

	useEffect(() => {
		console.log(users)
	}, [users])

	return (
		<div>
			<div onClick={() => mutation.mutateAsync(post)}>create</div>
			<UserListUL>
				{users?.map((user: UserData) => (
					<li key={user.id} aria-label={user.email}>
						<UserRow key={user.id} user={user} />
					</li>
				))}
			</UserListUL>
		</div>
	)
}

export { UsersScreen }
