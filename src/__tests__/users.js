import { render, screen, waitFor } from 'test/test-utils'
import { UsersScreen } from 'screens/users'
import { setupServer } from 'msw/node'
import { handlers } from 'test/server-handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

test('render user list with george.bluth@reqres.in', async () => {
	render(<UsersScreen />)

	await waitFor(() => {
		expect(screen.getByText('george.bluth@reqres.in')).toBeInTheDocument()
	})
})
