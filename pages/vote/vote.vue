<template>
	<view>
		<limited-text-textarea style="margin-top: 30upx;" @valueChanged="topicDesChanged" :config="topicDesConfig"></limited-text-textarea>
		<view class="btn-container content">
			<view>
				<button @click="addTopic" class="save-btn colorful-stripe" size="mini" hover-class="save-btn-hover">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import limitedTextTextarea from '@/components/limited-text-input/limited-text-textarea.vue'

	import toolsService from '@/service/ToolsService.js'
	import {
		api,
		request
	} from '@/service/ApiService.js'
	export default {
		components: {
			limitedTextTextarea
		},
		data() {
			return {
				voteComment: '',
				topicDesConfig: {
					maxlength: 100,
					placeholder: "请输入投票说明"
				}
			}
		},
		methods: {
			addTopic() {
				if (this.voteComment.length === 0) {
					toolsService.showErrorToast('请输入投票说明')
					return
				}
				
				request({
					url: api.add_topic.path,
					method: api.add_topic.method,
					data: {
						title: this.newTopicTitle,
						notes: this.newTopicNotes
					},
					success: (res) => {
						if (res.data.code !== 0) {
							toolsService.showErrorToast('保存失败: ' + res.data.msg)
							return
						}
						this.$refs.topicTitle.clearValue()
						if (this.$refs.topicDes !== undefined) {
							this.$refs.topicDes.clearValue()
						}
						this.loadAddTopicHistory()
						status.search.refresh = 1
						toolsService.showSuccessToast('保存成功')
					},
					fail: function(err) {
						toolsService.showServerUnavlibleToast()
					}
				})
			},
			topicDesChanged: function(val) {
				this.voteComment = val
				console.log(val)
			}
		}
	}
</script>

<style>
	.btn-container {
		margin-top: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.save-btn {
		color: #ffffff;
	}

	.save-btn-hover {
		opacity: 0.5;
	}
</style>
