// api host
// let host = 'http://123.57.237.176:8079'
// let host = 'http://vote.duanjn.com'
let host = 'http://localhost:8079'

var StatusService = require('./StatusService.js');
var ToolsService = require('./ToolsService.js');

const api = {
	user_login: {
		path: `${host}/user/login`,
		method: 'POST'
	},
	topic: {
		path: `${host}/topic/`,
		method: "GET"
	},
	add_topic: {
		path: `${host}/topic`,
		method: "POST"
	},
	add_topic_history: {
		path: `${host}/topic/list/my/history`,
		method: "GET"
	},
	my_interest_topic_list: {
		path: `${host}/topic/list/my/interest`,
		method: "GET"
	},
	my_topic_list: {
		path: `${host}/topic/list/my`,
		method: "GET"
	},
	topic_list: {
		path: `${host}/topic/list`,
		method: "GET"
	},
	comment_list: {
		path: `${host}/comment/list`,
		method: "GET"
	},
	search_history: {
		path: `${host}/search/history`,
		method: "GET"
	},
	add_search_history: {
		path: `${host}/search`,
		method: "POST"
	},
	add_comment: {
		path: `${host}/comment`,
		method: "POST"
	},
	vote: {
		path: `${host}/comment/vote`,
		method: "POST"
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

function login(user) {
	StatusService.status.loginUser = user
	request({
		url: api.user_login.path,
		method: api.user_login.method,
		data: user,
		success: (res) => {
			StatusService.status.userUid = res.data.data.uid
			StatusService.status.userId = res.data.data.id

			ToolsService.showSuccessToast(user + ' 自动登陆成功')
		},
		fail: function(err) {
			ToolsService.showErrorToast(user + ' 登陆失败')
		}
	})
}


module.exports = {
	api,
	request,
	login,
	
	host
	
}
