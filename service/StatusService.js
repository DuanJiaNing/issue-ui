const status = {
	userUid: "",
	userId: 0,
	search: {
		refresh: false,
		topicTypeIndex: 0, // 0 all 1 interest 2 my
		keyWord: '',
		keyWordType: 1, // 1 关键字 2 userId 3 topicId
		sortTypeIndex: 0
	}
}

module.exports = {
	status
}
