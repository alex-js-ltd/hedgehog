/** @jsxImportSource @emotion/react */

import React from 'react'
import { useGetUsers, useCreateUser } from 'utils/users'
import * as colors from 'styles/colors'
import {
	Button,
	Input,
	FormGroup,
	Spinner,
	ErrorMessage,
	CircleButton,
} from 'comps/library'

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
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				position: 'relative',
			}}
		>
			<div
				css={{
					minHeight: 270,
					flexGrow: 2,
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
					<label htmlFor='first_name'>First Name</label>
					<Input id='first_name' type='text' />
				</FormGroup>

				<FormGroup>
					<label htmlFor='last_name'>Last Name</label>
					<Input id='last_name' type='text' />
				</FormGroup>
			</div>
			<div
				css={{
					marginLeft: '20px',
					position: 'absolute',
					right: -20,
					color: colors.gray80,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					height: '100%',
				}}
			>
				<CircleButton />
			</div>
		</div>
	)
}

export { CreateUser }
