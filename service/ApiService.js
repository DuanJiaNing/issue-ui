// api host
// let host = 'http://123.57.237.176:8079'
let host = 'http://localhost:8079'
var StatusService = require('./StatusService.js');

const api = {
	user_login: {
		path: `${host}/user/login`,
		method: 'POST'
	},
	add_topic: {
		path: `${host}/topic/add`,
		method: "POST"
	},
	add_topic_history: {
		path: `${host}/topic/list/my`,
		method: "GET"
	}
}

function request(obj) {
	if (obj.header) {
		obj.header.push({
			'uid': StatusService.status.userUid
		})
	} else {
		obj.header = {
			'uid': StatusService.status.userUid
		}
	}
	uni.request(obj)
}


module.exports = {
	api,
	request
}
