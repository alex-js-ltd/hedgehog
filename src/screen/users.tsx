import React, { useState, useEffect } from 'react'
import { useGetUsers } from 'utils/users'

import { UserListUL, Spinner } from 'comps/library'
import { UserRow } from 'comps/user-row'
import { UserData } from 'types'

const UsersScreen = () => {
	const [query, setQuery] = useState<string>('1')
	const { users, error, isLoading, isError, isSuccess } = useGetUsers(query)

	useEffect(() => {
		console.log(users)
	}, [users])

	return (
		<div>
			<UserListUL css={{ marginTop: 20 }}>
				{users.map((user: UserData) => (
					<li key={user.id} aria-label={user.email}>
						<UserRow key={user.id} user={user} />
					</li>
				))}
			</UserListUL>
		</div>
	)
}

export { UsersScreen }
