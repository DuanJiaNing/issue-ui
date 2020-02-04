<template>
	<view>
		<view class="content" style="margin-top: 30upx;">
			<topic-item :item="topicSummary"></topic-item>
		</view>
	</view>
</template>

<script>
	import topicItem from '@/components/topic-item.vue'

	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	import toolsService from '@/service/ToolsService.js'
	import {
		status
	} from '@/service/StatusService.js'
	import {
		api,
		request
	} from '@/service/ApiService.js'
	export default {
		components: {
			topicItem,
			uniIcons
		},
		data() {
			return {
				status: status,
				topicSummary: {},
			}
		},
		methods: {
			loadTopic() {
				request({
					url: api.topic.path + this.status.currentTopicId,
					method: api.topic.method,
					success: (res) => {
						if (res.data.code !== 0) {
							toolsService.showErrorToast('加载失败: ' + res.data.msg)
							return
						}

						this.topicSummary = res.data.data
					},
					fail: function(err) {
						console.log(err)
						toolsService.showServerUnavlibleToast()
					}
				})
			}
		},
		onShow() {
			this.loadTopic()
		}
	}
</script>

<style>

</style>
