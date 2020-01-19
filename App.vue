<script>
	import pageAnimation from './components/page-animation'

	import {
		login
	} from '@/service/ApiService.js'
	import config from 'config.js'

	export default {
		mixins: [pageAnimation],
		onLaunch: function() {
			console.log('App Launch')
			login(config.testUser[0])
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/common.css");
	@import url("common/uni.css");
</style>
