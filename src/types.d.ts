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

type GetUsers = {
	page: number
	per_page: number
	total: number
	total_pages: number
	data: UserObject[]
	support: Support
}

type Support = {
	url: string
	text: string
}

export type { User, FormData, Config, UserObject, PostUser, GetUsers }
