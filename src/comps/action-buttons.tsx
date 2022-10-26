/** @jsxImportSource @emotion/react */

import * as React from 'react'
import { FaMinusCircle, FaTimesCircle } from 'react-icons/fa'
import { Tooltip } from '@reach/tooltip'

import * as colors from 'styles/colors'
import { useAsync } from 'utils/useAsync'
import { CircleButton, Spinner } from './library'
import { useRemoveUser } from 'utils/users'
import { UserObject } from 'types'

function TooltipButton({ label, highlight, onClick, icon, ...rest }: any) {
	const { isLoading, isError, error, run } = useAsync()

	function handleClick() {
		run(onClick())
	}

	return (
		<Tooltip label={label}>
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
		</Tooltip>
	)
}

const ActionButtons = ({ user }: { user: UserObject }) => {
	const mutation = useRemoveUser(user)
	return (
		<React.Fragment>
			<TooltipButton
				label='Remove from list'
				highlight={colors.danger}
				onClick={() => mutation.mutateAsync()}
				icon={<FaMinusCircle />}
			/>
		</React.Fragment>
	)
}

export { ActionButtons }
