import { User, FormData } from 'types'
const localStorageKey = '__auth_provider_token__'

async function getToken() {
	return window.localStorage.getItem(localStorageKey)
}

function handleResponse(res: User, email: string) {
	if (!res.token) {
		return
	}
	window.localStorage.setItem(localStorageKey, res.token)
	return { email, ...res }
}

function login({ email, password }: FormData) {
	return client('login', { email, password }).then(res =>
		handleResponse(res, email),
	)
}

function register({ email, password }: FormData) {
	return client('register', { email, password }).then(res =>
		handleResponse(res, email),
	)
}

async function logout() {
	window.localStorage.removeItem(localStorageKey)
}

const authURL = process.env.REACT_APP_API_URL

async function client(endpoint: string, data: FormData): Promise<User> {
	const config = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' },
	}

	return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
		const data = await response.json()
		if (response.ok) {
			return data
		} else {
			return Promise.reject(data)
		}
	})
}

export { getToken, login, register, logout, localStorageKey }
