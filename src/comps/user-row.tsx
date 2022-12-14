/** @jsxImportSource @emotion/react */

import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'

import { FaMinusCircle } from 'react-icons/fa'
import { ActionButton } from './action-button'
import { useRemoveUser } from 'utils/users'

import { UserObject } from 'types'

const UserRow = ({ user }: { user: UserObject }) => {
	const { id, email, first_name, last_name, avatar } = user

	const remove = useRemoveUser(user)

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
				data-testid={`${id}`}
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
								id={`${id}`}
								css={{
									fontSize: '1.25em',
									margin: '0',
									color: colors.indigo,
								}}
							>
								{`${first_name + ' ' + last_name}`}
							</h2>
						</div>

						<div css={{ marginLeft: 10 }}>
							<div
								css={{
									marginTop: '0.4em',
									fontStyle: 'italic',
									fontSize: '0.85em',
								}}
							>
								{email}
							</div>
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
				<ActionButton
					label={`remove-from-list-${id}`}
					highlight={colors.danger}
					onClick={() => remove.mutateAsync()}
					icon={<FaMinusCircle />}
				/>
			</div>
		</div>
	)
}

export { UserRow }
