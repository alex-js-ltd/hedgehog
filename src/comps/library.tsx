/** @jsxImportSource @emotion/react */

import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from '@emotion/styled/macro'
import { keyframes, CSSObject } from '@emotion/react'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import { Dialog as ReachDialog } from '@reach/dialog'
import { FaSpinner } from 'react-icons/fa'

const spin = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' },
})

const CircleButton = styled.button({
	borderRadius: '30px',
	padding: '0',
	width: '40px',
	height: '40px',
	lineHeight: '1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: colors.base,
	color: colors.text,
	border: `1px solid ${colors.gray10}`,
	cursor: 'pointer',
})

const UserListUL = styled.ul({
	maxWidth: '570px',
	overflowX: 'scroll',
	listStyle: 'none',
	padding: '0',
	display: 'flex',

	li: {
		flexShrink: 0,
		width: '550px',
		marginLeft: '40px',
	},

	'li:first-of-type': {
		marginLeft: '0px',
	},

	[mq.small]: {
		maxWidth: 'unset',

		flexDirection: 'column',
		overflowX: 'visible',

		li: {
			width: '100%',
			height: '270px',
			marginLeft: '0px',
			marginBottom: '1rem',
		},
	},
})

const Spinner = styled(FaSpinner)({
	animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
	'aria-label': 'loading',
}

type ButtonVariant = { primary: CSSObject; secondary: CSSObject }

const buttonVariants: ButtonVariant = {
	primary: {
		background: colors.blue,
		color: colors.base,
	},
	secondary: {
		background: colors.gray,
		color: colors.text,
	},
}
const Button = styled.button<{ variant: keyof ButtonVariant }>(
	{
		padding: '10px 15px',
		border: '0',
		lineHeight: '1',
		borderRadius: '3px',
	},
	({ variant = 'secondary' }) => buttonVariants[variant],
)

const inputStyles = {
	border: '1px solid #f1f1f4',
	background: '#f1f2f7',
	padding: '8px 12px',
}

const Input = styled.input({ borderRadius: '3px' }, inputStyles)
const Textarea = styled.textarea(inputStyles)

const Dialog = styled(ReachDialog)({
	maxWidth: '450px',
	borderRadius: '3px',
	paddingBottom: '3.5em',
	boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
	margin: '20vh auto',
	[mq.small]: {
		width: '100%',
		margin: '10vh auto',
	},
})

const FormGroup = styled.div({
	display: 'flex',
	flexDirection: 'column',
})

const FullPageSpinner = () => (
	<div
		css={{
			fontSize: '4em',
			height: '100vh',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<Spinner />
	</div>
)

const Link = styled(RouterLink)({
	color: colors.indigo,
	':hover': {
		color: colors.indigoDarken10,
		textDecoration: 'underline',
	},
})

type ErrVariant = { stacked: CSSObject; inline: CSSObject }

const errorMessageVariants: ErrVariant = {
	stacked: { display: 'block' },
	inline: { display: 'inline-block' },
}

const ErrorMessage = ({
	error,
	variant = 'stacked',
	...props
}: {
	error: any
	variant?: keyof ErrVariant
}) => (
	<div
		role='alert'
		css={[{ color: colors.danger }, errorMessageVariants[variant]]}
		{...props}
	>
		<span>There was an error: </span>
		<pre
			css={[
				{ whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
				errorMessageVariants[variant],
			]}
		>
			{`${error.error} try using eve.holt@reqres.in`}
		</pre>
	</div>
)

export {
	ErrorMessage,
	CircleButton,
	UserListUL,
	Spinner,
	Button,
	Input,
	Textarea,
	Dialog,
	FormGroup,
	FullPageSpinner,
	Link,
}
