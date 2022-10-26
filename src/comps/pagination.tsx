/** @jsxImportSource @emotion/react */

import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

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
				marginTop: '1rem',
			}}
		>
			<FaArrowCircleLeft
				onClick={() => clickLeft()}
				style={{ opacity: query === 1 ? 0.2 : 1 }}
			/>

			<FaArrowCircleRight
				onClick={() => clickRight()}
				style={{ opacity: total_pages === query ? 0.2 : 1 }}
			/>
		</div>
	)
}

export { Pagination }
