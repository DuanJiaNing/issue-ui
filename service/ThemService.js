// import config from '../config.js'
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
	}
}

function topicColor(topicCode) {
	switch(topicCode) {
	     case 'all':
	        return thems.all.color
		case 'hot':
	        return thems.all.hot
		case 'cool':
	        return thems.all.cool
		case 'latest':
	        return thems.all.latest
		case 'my':
	        return thems.all.my
	     default:
	        return thems.all.color
	} 
}


module.exports = {
	topicColor
}
