import { render, screen, waitForElementToBeRemoved } from 'test/test-utils'
import App from '../App'

test('renders login / register page', async () => {
	render(<App />)

	await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i))

	screen.debug()
})
