import { render, screen, waitFor } from 'test/test-utils'
import { LoginForm } from '../unauthenticated-app'
import { Button } from 'comps/library'
import userEvent from '@testing-library/user-event'
const { build, fake } = require('@jackfranklin/test-data-bot')

const buildLoginForm = build({
	fields: {
		email: fake(faker => faker.internet.exampleEmail()),
		password: fake(faker => faker.internet.password()),
	},
})

test('submitting the form calls onSubmit with email and password', async () => {
	const { email, password } = buildLoginForm()

	const handleSubmit = jest
		.fn()
		.mockResolvedValue({ email: email, token: 'SOME_FAKE_TOKEN' })

	render(
		<LoginForm
			onSubmit={handleSubmit}
			submitButton={<Button variant='primary'>Login</Button>}
		/>,
	),
		await waitFor(() => {
			userEvent.type(screen.getByLabelText(/email/i), email)
			userEvent.type(screen.getByLabelText(/password/i), password)
			userEvent.click(screen.getByRole('button', { name: /Login/i }))

			expect(handleSubmit).toHaveBeenCalledWith({
				email,
				password,
			})
			expect(handleSubmit).toHaveBeenCalledTimes(1)
		})
})
