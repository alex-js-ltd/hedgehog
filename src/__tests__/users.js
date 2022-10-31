import { render, screen, waitFor } from 'test/test-utils'
import { UsersScreen } from 'screens/users'
import { setupServer } from 'msw/node'
import { handlers, mockData } from 'test/server-handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

test('render user list with george.bluth@reqres.in', async () => {
	render(<UsersScreen />)

	await waitFor(() => {
		expect(screen.getByText(mockData.data[0].email)).toBeInTheDocument()
	})
})

test('render user list without not_in_mock@gmail.com', async () => {
	render(<UsersScreen />)

	await waitFor(() => {
		expect(screen.queryByText('not_in_mock@gmail.com')).not.toBeInTheDocument()
	})
})
