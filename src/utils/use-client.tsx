import { useCallback } from 'react'
import { useAuth } from 'context/auth-context'
import * as client from 'utils/api-client'
import { PostUser } from 'types'

const useClient = () => {
	const { user } = useAuth()
	const token = user?.token

	const read = useCallback(
		(endpoint: string) => client.read(endpoint, token),
		[token],
	)

	const remove = useCallback(
		(endpoint: string) => client.remove(endpoint, token),
		[token],
	)

	const create = useCallback(
		(endpoint: string, data: PostUser) => client.create(endpoint, data, token),
		[token],
	)

	return { read, remove, create }
}

export { useClient }
