import { rest } from 'msw'

const delay = 1500

const apiURL = process.env.REACT_APP_API_URL

const handlers = [
	rest.post(`${apiURL}/login`, async (req, res, ctx) => {
		let body = await req.json()

		if (!body.password) {
			return res(
				ctx.delay(delay),
				ctx.status(400),
				ctx.json({ error: { message: 'password required' } }),
			)
		}
		if (!body.email) {
			return res(
				ctx.delay(delay),
				ctx.status(400),
				ctx.json({ error: { message: 'email required' } }),
			)
		}

		return res(ctx.delay(delay), ctx.json({ email: body.email }))
	}),
]

export { handlers }
