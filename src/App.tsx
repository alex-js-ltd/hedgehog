import * as React from 'react'
import { useAuth } from './context/auth-context'
import { FullPageSpinner } from 'comps/library'

// the webpackPrefetch comment will request the authenticated-app bundle when the user clicks login / register
const AuthenticatedApp = React.lazy(
	() => import(/* webpackPrefetch: true */ './authenticated-app'),
)

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
