import { render, screen, waitForElementToBeRemoved } from 'test/test-utils'
import App from '../App'

test('renders login / register page', async () => {
	render(<App />)

	await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i))

	const loginButton = screen.getByRole('button', { name: /Login/i })
	const registerButton = screen.getByRole('button', { name: /Register/i })

	expect(loginButton).toBeInTheDocument()
	expect(registerButton).toBeInTheDocument()
})
