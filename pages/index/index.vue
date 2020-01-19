<template>
	<view>
		<view class="content" @click="switchTopicType" @longpress="switchUser">
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

	import {
		testUser
	} from '../../config.js'
	import toolsService from '@/service/ToolsService.js'
	import {
		topicTypes
	} from '@/service/TopicService.js'
	import {
		status
	} from '@/service/StatusService.js'
	import {
		api,
		request,
		login
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
			this.pullDownRefresh = true
			this.status.search.keyWord = ''
			this.status.search.keyWordType = 1
			this.uniLoadMore.pageNum = 0
			this.loadTopic()
		},
		onReachBottom() {
			this.loadTopic();
		},
		onShow() {
			if (this.status.search.refreshType !== undefined && this.status.search.refreshType != 0) {
				if (this.status.search.refreshType !== 3) {
					this.status.search.keyWord = ''
					this.status.search.keyWordType = 1
				}
				this.uniLoadMore.pageNum = 0
				this.loadTopic()
			}
		},
		onLoad(option) {
			this.loadTopic();
		},
		methods: {
			// TODO 开发专用
			switchUser() {
				uni.showActionSheet({
					title: '请选择测试用户',
					itemList: testUser,
					success: (e) => {
						login(testUser[e.tapIndex])
						uni.startPullDownRefresh()
					}
				})
			},
			clearKeyWord() {
				this.status.search.keyWord = ''
				this.status.search.keyWordType = 1
				this.uniLoadMore.pageNum = 0
				this.status.search.refreshType = 3
				this.loadTopic()
			},
			decideTopicTypeDataUrl() {
				switch (this.status.search.topicTypeIndex) {
					case 0:
						return api.topic_list.path;
					case 1:
						return api.my_interest_topic_list.path;
					case 2:
						return api.my_topic_list.path;
					default:
						return api.topic_list.path;
				}
			},
			loadTopic() {
				if (this.uniLoadMore.pageNum === this.uniLoadMore.totalPage) {
					this.uniLoadMore.status = 'noMore'
					return
				} else {
					this.uniLoadMore.status = 'loading'
				}
				request({
					url: this.decideTopicTypeDataUrl(),
					data: {
						pageNum: ++this.uniLoadMore.pageNum,
						pageSize: 10,
						keyWord: this.status.search.keyWord,
						keyWordType: this.status.search.keyWordType
					},
					method: "GET",
					success: (res) => {
						if (res.data.code !== 0) {
							toolsService.showErrorToast('加载失败: ' + res.data.msg)
							return
						}

						if (this.pullDownRefresh) {
							uni.stopPullDownRefresh()
							this.data.topics = []
							this.pullDownRefresh = false
						}

						if (this.status.search.refreshType != 0) {
							this.data.topics = []
							this.status.search.refreshType = 0
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
