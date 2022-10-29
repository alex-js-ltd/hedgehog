import { rest } from 'msw'

const delay = 150

const apiURL = process.env.REACT_APP_API_URL

const handlers = [
	rest.post(`${apiURL}/users`, async (req, res, ctx) => {
		let body = await req.json()

		if (!body.email) {
			return res(ctx.delay(delay), ctx.status(400), ctx.json('email required'))
		}

		if (!body.first_name) {
			return res(ctx.delay(delay), ctx.status(400))
		}

		if (!body.last_name) {
			return res(ctx.delay(delay), ctx.status(400))
		}

		return res(
			ctx.delay(delay),
			ctx.json({
				id: '9999',
				email: body.email,
				first_name: body.first_name,
				last_name: body.last_name,
				avatar:
					'https://helios-i.mashable.com/imagery/articles/072lIcNUyX8S7dErUXzHLuN/hero-image.fill.size_1248x702.v1623382106.jpg',
			}),
		)
	}),
]

export { handlers }
