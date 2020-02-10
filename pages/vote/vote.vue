<template>
	<view>
		<limited-text-textarea ref="voteComment" style="margin-top: 30upx;" @valueChanged="commentChanged" :config="commentInputConfig"></limited-text-textarea>
		<view class="btn-container content">
			<view>
				<button @click="addVoteComment" class="save-btn colorful-stripe" size="mini" hover-class="save-btn-hover">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import limitedTextTextarea from '@/components/limited-text-input/limited-text-textarea.vue'

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
			limitedTextTextarea
		},
		data() {
			return {
				vote: 0,
				voteComment: '',
				commentInputConfig: {
					maxlength: 100,
					placeholder: "请输入投票说明"
				}
			}
		},
		onLoad(option) {
			this.vote = option.vote
		},
		methods: {
			addVoteComment() {
				if (this.voteComment.length === 0) {
					toolsService.showErrorToast('请输入投票说明')
					return
				}
				
				request({
					url: api.add_comment.path,
					method: api.add_comment.method,
					data: {
						content: this.voteComment,
						topicId: status.currentTopicId,
						vote: this.vote
					},
					success: (res) => {
						if (res.data.code !== 0) {
							toolsService.showErrorToast('保存失败: ' + res.data.msg)
							return
						}
						this.$refs.voteComment.clearValue()
						status.topic_refreshType = 1
						toolsService.showSuccessToast('保存成功')
						uni.navigateBack({
							delta: 1
						})
					},
					fail: function(err) {
						toolsService.showServerUnavlibleToast()
					}
				})
			},
			commentChanged: function(val) {
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
