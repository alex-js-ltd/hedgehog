/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react'
import { useGetUsers, useCreateUser } from 'utils/users'

import { UserListUL } from 'comps/library'
import { UserRow } from 'comps/user-row'
import { Pagination } from 'comps/pagination'
import { CreateUser } from 'comps/create-user'
import { UserObject, PostUser } from 'types'

const UsersScreen = () => {
	const [query, setQuery] = useState<number>(1)

	const { users, total_pages } = useGetUsers(query)

	const mutation = useCreateUser()

	const onSubmit = (data: PostUser) => mutation.mutateAsync(data)

	return (
		<div>
			<UserListUL>
				{users?.map((user: UserObject) => (
					<li key={user.id} aria-label={user.email}>
						<UserRow key={user.id} user={user} />
					</li>
				))}
			</UserListUL>

			{users?.length === 0 ? null : (
				<Pagination
					total_pages={total_pages}
					query={query}
					setQuery={setQuery}
				/>
			)}

			<CreateUser onSubmit={onSubmit} users={users} />
		</div>
	)
}

export { UsersScreen }
