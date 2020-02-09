<template>
	<view>
		<!-- #ifdef MP -->
		<uni-fab ref="fab" :pattern="uniFab.pattern" :content="uniFab.content" :horizontal="uniFab.horizontal" :vertical="uniFab.vertical"
		 :direction="uniFab.direction" @trigger="uniFabTrigger" />
		<!-- #endif -->

		<view class="content topic-type" @click="switchTopicType" @longpress="switchUser">
			<uni-icons type="arrowdown" size="20" color="#ffffff"></uni-icons>
			<text style="color: #ffffff;">
				{{topicType.name}}
			</text>
		</view>

		<view class="search-wrapper content">
			<search v-on:clearKeyWord="clearKeyWord">
			</search>
		</view>

		<view class="topic-list">
			<view class="topic-list-bg colorful-stripe"></view>
			<view class="topics">
				<view v-for="(item, index) in data.topics" :key="index">
					<view @click="gotoTopicDetail(item.topicId)" class="topic-item">
						<topic-item :item="item" :showNotice="false"></topic-item>
						<block v-if="index < data.topics.length - 1">
						</block>
						<block v-else>
							<view style="height: 30upx;"></view>
						</block>
					</view>
				</view>
				<view @click="loadTopic">
					<uni-load-more :status="uniLoadMore.status" :size="16" :content-text="uniLoadMore.contentText" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 微信直接放在component上的style会增加换行
	import search from '@/components/search.vue'
	import topicItem from '@/components/topic-item.vue'

	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue'

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
			search,
			topicItem,
			uniLoadMore,
			uniIcons,
			uniFab
		},
		data() {
			return {
				uniFab: {
					pattern: {
						color: '#7A7E83',
						backgroundColor: '#fff',
						// selectedColor: '#007AFF',
						// buttonColor: '#007AFF'
					},
					direction: 'horizontal',
					horizontal: 'right',
					vertical: 'bottom',
					content: [{
							iconPath: '/static/addto.png',
							selectedIconPath: '/static/addtoFoucs.png',
							text: '新增',
							active: false
						},
						{
							iconPath: '/static/my.png',
							selectedIconPath: '/static/myFoucs.png',
							text: '我的',
							active: false
						}
					]
				},
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
				return this.topicTypes[this.status.topicTypeIndex]
			}
		},
		onPullDownRefresh() {
			this.pullDownRefresh = true
			this.status.search.keyWord = ''
			this.status.search.keyWordType = 1
			
			this.uniLoadMore.pageNum = 0
			this.uniLoadMore.totalPage = -1
			this.loadTopic()
		},
		onReachBottom() {
			this.loadTopic();
		},
		onShow() {
			if (this.status.refreshType !== undefined && this.status.refreshType != 0) {
				if (this.status.refreshType !== 3) {
					this.status.search.keyWord = ''
					this.status.search.keyWordType = 1
				}
				
				this.uniLoadMore.pageNum = 0
				this.uniLoadMore.totalPage = -1
				this.loadTopic()
			}
		},
		onLoad(option) {
			this.loadTopic();
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 1) { // me
				uni.navigateTo({
					url: '/pages/me/me'
				});
				return
			}
			if (e.index === 0) { // add
				uni.navigateTo({
					url: '/pages/add/add'
				});
				return
			}
		},
		methods: {
			gotoTopicDetail(topicId) {
				status.currentTopicId = topicId
				uni.navigateTo({
					url: '/pages/topic/topic'
				});
			},
			uniFabTrigger(e) {
				if (e.index === 1) { // me
					uni.navigateTo({
						url: '/pages/me/me'
					});
					return
				}
				if (e.index === 0) { // add
					uni.navigateTo({
						url: '/pages/add/add'
					});
					return
				}
			},
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
				this.status.refreshType = 3
				
				this.uniLoadMore.pageNum = 0
				this.uniLoadMore.totalPage = -1
				this.loadTopic()
			},
			decideTopicTypeDataUrl() {
				switch (this.status.topicTypeIndex) {
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

						if (this.status.refreshType != 0) {
							this.data.topics = []
							this.status.refreshType = 0
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
	.topic-list-bg {
		position: fixed;
		width: 82%;
		height: 100%;
		margin-left: 6%;
		margin-right: 12%;
		margin-top: 100upx;
	}

	.topic-list {}

	.topics {
		position: absolute;
		width: 82%;
		margin-left: 12%;
		margin-bottom: 12%;
	}

	.topic-item {
		margin-top: 50upx;
	}

	.topic-type {
		margin-top: 30upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 60upx;
	}

	.search-wrapper {
		margin-left: 30upx;
		margin-right: 30upx;
		margin-top: 20upx;
	}
</style>
