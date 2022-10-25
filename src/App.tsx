import * as React from 'react'
import { useAuth } from './context/auth-context'
import { FullPageSpinner } from 'comps/library'

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

const App = () => {
	const { user } = useAuth()

	return (
		<React.Suspense fallback={<FullPageSpinner />}>
			{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</React.Suspense>
	)
}

export default App
