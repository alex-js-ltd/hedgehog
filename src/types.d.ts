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

type UserObject = {
	id: number
	email: string
	first_name: string
	last_name: string
	avatar: string
}

type PostUser = {
	email: string
	first_name: string
	last_name: string
	avatar?: string
}

export { User, FormData, Config, UserObject, PostUser }
