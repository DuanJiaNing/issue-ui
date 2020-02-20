<template>
	<view style="padding-bottom: 60upx;">
		<view class="main-title-container" :style="{'background-color': them.primaryBackground}">
			<view class="main-title" @longpress="switchUser">
				<view class="main-title-part1" @click="switchTopicType">
					<image @click="gotoAdd" class="main-title-part1-image" mode="aspectFit" src="../../static/arrow-drop-down-line.png" />
					<text style="font-size: 60upx;">
						{{topicType.name}}
					</text>
				</view>
				<view class="main-options">
					<image @click="gotoAdd" class="main-option-image" mode="aspectFit" src="../../static/add-line.png" />
					<image @click="gotoMe" class="main-option-image" mode="aspectFit" src="../../static/user-line.png" />
				</view>
			</view>

			<view class="search-wrapper">
				<search v-on:clearKeyWord="clearKeyWord">
				</search>
			</view>
		</view>

		<!-- 你可能感兴趣 -> 查看全部 -->

		<view>
			<view v-for="(item, index) in data.topics" :key="index">
				<view @click="gotoTopicDetail(item.topicId)" class="topic-item" :style="{'background-color': them.primaryBackground}">
					<view class="topic-item-title-container">
						<view class="topic-item-title" :style="{color: them.primaryText}">
							<text>{{item.title}}</text>
						</view>
						<view class="topic-item-vote-progress-container">
							<view>
								<progress :backgroundColor="them.primaryBackground" :percent="60" :activeColor="them.agree" stroke-width="5" />
								<progress :backgroundColor="them.primaryBackground" :percent="100" :activeColor="them.disagree" stroke-width="5" />
							</view>
						</view>
					</view>
					<view class="topic-item-vote">
						<view class="agree" :style="{color: them.primarySecondaryText}">
							<view class="dot" :style="{'background-color': them.agree}"></view>
							<text>和新疆生产建设兵团报告新增确诊病例2048例，累计治愈出院病例10844例，累计死亡病例1770例，累计报告确诊病例70548例。</text>
						</view>
						<view class="disagree" :style="{color: them.primarySecondaryText}">
							<view class="dot" :style="{'background-color': them.disagree}"></view>
							<text>当日新增治愈出院病例1425例，解除医学观察的密切接触者28179人，重症病例减少628例。</text>
						</view>
					</view>
					<view style="width: 100%;">
						<view class="topic-item-statistic-container">
							<view class="statistic">
								<view class="statistic-item" :style="{color: them.primary, 'background-color': them.secondary}">{{item.interestUserCount}}
									关注</view>
								<view class="statistic-item" :style="{color: them.primary, 'background-color': them.secondary}">{{item.voteCount}}
									次参与</view>
							</view>
							<view class="statistic" :style="{color: them.secondaryText}">
								{{item.insertTime}}
							</view>
						</view>
					</view>
				</view>
				<block v-if="index != data.topics.length - 1">
					<view class="padding-hr" :style="{'background-color': them.sperLine}"></view>
				</block>
			</view>
		</view>
		<view @click="loadTopic">
			<uni-load-more :color="them.secondaryText" :status="uniLoadMore.status" :size="16" :content-text="uniLoadMore.contentText" />
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
		them
	} from '@/service/ThemService.js'
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
				them: them(),
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
		methods: {
			gotoAdd() {
				uni.navigateTo({
					url: '/pages/add/add'
				});
			},
			gotoMe() {
				uni.navigateTo({
					url: '/pages/me/me'
				});
			},
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

						if (this.status.refreshType !== 0) {
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
	.padding-hr {
		height: 1px;
	}

	.statistic-item {
		font-size: 25upx;
		margin-right: 10upx;
		padding: 0 10upx;
	}

	.statistic {
		font-size: 25upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.topic-item-statistic-container {
		margin-top: 30upx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.topic-item-vote .dot {
		padding: 5px;
		transform: scale(0.5);
	}

	.topic-item-vote text {
		font-size: 25upx;
		margin-left: 20upx;

		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.topic-item-vote .agree .dot {
		width: 1px;
		height: 1px;
		border-radius: 50%;
	}

	.topic-item-vote .disagree .dot {
		width: 1px;
		height: 1px;
		border-radius: 50%;
	}

	.topic-item-vote .disagree {
		margin-top: 10upx;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.topic-item-vote .agree {

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.topic-item-vote {
		margin-top: 20upx;
		margin-left: 20upx;
	}

	.topic-item-vote-progress-container view {
		transform: rotate(90deg);
		margin-top: -15upx;
		margin-left: 30upx;
		width: 30upx;
	}

	.topic-item-vote-progress-container {
		/* background-color: #007AFF; */
		width: 10%;
		height: 100upx;
	}

	.topic-item-title-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		min-height: 100upx;
		width: 100%;
	}

	.topic-item-title {
		width: 90%;
	}

	.topic-list-bg {
		position: fixed;
		width: 82%;
		height: 100%;
		margin-left: 6%;
		margin-right: 12%;
		margin-top: 100upx;
	}

	.topic-item {
		margin-top: 30upx;
		padding: 20upx 30upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}

	.main-title-container {
		padding: 30upx;
		padding-bottom: 60upx;
	}

	.main-option-image {
		width: 40upx;
		height: 100%;
		padding: 20upx;
		margin-right: 10upx;
	}

	.main-options {
		width: 50%;
		height: 100%;

		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	
	.main-title-part1-image {
		width: 50upx;
		height: 50upx;
		/* background-color: #007AFF; */
	}

	.main-title-part1 {
		width: 50%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.main-title {
		height: 100upx;
		line-height: 100upx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.search-wrapper {
		margin-top: 20upx;
	}
</style>
