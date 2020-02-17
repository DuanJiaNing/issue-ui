// import config from '../config.js'
const thems = {
	defaulz_dark: {
		primary: '#071818',
		secondary: '#EEF2FF',
		
		primaryBackground: '#FFFFFF',
		secondaryBackground: '#F3F6FA',
		
		// icon color
		primaryText: '#071818',
		secondaryText: '#A3ABA8',
		
		agree: '#a5a5a5',
		// heart selected icon color
		disagree: '#071818',
		
		sperLine: '#EEEEEE',
		
		c1: '#071818'
	},
	defaulz: {
		primary: '#2C4EDC',
		secondary: '#EEF2FF',
		
		primaryBackground: '#FFFFFF',
		secondaryBackground: '#F3F6FA',
		
		// icon color
		primaryText: '#071818',
		primarySecondaryText: '#565656',
		secondaryText: '#A3ABA8',
		
		agree: '#2C4EDC',
		// heart selected icon color
		disagree: '#E44559',
		
		sperLine: '#EEEEEE',
		
		c1: '#ff5601'
	},
	defaulz_: {
		primary: '#256CFF',
		secondary: '#E6EFFF',
		
		primaryBackground: '#FFFFFF',
		secondaryBackground: '#F3F6FA',
		
		primaryText: '#000000',
		secondaryText: '#999999',
		
		agree: '#09BB07',
		disagree: '#F61759',
		
		hover: '#eeeeee',
		
		sperLine: '#e3e3e3',
		
		c1: '#ff0000'
	}
}

function them() {
	return thems.defaulz
}

module.exports = {
	them
}
