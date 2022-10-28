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

import { useAsync } from 'utils/useAsync'
import { UserObject } from 'types'

const avatarArr = [
	'https://helios-i.mashable.com/imagery/articles/072lIcNUyX8S7dErUXzHLuN/hero-image.fill.size_1248x702.v1623382106.jpg',
	'https://miro.medium.com/max/1230/0*vwtmE6kZFO0rIq9o.',
	'https://cdn.britannica.com/66/218266-050-77C3D624/Cookie-Monster-Sesame-Street-2016.jpg',
	'https://s.yimg.com/uu/api/res/1.2/994pBpnIKvwRQvU1RiAZzw--~B/Zmk9ZmlsbDtoPTM4Nzt3PTY3NTthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/uu/api/res/1.2/Rh_OFEz8Hm2j5EA.2w5IkA--~B/aD01NTA7dz05NjA7YXBwaWQ9eXRhY2h5b24-/https://o.aolcdn.com/hss/storage/midas/e783c0c4a79dd1a9ceedb1090f52050e/201561495/cookie_monster_engadget_lede.png.cf.webp',
]

const CreateUser = ({
	onSubmit,
	users,
}: {
	onSubmit: Function
	users: UserObject[]
}) => {
	const { isLoading, run, setError, error, isError } = useAsync()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const form = event.currentTarget

		const formElements = form.elements as typeof form.elements & {
			email: HTMLInputElement
			first_name: HTMLInputElement
			last_name: HTMLInputElement
		}

		const { email, first_name, last_name } = formElements

		if (users?.some(e => e.email === email.value)) {
			setError({ error: 'email already in use' })
			return
		}

		run(
			onSubmit({
				email: email.value,
				first_name: first_name.value,
				last_name: last_name.value,
				avatar: avatarArr[Math.floor(Math.random() * avatarArr.length)],
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
			{isError ? <ErrorMessage error={error} /> : null}
		</Fragment>
	)
}

export { CreateUser }
