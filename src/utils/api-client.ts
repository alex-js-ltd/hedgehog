import { queryClient } from 'context'
import * as auth from 'auth-provider'
import { Config } from 'types'
const apiURL = process.env.REACT_APP_API_URL

async function client(
	endpoint: string,
	{ method, data, token }: Config,
): Promise<any> {
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
			return Promise.reject({ message: 'Please re-authenticate.' })
		}

		if (method === 'DELETE') {
			return
		}
		const data = await response.json()

		if (response.ok) {
			return data
		} else {
			return Promise.reject(data)
		}
	})
}

export { client }
