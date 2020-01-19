const status = {
	loginUser: "",
	userUid: "",
	userId: 0,
	search: {
		refreshType: 0, // 0 no need 1 after add new topic 2 switch topicType 3 keyword search
		topicTypeIndex: 0, // 0 all 1 interest 2 my
		keyWord: '',
		keyWordType: 1, // 1 关键字 2 userId 3 topicId
		sortTypeIndex: 0
	}
}

module.exports = {
	status
}
