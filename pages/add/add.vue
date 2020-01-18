<template>
	<view>
		<limited-text-input ref="topicTitle" @valueChanged="topicTitleChanged" :config="topicTitleConfig"></limited-text-input>
		<view class="desc-input-container">
			<block v-if="desInputDisable">
				<view @click="hideDescInput" class="content" style="color: #999999;">
					<uni-icons type="plusempty" size="20" color="#999999"></uni-icons>对主体进行说明（可选）
				</view>
			</block>
			<block v-else>
				<limited-text-textarea ref="topicDes" @valueChanged="topicDesChanged" :config="topicDesConfig"></limited-text-textarea>
			</block>
		</view>
		<view class="btn-container content">
			<view>
				<button @click="addTopic" class="save-btn" size="mini" hover-class="save-btn-hover">保存</button>
			</view>
		</view>
		<view class="add-history-container">
			<view style="color: #999999;" class="content">
				<view>添加历史</view>
			</view>
			<view style="margin-top: 20upx;">
				<view v-for="(item, index) in data.addTopicHistory" :key="index" class="add-topic-history-list-item" hover-class="add-topic-history-list-item-hover">
					<time-title-item :item="item"></time-title-item>
					<block v-if="index < data.addTopicHistory.length - 1">
						<view class="hr"></view>
					</block>
				</view>
			</view>
		</view>

		<block v-if="addTopicHistory.totalNum > addTopicHistory.showNum">
			<view class="content add-topic-history-tip-container">
				<view>仅显示最近添加的{{addTopicHistory.showNum}}条(共{{addTopicHistory.totalNum}}条)，</view>
				<navigator url="/pages/index/index" open-type="switchTab" hover-class="other-navigator-hover">
					<view class="show-all-my-topic" hover-class="show-all-my-topic-hover">查看所有 ></view>
				</navigator>
			</view>
		</block>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	import timeTitleItem from '@/components/list-item/time-title-item.vue'
	import limitedTextInput from '@/components/limited-text-input/limited-text-input.vue'
	import limitedTextTextarea from '@/components/limited-text-input/limited-text-textarea.vue'

	import topicService from '@/service/TopicService.js'
	import toolsService from '@/service/ToolsService.js'
	import {
		api,
		request
	} from '@/service/ApiService.js'
	export default {
		components: {
			limitedTextInput,
			limitedTextTextarea,
			uniIcons,
			timeTitleItem
		},
		onLoad(option) {
			this.loadAddTopicHistory();
		},
		data() {
			return {
				newTopicTitle: "",
				newTopicNotes: "",
				desInputDisable: true,
				addTopicHistory: {
					showNum: 8,
					totalNum: -1,
				},
				topicTitleConfig: {
					maxlength: topicService.config.maxlength,
					placeholder: "请输入主题"
				},
				topicDesConfig: {
					maxlength: topicService.config.maxDeslength,
					placeholder: "对主题进行说明（可选）"
				},
				data: {
					addTopicHistory: []
				}
			}
		},
		methods: {
			addTopic() {
				request({
					url: api.add_topic.path,
					method: api.add_topic.method,
					data: {
						title: this.newTopicTitle,
						notes: this.newTopicNotes
					},
					success: (res) => {
						if (res.data.code !== 200) {
							toolsService.showErrorToast('保存失败: ' + res.data.msg)
							return
						}
						this.$refs.topicTitle.clearValue()
						if (this.$refs.topicDes !== undefined) {
							this.$refs.topicDes.clearValue()
						}
						this.loadAddTopicHistory()
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
						if (res.data.code !== 200) {
							toolsService.showErrorToast('加载添加历史失败: ' + res.data.msg)
							return
						}
						this.addTopicHistory.totalNum = res.data.data.total
						this.data.addTopicHistory = []
						for (var v of res.data.data.list) {
							var ti = toolsService.parseByFormat('yyyy-MM-dd hh:mm:ss', v.insertTime)
							this.data.addTopicHistory.push({
								insertTime: toolsService.formatDate(ti, 'MM/dd hh:mm'),
								title: v.title
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
	.show-all-my-topic-hover {
		background-color: #999999;
		color: #FFFFFF;
	}

	.show-all-my-topic {
		padding: 0px 8px;
		border-width: 1px;
		border-radius: 10px;
		border-color: #999999;
		border-style: solid;
		font-size: 12upx;
	}

	.add-topic-history-tip-container {
		margin-top: 30upx;
		color: #999999;
		display: flex;
		justify-content: space-between;
	}

	.line {
		margin-left: 30upx;
		margin-right: 30upx;
	}

	.add-topic-history-list-item {
		background-color: #ffffff;
	}

	.add-topic-history-list-item-hover {
		background-color: #f1f1f1;
	}

	.desc-input-container {
		margin-top: 30upx;
	}

	.btn-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.save-btn {
		color: #ffffff;
		background-color: #09BB07;
		margin-top: 30upx;
		width: 150upx;
	}

	.save-btn-hover {
		background-color: #058D05;
	}

	.add-history-container {
		margin-top: 30upx;
	}
</style>
