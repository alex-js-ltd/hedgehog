import React, { ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from 'context/auth-context'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const AppProviders = ({ children }: { children: ReactNode }) => (
	<QueryClientProvider client={queryClient}>
		<ReactQueryDevtools initialIsOpen={false} />
		<Router>
			<AuthProvider>{children}</AuthProvider>
		</Router>
	</QueryClientProvider>
)

export { AppProviders, queryClient }
