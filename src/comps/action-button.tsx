/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { FaTimesCircle } from 'react-icons/fa'

import * as colors from 'styles/colors'
import { useAsync } from 'utils/useAsync'
import { CircleButton, Spinner } from './library'

type Props = {
	label: string
	highlight: string
	onClick: Function
	icon: ReactNode
}

const ActionButton = ({ label, highlight, onClick, icon, ...rest }: Props) => {
	const { isLoading, isError, run } = useAsync()

	const handleClick = () => {
		run(onClick())
	}

	return (
		<CircleButton
			css={{
				backgroundColor: 'white',
				':hover,:focus': {
					color: isLoading
						? colors.gray80
						: isError
						? colors.danger
						: highlight,
				},
			}}
			disabled={isLoading}
			onClick={handleClick}
			aria-label={label}
			{...rest}
		>
			{isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
		</CircleButton>
	)
}

export { ActionButton }
