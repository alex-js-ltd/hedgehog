/** @jsxImportSource @emotion/react */

import React from 'react'
import { useGetUsers, useCreateUser } from 'utils/users'
import * as colors from 'styles/colors'
import { Button, Input, FormGroup, Spinner, ErrorMessage } from 'comps/library'

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
		<div
			css={{
				minHeight: 270,

				border: `1px solid ${colors.gray20}`,
				color: colors.text,
				padding: '1.25em',
				borderRadius: '3px',
				display: 'flex',
				flexDirection: 'column',
				'> div': {
					margin: '10px auto',
					width: '100%',
					maxWidth: '300px',
				},
			}}
			onClick={() => mutation.mutateAsync(post)}
		>
			<FormGroup>
				<label htmlFor='email'>Email</label>
				<Input id='email' />
			</FormGroup>
			<FormGroup>
				<label htmlFor='password'>Password</label>
				<Input id='password' type='password' />
			</FormGroup>
		</div>
	)
}

export { CreateUser }
