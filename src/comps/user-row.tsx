/** @jsxImportSource @emotion/react */

import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'

import { UserData } from 'types'

const UserRow = ({ user }: { user: UserData }) => {
	const { id, email, first_name, last_name, avatar } = user

	const idString = `${id}`

	return (
		<div
			css={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				position: 'relative',
			}}
		>
			<div
				aria-labelledby={idString}
				css={{
					minHeight: 270,
					flexGrow: 2,
					display: 'grid',
					gridTemplateColumns: '140px 1fr',
					gridGap: 20,
					border: `1px solid ${colors.gray20}`,
					color: colors.text,
					padding: '1.25em',
					borderRadius: '3px',
					':hover,:focus': {
						textDecoration: 'none',
						boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
						color: 'inherit',
					},
				}}
			>
				<div
					css={{
						width: 140,
						[mq.small]: {
							width: 100,
						},
					}}
				>
					<img
						src={avatar}
						alt={`${first_name}`}
						css={{ maxHeight: '100%', width: '100%' }}
					/>
				</div>
			</div>
		</div>
	)
}

export { UserRow }
