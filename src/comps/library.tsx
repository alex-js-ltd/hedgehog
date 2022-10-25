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

const BookListUL = styled.ul({
	listStyle: 'none',
	padding: '0',
	display: 'grid',
	gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
	gridGap: '1em',
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

const errorMessageVariants: any = {
	stacked: { display: 'block' },
	inline: { display: 'inline-block' },
}

const ErrorMessage = ({ error, variant = 'stacked', ...props }: any) => (
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

const FullPageErrorFallback = ({ error }: { error: Error }) => (
	<div
		role='alert'
		css={{
			color: colors.danger,
			height: '100vh',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<p>Uh oh... There's a problem. Try refreshing the app.</p>
		<pre>{error?.message}</pre>
	</div>
)

export {
	FullPageErrorFallback,
	ErrorMessage,
	CircleButton,
	BookListUL,
	Spinner,
	Button,
	Input,
	Textarea,
	Dialog,
	FormGroup,
	FullPageSpinner,
	Link,
}
