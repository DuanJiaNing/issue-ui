<template>
	<view>
		<view class="content" @click="switchTopicType">
			<topic-type class="topic-type" :topicType="topicType"></topic-type>
		</view>

		<view class="search-wrapper content">
			<search class="search">
			</search>
		</view>
		<view class="topic-list">
			<view v-for="(item, index) in data.topics.list" :key="index" class="topic-list-item" hover-class="topic-list-item-hover">
				<topic-item :item="item"></topic-item>
				<block v-if="index < data.topics.list.length - 1">
					<view class="hr"></view>
				</block>
			</view>
			<uni-load-more :status="uniLoadMore.status" :size="16" :content-text="uniLoadMore.contentText" />
		</view>

	</view>
</template>

<script>
	// 微信直接放在component上的style会增加换行
	import topicType from '@/components/topic-type.vue'
	import search from '@/components/search.vue'
	import topicItem from '@/components/topic-item.vue'
	
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	
	import {
		topicTypes
	} from '@/service/TopicService.js'
	import {
		status
	} from '@/service/StatusService.js'
	import {
		api
	} from '@/service/ApiService.js'

	export default {
		components: {
			topicType,
			search,
			topicItem,
			uniLoadMore
		},
		data() {
			return {
				fabPattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				uniLoadMore: {
					status: 'more',
					contentText: {
						contentdown: '上拉加载更多',
						contentrefresh: '加载中',
						contentnomore: '没有更多'
					}
				},
				data: {
					topics: []
				},
				status: status,
				topicTypes: topicTypes,
			}
		},
		computed: {
			topicType() {
				return this.topicTypes[this.status.topicTypeIndex]
			}
		},
		onPullDownRefresh() {
			// TODO
			// uni.stopPullDownRefresh();
			console.log("onPullDownRefresh")

		},
		onReachBottom() {
			// TODO
			console.log("onReachBottom")
		},
		onLoad(option) {
			this.loadTopic();
		},
		methods: {
			loadTopic() {
				uni.request({
					url: api.topic.list.path,
					data: {
						pageNum: 1,
						pageSize: 20
					},
					method: api.topic.list.method,
					success: (res) => {
						this.data.topics = res.data.data
						console.log(res.data.data)
						console.log(res)
					},
					fail: function(err) {
						console.log(err)
					}
				})
			},
			switchTopicType() {
				uni.navigateTo({
					url: `/pages/choiceTopicType/choiceTopicType`
				});
			},
			showComments() {
				// TODO
				uni.navigateTo({
					url: `/pages/comments/comments`
				});
			}
		}
	}
</script>

<style scoped>
	.search-wrapper {
		margin-top: 20upx;
	}

	.topic-list-item {
		background-color: #ffffff;
		padding-left: 40upx;
		padding-right: 45upx;
	}

	.topic-list-item-hover {
		background-color: #F4F5FA;
	}

	.topic-list {
		margin-top: 50upx;
		margin-bottom: 50px;
	}
</style>
