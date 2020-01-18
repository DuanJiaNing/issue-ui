<template>
	<view>
		<view class="content" @click="switchTopicType">
			<topic-type class="topic-type" :topicType="topicType"></topic-type>
		</view>

		<view class="search-wrapper content">
			<search class="search" v-on:clearKeyWord="clearKeyWord">
			</search>
		</view>
		<view class="topic-list">
			<view v-for="(item, index) in data.topics" :key="index" class="topic-list-item" hover-class="topic-list-item-hover">
				<topic-item :item="item"></topic-item>
				<block v-if="index < data.topics.length - 1">
					<view class="hr"></view>
				</block>
				<block v-else>
					<view style="height: 30upx;"></view>
				</block>
			</view>
			<view @click="loadTopic">
				<uni-load-more :status="uniLoadMore.status" :size="16" :content-text="uniLoadMore.contentText" />
			</view>
		</view>

	</view>
</template>

<script>
	// 微信直接放在component上的style会增加换行
	import topicType from '@/components/topic-type.vue'
	import search from '@/components/search.vue'
	import topicItem from '@/components/topic-item.vue'

	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	import toolsService from '@/service/ToolsService.js'
	import {
		topicTypes
	} from '@/service/TopicService.js'
	import {
		status
	} from '@/service/StatusService.js'
	import {
		api,
		request
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
				pullDownRefresh: false,
				uniLoadMore: {
					pageNum: 0,
					totalPage: -1,
					status: 'more',
					contentText: {
						contentdown: '加载更多',
						contentrefresh: '加载中',
						contentnomore: '到底啦'
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
				return this.topicTypes[this.status.search.topicTypeIndex]
			}
		},
		onPullDownRefresh() {
			this.refresh(true)
		},
		onReachBottom() {
			this.loadTopic();
		},
		onShow() {
			if (this.status.search.refresh) {
				this.refresh(true)
			}
		},
		onLoad(option) {
			this.loadTopic();
		},
		methods: {
			clearKeyWord() {
				this.refresh(true)
			},
			refresh(pullDown) {
				if (pullDown) {
					this.pullDownRefresh = true
				}
				this.uniLoadMore.pageNum = 0
				this.loadTopic();
			},
			loadTopic() {
				if (this.uniLoadMore.pageNum === this.uniLoadMore.totalPage) {
					this.uniLoadMore.status = 'noMore'
					return
				} else {
					this.uniLoadMore.status = 'loading'
				}
				request({
					url: api.topic_list.path,
					data: {
						pageNum: this.uniLoadMore.pageNum++,
						pageSize: 4,
						keyWord: this.status.search.keyWord,
						keyWordType: this.status.search.keyWordType
					},
					method: api.topic_list.method,
					success: (res) => {
						if (res.data.code !== 200) {
							toolsService.showErrorToast('加载失败: ' + res.data.msg)
							return
						}
						if (this.pullDownRefresh) {
							this.data.topics = []
							uni.stopPullDownRefresh()
							this.pullDownRefresh = false
						}
						if (res.data.data.list !== undefined) {
							this.uniLoadMore.totalPage = res.data.data.pages
							res.data.data.list.forEach(e => {
								var ti = toolsService.parseByFormat('yyyy-MM-dd hh:mm:ss', e.insertTime)
								e.insertTime = toolsService.formatDate(ti, 'yy/MM/dd hh:mm')
								this.data.topics.push(e);
							});
							this.uniLoadMore.status = 'more'
						} else {
							this.uniLoadMore.status = 'noMore'
						}

					},
					fail: function(err) {
						console.log(err)
						toolsService.showServerUnavlibleToast()
						if (this.pullDownRefresh) {
							uni.stopPullDownRefresh()
							this.pullDownRefresh = false
						}
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
