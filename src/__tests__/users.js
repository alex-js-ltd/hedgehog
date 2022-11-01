import {
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
	act,
} from 'test/test-utils'
import { UsersScreen } from 'screens/users'
import { setupServer } from 'msw/node'
import { handlers, mockData } from 'test/server-handlers'
import userEvent from '@testing-library/user-event'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

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

test('delete the first user from the user list', async () => {
	render(<UsersScreen />)

	await waitFor(() => {
		const button = screen.getByRole('button', { name: /remove-from-list-1/i })

		userEvent.click(button)

		waitForElementToBeRemoved(() =>
			screen.queryByText(mockData.data[0].email),
		).then(() => console.log(`${mockData.data[0].email} no longer in DOM`))
	})
})
