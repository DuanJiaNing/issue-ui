// api host
let host = 'http://localhost:8181'

const debug = true

const api = {
	issue: {
		topic: {
			add: {
				path: `${host}/api/topic`,
				method: "POST"
			}
		}
	}
}

module.exports = {
	api,
	debug,
}
