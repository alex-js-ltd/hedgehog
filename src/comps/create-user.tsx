/** @jsxImportSource @emotion/react */

import React, { FormEvent } from 'react'

import * as colors from 'styles/colors'
import { Input, FormGroup, CircleButton, Spinner } from 'comps/library'
import { FaPlusCircle } from 'react-icons/fa'

import { useAsync } from 'utils/useAsync'

const CreateUser = ({ onSubmit }: { onSubmit: Function }) => {
	const { isLoading, isError, error, run } = useAsync()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.currentTarget

		const formElements = form.elements as typeof form.elements & {
			email: HTMLInputElement
			first_name: HTMLInputElement
			last_name: HTMLInputElement
		}

		run(
			onSubmit({
				email: formElements.email.value,
				first_name: formElements.first_name.value,
				last_name: formElements.last_name.value,
				avatar: 'https://miro.medium.com/max/1230/0*vwtmE6kZFO0rIq9o.',
			}).then(() => form.reset()),
		)
	}

	return (
		<form
			onSubmit={handleSubmit}
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
				<CircleButton type='submit'>
					{isLoading ? <Spinner /> : <FaPlusCircle />}
				</CircleButton>
			</div>
		</form>
	)
}

export { CreateUser }
