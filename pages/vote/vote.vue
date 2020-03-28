<template>
	<view>
		<view class="content top-panel" :style="{'background-color': them.primaryBackground}">
			<limited-text-textarea ref="voteComment" @valueChanged="commentChanged" :config="commentInputConfig"></limited-text-textarea>
			<view class="btn-container content">
					<view@click="addVoteComment" class="btn-min" hover-class="btn-hover"
				:style="{color: them.primarySecondaryText,'border-color': them.secondaryText}">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import limitedTextTextarea from '@/components/limited-text-input/limited-text-textarea.vue'

	import toolsService from '@/service/ToolsService.js'
	import {
		them
	} from '@/service/ThemService.js'
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
				them: them(),
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
	.top-panel {
		padding-top: 30upx;
		padding-bottom: 20upx;
	}

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
