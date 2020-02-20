const sortTypes = [
	{
		name: "最新"
	},
	{
		name: "最多参与"
	},
	{
		name: "最多关注"
	}
]

const topicTypes = [{
		name: "话题",
		code: "all"
	},
	{
		name: "关注",
		code: "interest"
	},
	{
		name: "参与",
		code: "————"
	},
	{
		name: "我的",
		code: "my"
	}
]

const config = {
	maxlength: 40,
	maxDeslength: 130
}


module.exports = {
	topicTypes,
	sortTypes,
	config
}
