/** @jsxImportSource @emotion/react */

import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { CircleButton, Spinner } from './library'
import * as mq from 'styles/media-queries'

const Pagination = ({
	total_pages,
	query,
	setQuery,
	isLoading,
}: {
	total_pages: number
	query: number
	setQuery: Function
	isLoading: boolean
}) => {
	const clickLeft = () => {
		if (query > 1) {
			setQuery(query - 1)
		} else return
	}

	const clickRight = () => {
		if (query < total_pages) {
			setQuery(query + 1)
		} else return
	}

	return (
		<div
			css={{
				display: 'flex',
				justifyContent: 'space-between',
				margin: '1rem 0',
				maxWidth: '570px',
				[mq.small]: {
					maxWidth: '100%',
				},
			}}
		>
			<CircleButton
				onClick={() => clickLeft()}
				css={{ opacity: query === 1 ? 0.2 : 1 }}
			>
				{isLoading ? <Spinner /> : <FaArrowCircleLeft />}
			</CircleButton>

			<CircleButton
				onClick={() => clickRight()}
				css={{ opacity: total_pages === query ? 0.2 : 1 }}
			>
				{isLoading ? <Spinner /> : <FaArrowCircleRight />}
			</CircleButton>
		</div>
	)
}

export { Pagination }
