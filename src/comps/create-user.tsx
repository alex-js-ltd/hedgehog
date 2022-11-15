/** @jsxImportSource @emotion/react */

import React, { FormEvent, Fragment } from 'react'

import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {
	Input,
	FormGroup,
	CircleButton,
	Spinner,
	ErrorMessage,
} from 'comps/library'
import { FaPlusCircle } from 'react-icons/fa'

import { useCreateUser } from 'utils/users'
import { UserObject } from 'types'

const CreateUser = ({ users }: { users: UserObject[] }) => {
	const { onSubmit, isLoading, run, setError, error, isError } = useCreateUser()

	interface FormElements extends HTMLFormControlsCollection {
		email: HTMLInputElement
		first_name: HTMLInputElement
		last_name: HTMLInputElement
		avatar: HTMLInputElement
	}
	interface UserElements extends HTMLFormElement {
		readonly elements: FormElements
	}

	const handleSubmit = (event: FormEvent<UserElements>) => {
		event.preventDefault()
		const form = event.currentTarget

		const { email, first_name, last_name, avatar } = form

		if (users?.some(e => e.email === email.value)) {
			setError('email already in use')
			return
		}

		run(
			onSubmit({
				email: email.value,
				first_name: first_name.value,
				last_name: last_name.value,
				avatar: avatar?.files?.length ? avatar.files[0] : null,
			}).then(() => form.reset()),
		)
	}

	return (
		<Fragment>
			<form
				onSubmit={handleSubmit}
				css={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-end',
					position: 'relative',
					width: '570px',
					[mq.small]: {
						width: '100%',
					},
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
				>
					<FormGroup>
						<label htmlFor='email'>Email</label>
						<Input id='email' type='email' required />
					</FormGroup>
					<FormGroup>
						<label htmlFor='first_name'>First Name</label>
						<Input id='first_name' type='text' required />
					</FormGroup>

					<FormGroup>
						<label htmlFor='last_name'>Last Name</label>
						<Input id='last_name' type='text' required />
					</FormGroup>

					<FormGroup>
						<label htmlFor='avatar'>Avatar</label>
						<Input id='avatar' type='file' required />
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
					<CircleButton
						type='submit'
						css={{
							backgroundColor: 'white',
							':hover,:focus': {
								color: isLoading
									? colors.gray80
									: isError
									? colors.danger
									: colors.green,
							},
						}}
					>
						{isLoading ? <Spinner /> : <FaPlusCircle />}
					</CircleButton>
				</div>
			</form>
			{isError ? <ErrorMessage error={error} /> : null}
		</Fragment>
	)
}

export { CreateUser }
