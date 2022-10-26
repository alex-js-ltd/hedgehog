import React from 'react'
import { useGetUsers, useCreateUser } from 'utils/users'

const CreateUser = () => {
	const mutation = useCreateUser()

	const post = {
		email: 'hello@gmail.com',
		first_name: 'hello',
		last_name: 'hello',
		avatar:
			'https://i.picsum.photos/id/10/200/200.jpg?hmac=Pal2P4G4LRZVjNnjESvYwti2SuEi-LJQqUKkQUoZq_g',
	}

	return (
		<div>
			<div onClick={() => mutation.mutateAsync(post)}>create</div>
		</div>
	)
}

export { CreateUser }
