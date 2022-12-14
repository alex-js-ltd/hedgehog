import { queryClient } from 'context'
import * as auth from 'auth-provider'
import { Config, GetUsers, PostUser, UserObject } from 'types'
const apiURL = process.env.REACT_APP_API_URL

async function client(endpoint: string, { method, data, token }: Config) {
	const config = {
		method: method,
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			Authorization: token ? `Bearer ${token}` : `Bearer ${undefined}`,
			'Content-Type': 'application/json',
		},
	}

	return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
		if (response.status === 401) {
			queryClient.clear()
			await auth.logout()
			// refresh the page for them
			window.location.assign(window.location.href)
			return Promise.reject('Please re-authenticate.')
		}

		const data = method !== 'DELETE' ? await response.json() : null

		if (response.ok) {
			return data
		} else {
			return Promise.reject(data)
		}
	})
}

function read(endpoint: string, token?: string): Promise<GetUsers> {
	return client(endpoint, { method: 'GET', token })
}

function create(
	endpoint: string,
	data: PostUser,
	token?: string,
): Promise<UserObject> {
	return client(endpoint, { method: 'POST', data, token })
}

function remove(endpoint: string, token?: string): Promise<void> {
	return client(endpoint, { method: 'DELETE', token })
}

export { read, create, remove }
