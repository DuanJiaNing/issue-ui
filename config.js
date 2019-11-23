// api host
let host = 'http://localhost:8181'

const debug = true

const sortTypes = [{
		name: "最新发布",
		code: 1
	},
	{
		name: "参与人数最多",
		code: 2
	},
	{
		name: "最不受推荐",
		code: 3
	},
	{
		name: "最受喜爱",
		code: 4
	}
]

const topicTypes = [{
		name: "热门",
		color: "#E71E1E"
	},
	{
		name: "全部",
		color: "#05DEB7"
	},
	{
		name: "冷门优质",
		color: "#24B4F1"
	},
	{
		name: "最新",
		color: "#26BB74"
	},
	{
		name: "我的",
		color: "#FCC80F"
	}
]

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
	topicTypes,
	sortTypes
}
