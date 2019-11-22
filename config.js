// api host
let host = 'http://localhost:8181'

const debug = true

const topicTypes = {
	hot: {
		name: "热门",
		color: "#E71E1E"
	},
	all: {
		name: "全部",
		color: "#05DEB7"
	},
	cool: {
		name: "冷门优质",
		color: "#24B4F1"
	},
	latest: {
		name: "最新",
		color: "#26BB74"
	},
	my: {
		name: "我的",
		color: "#FCC80F"
	}
}

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
	topicTypes
}
