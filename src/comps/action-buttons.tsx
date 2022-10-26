/** @jsxImportSource @emotion/react */

import * as React from 'react'
import { FaMinusCircle, FaTimesCircle } from 'react-icons/fa'
import { Tooltip } from '@reach/tooltip'

import * as colors from 'styles/colors'
import { useAsync } from 'utils/useAsync'
import { CircleButton, Spinner } from './library'

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

const ActionButtons = () => {
	return (
		<React.Fragment>
			<TooltipButton
				label='Remove from list'
				highlight={colors.danger}
				onClick={() => console.log('delete')}
				icon={<FaMinusCircle />}
			/>
		</React.Fragment>
	)
}

export { ActionButtons }
