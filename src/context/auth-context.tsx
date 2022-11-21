import {
	createContext,
	useContext,
	useEffect,
	ReactNode,
	useCallback,
	MouseEventHandler,
} from 'react'
import { queryClient } from 'context'
import * as auth from 'auth-provider'
import { client } from 'utils/api-client'
import { useAsync } from 'utils/useAsync'
import { User, FormData, Config } from 'types'

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

	const login = async (form: FormData) =>
		auth.login(form).then(user => setData(user))

	const register = async (form: FormData) =>
		auth.register(form).then(user => setData(user))

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

const useClient = () => {
	const { user } = useAuth()
	const token = user?.token

	return useCallback(
		(endpoint: string, config: Config) =>
			client(endpoint, { ...config, token }),
		[token],
	)
}

export { AuthProvider, useAuth, useClient }
