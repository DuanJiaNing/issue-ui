// api host
let host = 'http://localhost:8181'

const debug = true

const topicList = [
	{
		title: "2019 年双十一，你有哪些堪称「好物」的电子产品推荐？",
		like: 120,
		dislike: 67,
		scount: 130
	},
	{
		title: "找工作时单位普遍要求 35 岁以下，那 35 岁以上的人都干嘛去了？",
		like: 1234,
		dislike: 34,
		scount: 2345
	},
	{
		title: "先点赞再收藏呀，收藏是点赞的三倍",
		like: 12,
		dislike: 67,
		scount: 13
	},
]

const sortTypes = [
	{
		name: "随机"
	},
	{
		name: "最新发布"
	},
	{
		name: "参与人数最多"
	},
	{
		name: "最不受推荐"
	},
	{
		name: "最受喜爱"
	}
]

const topicTypes = [
	{
		name: "全部",
		code: "all",
		color: "#05DEB7"
	},
	{
		name: "热门",
		code: "hot",
		color: "#E71E1E"
	},
	{
		name: "冷门优质",
		code: "cool",
		color: "#24B4F1"
	},
	{
		name: "最新",
		code: "latest",
		color: "#26BB74"
	},
	{
		name: "我的",
		code: "my",
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
	sortTypes,
	
	topicList
}
