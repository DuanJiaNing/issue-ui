<script>
	import pageAnimation from './components/page-animation'

	import {
		status
	} from '@/service/StatusService.js'
	import {
		api,
		request
	} from '@/service/ApiService.js'

	export default {
		mixins: [pageAnimation],
		onLaunch: function() {
			console.log('App Launch')
			request({
				url: api.user_login.path,
				method: api.user_login.method,
				data: "test_user",
				success: (res) => {
					status.userUid = res.data.data
					console.log(res)
					console.log(status.userUid)
				},
				fail: function(err) {
					console.log(err)
				}
			})
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
