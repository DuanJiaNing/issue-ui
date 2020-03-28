// import config from '../config.js'
const thems = {
	defaulz_dark: {
		primary: '#2C4EDC',
		secondary: '#1e2042',
		
		primaryBackground: '#242424',
		secondaryBackground: '#393939',
		hightlightBackground: '#2a291f',
		
		// icon color
		primaryText: '#5a5a5a',
		primarySecondaryText: '#565656',
		secondaryText: '#434343',
		secondaryBackgroundText: '#6f6f6f',
		
		agree: '#2C4EDC',
		// heart selected icon color
		disagree: '#E44559',
		
		sperLine: '#2f2f2f',
		
		tag: '#ff5601',
		currentDate: '#ffcb9d'
	},
	defaulz_1: {
		primary: '#373A3C',
		secondary: '#ECEEEF',
		
		primaryBackground: '#FFFFFF',
		secondaryBackground: '#F3F6FA',
		hightlightBackground: '#fffae5',
		
		// icon color
		primaryText: '#FF335F',
		primarySecondaryText: '#373A3C',
		secondaryText: '#818A91',
		secondaryBackgroundText: '#565656',
		
		agree: '#2C4EDC',
		// heart selected icon color
		disagree: '#E44559',
		
		sperLine: '#EEEEEE',
		
		tag: '#ff5601',
		currentDate: '#ffcb9d'
	},
	defaulz: {
		// 2次关注,10次参与
		primary: '#2C4EDC',
		secondary: '#EEF2FF',
		
		// 内容背景
		primaryBackground: '#FFFFFF',
		// 底层背景
		secondaryBackground: '#F3F6FA',
		// 内容选中背景
		hightlightBackground: '#fffae5',
		
		// 标题,主内容
		primaryText: '#071818',
		// 副标题,副内容
		primarySecondaryText: '#565656',
		// 内容日期
		secondaryText: '#A3ABA8',
		// 底层背景上文字
		secondaryBackgroundText: '#565656',
		
		agree: '#2C4EDC',
		disagree: '#E44559',
		
		sperLine: '#EEEEEE',
		
		// 我的 vote
		tag: '#ff5601',
		// 当前日期
		currentDate: '#ffcb9d'
	}
}

function them() {
	return thems.defaulz_1
}

module.exports = {
	them
}
