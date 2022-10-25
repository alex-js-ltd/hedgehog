import * as React from 'react'

import { FullPageSpinner } from 'comps/library'

//const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

const App = () => {
	return (
		<React.Suspense fallback={<FullPageSpinner />}>
			{true ? <UnauthenticatedApp /> : null}
		</React.Suspense>
	)
}

export default App
