/** @jsxImportSource @emotion/react */

import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'

import { ActionButtons } from './action-buttons'

import { UserObject } from 'types'

const UserRow = ({ user }: { user: UserObject }) => {
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
						alt={`${email}`}
						css={{ maxHeight: '100%', width: '100%' }}
					/>
				</div>
				<div css={{ flex: 1 }}>
					<div css={{ display: 'flex', justifyContent: 'space-between' }}>
						<div css={{ flex: 1 }}>
							<h2
								id={idString}
								css={{
									fontSize: '1.25em',
									margin: '0',
									color: colors.indigo,
								}}
							>
								{`${first_name + ' ' + last_name}`}
							</h2>
						</div>
					</div>
				</div>
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
				<ActionButtons user={user} />
			</div>
		</div>
	)
}

export { UserRow }
