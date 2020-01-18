// import config from '../config.js'
const thems = {
	all: {
		color: {
			primary: "#05DEB7",
			secondary: "#84D9CA"
		}
	},
	interest: {
		color: {
			primary: "#2182ED",
			secondary: "#54B1F7"
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
		case 'interest':
	        return thems.interest.color
		case 'my':
	        return thems.my.color
	     default:
	        return thems.all.color
	} 
}


module.exports = {
	topicColor
}
