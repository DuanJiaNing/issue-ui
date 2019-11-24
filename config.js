// api host
let host = 'http://localhost:8181'

const debug = true

const topicList = [{
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
	}
	// {
	// 	title: "找工作时单位普遍要求 35 岁以下，那 35 岁以上的人都干嘛去了？",
	// 	like: 1234,
	// 	dislike: 34,
	// 	scount: 2345
	// },
	// {
	// 	title: "先点赞再收藏呀，收藏是点赞的三倍",
	// 	like: 12,
	// 	dislike: 67,
	// 	scount: 13
	// },
]

const sortTypes = [{
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

const thems = {
	all: {
		color: {
			primary: "#05DEB7",
			secondary: "#84D9CA"
		}
	},
	hot: {
		color: {
			primary: "#F05151",
			secondary: "#E39D9D"
		}
	},
	cool: {
		color: {
			primary: "#24B4F1",
			secondary: "#9EE2FF"
		}
	},
	latest: {
		color: {
			primary: "#DA6565",
			secondary: "#D29191"
		}
	},
	my: {
		color: {
			primary: "#F3972B",
			secondary: "#E5BD8D"
		}
	},

	// FIX 上面几项 index 被使用
	defaulz: {
		color: {
			//primary: "#4A4A4A",
			//secondary: "#9C9C9C",
			background: {
				content: "#ffffff",
				background: "#F5F5F5"
			},
			navigationBar: {
				frontColor: "#000000", // #000000 or #ffffff
			}
		}
	},
	dark: {
		color: {
			//primary: "#4A4A4A",
			//secondary: "#9C9C9C",
			background: {
				content: "#4B4B4B",
				background: "#333333"
			},
			navigationBar: {
				frontColor: "#ffffff", // #000000 or #ffffff
			}
		}
	}
}

function appThem() {
	// TODO
	return thems.defaulz
}

const topicTypes = [{
		name: "全部",
		code: "all",
		them: thems.all
	},
	{
		name: "热门",
		code: "hot",
		them: thems.hot
	},
	{
		name: "冷门优质",
		code: "cool",
		them: thems.cool
	},
	{
		name: "最新",
		code: "latest",
		them: thems.latest
	},
	{
		name: "我的",
		code: "my",
		them: thems.my
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
	
	thems,
	appThem,
	
	debug,
	
	topicTypes,
	sortTypes,

	topicList
}
