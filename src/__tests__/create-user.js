import {
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from 'test/test-utils'
import { CreateUser } from 'comps/create-user'
import userEvent from '@testing-library/user-event'
const { build, fake } = require('@jackfranklin/test-data-bot')
import { setupServer } from 'msw/node'
import { handlers } from 'test/server-handlers'

const mockData = [
	{
		id: 1,
		email: 'george.bluth@reqres.in',
		first_name: 'George',
		last_name: 'Bluth',
		avatar: 'https://reqres.in/img/faces/1-image.jpg',
	},
	{
		id: 2,
		email: 'janet.weaver@reqres.in',
		first_name: 'Janet',
		last_name: 'Weaver',
		avatar: 'https://reqres.in/img/faces/2-image.jpg',
	},
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const buildCreateUser = build({
	fields: {
		email: fake(faker => faker.internet.exampleEmail()),
		first_name: fake(faker => faker.internet.userName()),
		last_name: fake(faker => faker.internet.userName()),
	},
})

test('submitting the form returns an error if the email already exists in react query', async () => {
	const { email, first_name, last_name } = buildCreateUser()

	render(<CreateUser users={mockData} />)

	await waitFor(() => {
		userEvent.type(screen.getByLabelText(/email/i), 'george.bluth@reqres.in')
		userEvent.type(screen.getByLabelText(/First Name/i), first_name)
		userEvent.type(screen.getByLabelText(/Last Name/i), last_name)
		userEvent.click(screen.getByRole('button'))

		expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
			`"email already in use"`,
		)
	})
})