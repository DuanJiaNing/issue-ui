// api host
let host = 'http://localhost:8079'

const api = {
	topic: {
		add: {
			path: `${host}/api/topic`,
			method: "POST"
		},
		list: {
			path: `${host}/api/topic/list`,
			method: "GET"
		}
	}
}


module.exports = {
	api
}
