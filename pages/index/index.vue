<template>
	<view class="content">
		<topic-type class="topic-type" :topicType="types[status.topicTypeIndex]"></topic-type>

		<view class="search-wrapper">
			<search class="search" :sortName="sortTypes[status.search.sortTypeIndex].name" :searchKeyWord="status.search.keyWorld"
			 @showSortOption="showSortOption" :sortShow="types[status.topicTypeIndex].code === 'all'" @clearSearchKeyWord="clearSearchKeyWord">
			</search>
		</view>
		<view class="topic-list">
			<view v-for="(item, index) in data.topics.list" :key="index" class="topic-list-item" hover-class="topic-list-item-hover">
				<topic-item :item="item"></topic-item>
			</view>
			<uni-load-more :status="uniLoadMore.status" :size="16" :content-text="uniLoadMore.contentText" />
		</view>

	</view>
</template>

<script>
	// 微信直接放在component上的style会增加换行
	import topicType from '@/components/topicType.vue'
	import search from '@/components/search.vue'
	import topicItem from '@/components/topicItem.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	import TopicService from '@/service/TopicService.js'
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
				status: {
					topicTypeIndex: 0,
					search: {
						keyWorld: "搜索",
						sortTypeIndex: 0
					}
				}
			}
		},
		computed: {
			types() {
				return TopicService.topicTypes
			},
			sortTypes() {
				return TopicService.sortTypes
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
		onReady() {},
		onUnload() {},
		onLoad(option) {
			if (option.searchKeyWord) {
				this.status.search.keyWorld = option.searchKeyWord
			} else {
				this.status.search.keyWorld = "搜索"
			}

			if (option.sortTypeIndex) {
				this.status.search.sortTypeIndex = option.sortTypeIndex
			} else {
				this.status.search.sortTypeIndex = 0
			}

			if (option.topicTypeIndex) {
				this.status.topicTypeIndex = option.topicTypeIndex
			} else {
				this.status.topicTypeIndex = 0
			}

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
			showComments() {
				// TODO
				console.log("show comments")
				uni.navigateTo({
					url: `/pages/comments/comments`
				});
			},
			clearSearchKeyWord() {
				this.status.search.keyWorld = "搜索"
			},
			showSortOption() {
				let stypeName = new Array()
				TopicService.sortTypes.forEach(st => {
					stypeName.push(st.name)
				})

				uni.showActionSheet({
					title: '请选择排序方式',
					itemList: stypeName,
					success: (e) => {
						this.status.search.sortTypeIndex = e.tapIndex
					}
				})
			},
		}
	}
</script>

<style scoped>
	.search-wrapper {
		margin-top: 20upx;
	}
	
	.content {
		padding-left: 30upx;
		padding-right: 30upx;
	}

	.topic-list-item {
		/* padding: 10upx 0upx; */
		padding-bottom: 10upx;
	}

	.topic-list-item-hover {
		background-color: #eee;
	}

	.topic-list {
		margin-top: 50upx;
		margin-bottom: 50px;
	}
</style>
