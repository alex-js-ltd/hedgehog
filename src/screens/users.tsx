/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import { useGetUsers } from 'utils/users'

import { UserListUL } from 'comps/library'
import { UserRow } from 'comps/user-row'
import { Pagination } from 'comps/pagination'
import { CreateUser } from 'comps/create-user'
import { UserObject } from 'types'

const UsersScreen = () => {
	const [query, setQuery] = useState<number>(1)

	const { users, total_pages } = useGetUsers(query)

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

			<CreateUser users={users} />
		</div>
	)
}

export { UsersScreen }
