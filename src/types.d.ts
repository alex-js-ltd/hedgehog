type User = { id?: number; token: string; email?: string }

type FormData = {
	email: string
	password: string
}

type Config = {
	method: 'POST' | 'GET' | 'DELETE'
	token?: string
	data?: any
}

interface UserData {
	id: number
	email: string
	first_name: string
	last_name: string
	avatar: string
}

interface PostUser {
	email: string
	first_name: string
	last_name: string
	avatar?: string
}

export { User, FormData, Config, UserData, PostUser }
