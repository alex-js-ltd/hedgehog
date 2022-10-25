// @ts-nocheck

const localStorageKey = '__auth_provider_token__'

async function getToken() {
	return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse(user) {
	window.localStorage.setItem(localStorageKey, user.token)
	return user
}

function login({ email, password }) {
	return client('login', { email, password }).then(handleUserResponse)
}

function register({ email, password }) {
	return client('register', { email, password }).then(handleUserResponse)
}

async function logout() {
	window.localStorage.removeItem(localStorageKey)
}

const authURL = process.env.REACT_APP_API_URL

async function client(endpoint, data) {
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
