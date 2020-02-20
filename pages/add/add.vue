<template>
	<view style="padding-bottom: 100upx;">
		<view class="content input-container" :style="{'background-color': them.primaryBackground}">
			<limited-text-input ref="topicTitle" @valueChanged="topicTitleChanged" :config="topicTitleConfig"></limited-text-input>
			<view class="desc-input-container">
				<block v-if="desInputDisable">
					<view @click="hideDescInput" class="content" :style="{color: them.secondaryText}">
						+ 对话题进行说明（可选）
					</view>
				</block>
				<block v-else>
					<limited-text-textarea ref="topicDes" @valueChanged="topicDesChanged" :config="topicDesConfig"></limited-text-textarea>
				</block>
			</view>
			<view class="btn-container content">
				<view>
					<button @click="addTopic" class="save-btn colorful-stripe" size="mini" hover-class="save-btn-hover">保存</button>
				</view>
			</view>
		</view>
		<block v-if="data.addTopicHistory.length > 0">
			<view class="add-history-container">
				<view :style="{color: them.primarySecondaryText}" class="content">
					<view>添加历史</view>
				</view>
				<view style="margin-top: 20upx;">
					<view v-for="(item, index) in data.addTopicHistory" :key="index">
						<view :style="{'background-color': them.primaryBackground}" @click="gotoTopicDetail(item.id)" class="content add-topic-history-list-item">
							<view class="time" :style="{color: them.secondaryText, 'border-right-color': them.sperLine}">
								{{item.insertTime}}
							</view>
							<view class="title" :style="{color: them.primaryText}">
								{{item.title}}
							</view>
						</view>
						<block v-if="index != data.addTopicHistory.length - 1">
							<view class="padding-hr" :style="{'background-color': them.sperLine}"></view>
						</block>
					</view>
				</view>
			</view>
		</block>

		<view class="content add-topic-history-tip-container" :style="{color: them.primarySecondaryText}">
			<block v-if="addTopicHistory.totalNum > addTopicHistory.showNum">
				<view>仅显示最近添加的{{addTopicHistory.showNum}}条(共{{addTopicHistory.totalNum}}条)，</view>
			</block>
			<block v-if="addTopicHistory.totalNum > 0">
				<view @click="showMyTopic" class="show-all-my-topic" hover-class="show-all-my-topic-hover">查看所有 ></view>
			</block>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	import limitedTextInput from '@/components/limited-text-input/limited-text-input.vue'
	import limitedTextTextarea from '@/components/limited-text-input/limited-text-textarea.vue'

	import topicService from '@/service/TopicService.js'
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
			limitedTextInput,
			limitedTextTextarea,
			uniIcons
		},
		onShow() {
			this.loadAddTopicHistory();
		},
		data() {
			return {
				them: them(),
				newTopicTitle: "",
				newTopicNotes: "",
				desInputDisable: true,
				addTopicHistory: {
					showNum: 8,
					totalNum: -1,
				},
				topicTitleConfig: {
					maxlength: topicService.config.maxlength,
					placeholder: "请输入标题"
				},
				topicDesConfig: {
					maxlength: topicService.config.maxDeslength,
					placeholder: "话题说明（可选）"
				},
				data: {
					addTopicHistory: []
				}
			}
		},
		methods: {
			gotoTopicDetail(topicId) {
				status.currentTopicId = topicId
				uni.navigateTo({
					url: '/pages/topic/topic'
				});
			},
			showMyTopic() {
				status.topicTypeIndex = 2
				status.refreshType = 2
				uni.navigateBack({
					delta: 1
				})
			},
			addTopic() {
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
						status.refreshType = 1
						toolsService.showSuccessToast('保存成功')
					},
					fail: function(err) {
						toolsService.showServerUnavlibleToast()
					}
				})
			},
			loadAddTopicHistory() {
				request({
					url: api.add_topic_history.path,
					data: {
						pageNum: 1,
						pageSize: this.addTopicHistory.showNum
					},
					method: api.add_topic_history.method,
					success: (res) => {
						if (res.data.code !== 0) {
							toolsService.showErrorToast('加载添加历史失败: ' + res.data.msg)
							return
						}
						this.addTopicHistory.totalNum = res.data.data.total
						this.data.addTopicHistory = []
						for (var v of res.data.data.list) {
							var ti = toolsService.parseByFormat('yyyy-MM-dd hh:mm:ss', v.insertTime)
							this.data.addTopicHistory.push({
								insertTime: toolsService.formatDate(ti, 'MM/dd hh:mm'),
								title: v.title,
								id: v.id
							})
						}
					},
					fail: function(err) {
						console.log(err)
						toolsService.showServerUnavlibleToast()
					}
				})
			},
			hideDescInput: function() {
				this.desInputDisable = false
			},
			topicTitleChanged: function(val) {
				this.newTopicTitle = val
				console.log(val)
			},
			topicDesChanged: function(val) {
				this.newTopicNotes = val
				console.log(val)
			}
		}
	}
</script>

<style>
	.time {
		border-style: solid;
		border-width: 0 1px 0 0;
		padding-right: 10upx;

		font-size: 20upx;
		/* width: 30%; */
		text-align: center;
		vertical-align: middle;
		min-width: 140upx;

		overflow: hidden;
		text-overflow: ellipsis;
		-ms-text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title {
		overflow: hidden;
		text-overflow: ellipsis;
		-ms-text-overflow: ellipsis;
		white-space: nowrap;

		/* width: 70%; */
		font-size: 25upx;
		margin-left: 30upx;
	}

	.show-all-my-topic-hover {
		background-color: #999999;
		color: #FFFFFF;
	}

	.show-all-my-topic {
		height: 45upx;
		line-height: 45upx;

		padding: 0px 8px;
		border-width: 1px;
		border-radius: 10px;
		border-style: solid;
		font-size: 25upx;
	}

	.add-topic-history-tip-container {
		margin-top: 30upx;
		display: flex;
		justify-content: space-between;
	}

	.line {
		margin-left: 30upx;
		margin-right: 30upx;
	}

	.add-topic-history-list-item {
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 25upx 30upx;
	}

	.input-container {
		padding-top: 30upx;
		padding-bottom: 20upx;
	}

	.desc-input-container {
		margin-top: 10upx;
	}

	.btn-container {
		margin-top: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.save-btn {
		/* border-radius: 10upx; */
		color: #ffffff;
	}

	.save-btn-hover {
		opacity: 0.5;
	}

	.padding-hr {
		height: 1px;
		margin-left: 90upx;
		margin-right: 30upx;
	}

	.add-history-container {
		margin-top: 60upx;
	}
</style>
