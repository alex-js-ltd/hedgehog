import {
	createContext,
	useContext,
	useEffect,
	ReactNode,
	MouseEventHandler,
} from 'react'
import { queryClient } from 'context'
import * as auth from 'auth-provider'

import { useAsync } from 'utils/useAsync'
import { User, FormData } from 'types'

type AuthProviderProps = { children: ReactNode }

const AuthContext = createContext<
	| {
			user: User | null
			login: Function
			register: Function
			logout: MouseEventHandler<HTMLButtonElement>
	  }
	| undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

const getUser = async () => {
	console.log('getUser')
	const res = await auth.getToken()
	if (!res) return null
	let user = JSON.parse(res)

	return user
}

// fetch user before auth provider mounts persist user data
const userPromise = getUser()

const AuthProvider = ({ children }: AuthProviderProps) => {
	const {
		data: user,

		run,
		setData,
	} = useAsync()

	useEffect(() => {
		console.log('useEffect')
		run(userPromise)
	}, [run])

	const login = (form: FormData) => {
		return auth.login(form).then(user => setData(user))
	}
	const register = (form: FormData) => {
		return auth.register(form).then(user => setData(user))
	}
	const logout = () => {
		auth.logout()
		queryClient.clear()
		setData(null)
	}

	const value = { user, login, register, logout }

	return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>
}

const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthContext provider`)
	}
	return context
}

export { AuthProvider, useAuth }
