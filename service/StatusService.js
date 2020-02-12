const status = {
	loginUser: "",
	userUid: "",
	userId: 0,
	
	refreshType: 0, // 0 no need 1 after add new topic 2 switch topicType 3 keyword search
	topicTypeIndex: 0, // 0 all 1 interest 2 my
	sortTypeIndex: 0,
	
	topic_refreshType: 0, // 0 no need 1 after new vote 2 after vote comment
	
	search: {
		keyWord: '',
	},
	currentTopicId: 0
}

module.exports = {
	status
}
