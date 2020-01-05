<template>
	<view>
		<limited-text-input @valueChanged="topicTitleChanged" :config="topicTitleConfig"></limited-text-input>
		<view class="desc-input-container">
			<block v-if="desInputDisable">
				<view @click="hideDescInput" class="content" style="color: #999999;">
					<uni-icons type="plusempty" size="20" color="#999999"></uni-icons>对主体进行说明（可选）
				</view>
			</block>
			<block v-else>
				<limited-text-textarea @valueChanged="topicDesChanged" :config="topicDesConfig"></limited-text-textarea>
			</block>
		</view>
		<view class="btn-container content">
			<view>
				<button class="save-btn" hover-class="save-btn-hover">保存</button>
			</view>
		</view>
		<view class="add-history-container">
			<view style="color: #999999;" class="content">
				<view>添加历史</view>
				<hr color="#D4D4D4" size="1px">
			</view>
			<view style="margin-top: 20upx;">
				<view v-for="(item, index) in data.addTopicHistory" :key="index" class="add-topic-history-list-item" hover-class="add-topic-history-list-item-hover">
					<time-title-item :item="item"></time-title-item>
					<block v-if="index < data.addTopicHistory.length - 1">
						<hr class="line" color="#D4D4D4" size="1px">
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	import timeTitleItem from '@/components/list-item/time-title-item.vue'
	import limitedTextInput from '@/components/limited-text-input/limited-text-input.vue'
	import limitedTextTextarea from '@/components/limited-text-input/limited-text-textarea.vue'
	import topicService from '@/service/TopicService.js'

	import {
		api
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
				desInputDisable: true,
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
			loadAddTopicHistory() {
				// TODO
				uni.request({
					url: api.topic.list.path,
					data: {
						pageNum: 1,
						pageSize: 8
					},
					method: api.topic.list.method,
					success: (res) => {
						this.data.addTopicHistory = res.data.data.list
						console.log(res.data.data)
						console.log(res)
					},
					fail: function(err) {
						console.log(err)
					}
				})
			},
			hideDescInput: function() {
				this.desInputDisable = false
			},
			topicTitleChanged: function(val) {
				console.log(val)
			},
			topicDesChanged: function(val) {
				console.log(val)
			}
		}
	}
</script>

<style>
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
		width: 200upx;
	}

	.save-btn-hover {
		color: #ffffff;
		background-color: #058D05;
		margin-top: 30upx;
		width: 200upx;
	}

	.add-history-container {
		margin-top: 30upx;
	}
</style>
