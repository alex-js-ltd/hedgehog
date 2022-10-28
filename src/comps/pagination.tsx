/** @jsxImportSource @emotion/react */

import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { CircleButton } from './library'

const Pagination = ({
	total_pages,
	query,
	setQuery,
}: {
	total_pages: number
	query: number
	setQuery: Function
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
			}}
		>
			<CircleButton>
				<FaArrowCircleLeft
					onClick={() => clickLeft()}
					css={{ opacity: query === 1 ? 0.2 : 1 }}
				/>
			</CircleButton>

			<CircleButton>
				<FaArrowCircleRight
					onClick={() => clickRight()}
					css={{ opacity: total_pages === query ? 0.2 : 1 }}
				/>
			</CircleButton>
		</div>
	)
}

export { Pagination }
