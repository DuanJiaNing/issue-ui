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

const topicTypes = [{
		name: "全部",
		code: "all"
	},
	{
		name: "热门",
		code: "hot"
	},
	{
		name: "冷门优质",
		code: "cool"
	},
	{
		name: "最新",
		code: "latest"
	},
	{
		name: "我的",
		code: "my"
	}
]


module.exports = {
	topicTypes,
	sortTypes
}
