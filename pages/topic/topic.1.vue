<template>
	<view style="padding-bottom: 100upx;">
		<block v-if="commentInfoShow">
			<view class="selected-comment-info-container" :style="{
		'padding-bottom': isIphoneX() ? '25px' : '0'}">
				<view class="selected-comment-info">
					<view style="display: flex;flex-direction: row;align-items: center;">
						<text class="selected-comment-id" :style="{
							color: selectedComment.vote === 1 ? '#09BB07' : (selectedComment.vote === -1 ? '#EC559E' : '#999999')}">{{selectedComment.commentId}}</text>
						<view class="selected-comment-subinfo">
							<text class="selected-comment-insertTime">
								<block v-if="selectedComment.userId === status.userId">
									我
								</block>
								发表于 {{selectedComment.insertTime}}
							</text>
							<view class="selected-comment-vote">
								{{selectedComment.agreeVoteCount}} 赞同 {{selectedComment.disagreeVoteCount}} 反对
								<block v-if="selectedComment.myCommentVote !== 0">
									{{selectedComment.myCommentVote === -1 ? '(已投反对票)' : '(已投赞同票)'}}
								</block>
							</view>
						</view>
					</view>

					<view style="display: flex;flex-direction: row;align-items: center;">
						<block v-if="selectedComment.myCommentVote === 0">
							<image @click="doVoteComment(1)" class="select-comment-vote-btn-image" mode="aspectFit" src="../../static/check-line.png" />
							<image @click="doVoteComment(-1)" class="select-comment-vote-btn-image" mode="aspectFit" src="../../static/close-line.png" />
						</block>
						<image @click="hideSelectCommentInfo" class="select-comment-vote-btn-image" mode="aspectFit" src="../../static/arrow-down-s-line.png" />
					</view>
				</view>
			</view>
		</block>

		<view class="content" style="margin-top: 30upx;">
			<view class="card-title">
				<view class="line"></view>
				<text>主题</text>
			</view>
			<view class="topic-summary-container">
				<view class="topic-summary-title">
					<text>{{topicSummary.title}}</text>
				</view>
				<view style="width: 100%;">
					<view class="topic-summary-statistic-container">
						<view class="statistic">
							<text>{{topicSummary.interestUserCount}} 关注</text>
							<text>{{topicSummary.voteCount}} 次参与</text>
						</view>
						<view class="statistic">
							<text>{{topicSummary.insertTime}}</text>
						</view>
					</view>
				</view>
				<block v-if="topicSummary.notes !== undefined">
					<view class="topic-notes">
						{{topicSummary.notes}}
					</view>
				</block>
				<block v-else></block>

				<view style="width: 100%;">
					<view class="topic-summary-vote-container">
						<image @click="addVote(1)" class="topic-summary-vote-item" mode="aspectFit" src="../../static/thumb-up-line.png" />
						<view class="topic-summary-vote-item-line"></view>
						<image @click="addVote(-1)" class="topic-summary-vote-item" mode="aspectFit" src="../../static/thumb-down-line.png" />
						<view class="topic-summary-vote-item-line"></view>
						<image @click="addToInterest" class="topic-summary-vote-item" mode="aspectFit" src="../../static/heart-add-line.png" />
					</view>
				</view>
			</view>
		</view>

		<view class="content" style="margin-top: 60upx;">
			<view class="card-title">
				<view class="line"></view>
				<text>投票</text>
			</view>
			<view class="comments-container">
				<block v-if="comments.length === 0">
					<view class="content no-comment-tip">
						还没有评论，快投出宝贵的一票吧
					</view>
				</block>
				<block v-else>
					<view class="content comments-stats-container">
						<view>
							<text style="color: #09BB07; margin-right: 10upx;">23</text>票赞同 <text style="color: #EC559E;margin-left: 20upx;margin-right: 10upx;">40.5</text>票反对
						</view>
						<image class="vote-calc-tip" mode="aspectFit" src="../../static/question-fill.png" />
					</view>
					<view class="comments-vote-bar">
						<progress style="transform: rotateY(180deg)" :percent="agree" activeColor="#09BB07" stroke-width="3" />
						<progress :percent="disagree" activeColor="#EC559E" stroke-width="3" />
					</view>
					<view>
						<view v-for="(item, index) in comments" :key="index">
							<view @click="selectComment(index)">
								<view :style="{
									color: item.selected ? '#ffffff' : '#000000',
									'background-color': item.selected ? '#3a3a3a' : (item.userId === status.userId ? '#fff7d3' : '#ffffff')
								}"
								 class="content comment-container" hover-class="hover-for-white-bg">
									<text class="comment-id" :style="{color: item.vote === 1 ? '#09BB07' : (item.vote === -1 ? '#EC559E' : '#999999')}">{{item.commentId}}</text>
									<text class="comment-content" :style="{
										'-webkit-line-clamp': item.selected ? 20 : 2, 
										'font-size': item.selected ? '1.2em' : '0.9em'}">{{item.content}}</text>
								</view>
							</view>
							<block v-if="index != comments.length - 1">
								<view class="padding-hr"></view>
							</block>
						</view>
						<view @click="loadComments">
							<uni-load-more :color="'#999999'" :status="uniLoadMore.status" :size="16" :content-text="uniLoadMore.contentText" />
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	import toolsService from '@/service/ToolsService.js'
	import {
		status
	} from '@/service/StatusService.js'
	import {
		api,
		request
	} from '@/service/ApiService.js'
	export default {
		components: {
			uniIcons,
			uniLoadMore
		},
		data() {
			return {
				status: status,
				topicSummary: {},
				commentInfoShow: false,
				selectedComment: {},
				selectedCommentIndex: -1,
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
				comments: []
			}
		},
		computed: {
			voteDisagree() {
				return 60 > 20
			},
			agree() {
				return 60
			},
			disagree() {
				return 20
			}
		},
		onReachBottom() {
			this.loadComments();
		},
		onPullDownRefresh() {
			this.pullDownRefresh = true

			this.uniLoadMore.pageNum = 0
			this.uniLoadMore.totalPage = -1
			this.loadComments()
		},
		methods: {
			addToInterest() {
				toolsService.showSuccessToast('add to int...')
			},
			addVote(vote) {
				uni.navigateTo({
					url: '/pages/vote/vote?vote=' + vote
				});
			},
			doVoteComment(vote) {
				request({
					url: api.vote.path,
					method: api.vote.method,
					data: {
						vote: vote,
						commentId: this.selectedComment.commentId
					},
					success: (res) => {
						if (res.data.code !== 0) {
							toolsService.showErrorToast('投票失败: ' + res.data.msg)
							return
						}

						this.uniLoadMore.pageNum = 0
						this.uniLoadMore.totalPage = -1
						status.topic_refreshType = 2

						this.loadTopic()
						this.loadComments()
					},
					fail: function(err) {
						toolsService.showServerUnavlibleToast()
					}
				})
			},
			isIphoneX() {
				return toolsService.isIphoneX()
			},
			hideSelectCommentInfo() {
				this.comments[this.selectedCommentIndex].selected = false
				this.commentInfoShow = false
			},
			selectComment(index) {
				if (this.commentInfoShow && index === this.selectedCommentIndex) {
					this.commentInfoShow = false
					this.comments[index].selected = false
					return
				} else {
					this.comments.forEach(c => {
						c.selected = false
					});
					this.comments[index].selected = true
					this.selectedCommentIndex = index
					this.commentInfoShow = true
					this.selectedComment = this.comments[index]
				}
			},
			loadComments() {
				if (this.uniLoadMore.pageNum === this.uniLoadMore.totalPage) {
					this.uniLoadMore.status = 'noMore'
					return
				} else {
					this.uniLoadMore.status = 'loading'
				}
				request({
					url: api.comment_list.path,
					data: {
						pageNum: ++this.uniLoadMore.pageNum,
						pageSize: 10,
						topicId: status.currentTopicId
					},
					method: api.comment_list.method,
					success: (res) => {
						if (res.data.code !== 0) {
							toolsService.showErrorToast('加载失败: ' + res.data.msg)
							return
						}

						if (this.pullDownRefresh) {
							uni.stopPullDownRefresh()
							this.comments = []
							this.pullDownRefresh = false
						}

						if (status.topic_refreshType !== 0) {
							this.comments = []
						}

						if (res.data.data.list !== undefined) {
							this.uniLoadMore.totalPage = res.data.data.pages
							res.data.data.list.forEach(e => {
								var ti = toolsService.parseByFormat('yyyy-MM-dd hh:mm:ss', e.insertTime)
								e.insertTime = toolsService.formatDate(ti, 'yy/MM/dd hh:mm')
								this.comments.push(e);
							});
							this.uniLoadMore.status = 'more'
						} else {
							this.uniLoadMore.status = 'noMore'
						}

						if (status.topic_refreshType !== 0) {
							if (status.topic_refreshType === 2) {
								this.commentInfoShow = false
								var ix = this.selectedCommentIndex
								this.selectedCommentIndex = -1
								this.selectComment(ix)
							}
							status.topic_refreshType = 0
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
			loadTopic() {
				request({
					url: api.topic.path + this.status.currentTopicId,
					method: api.topic.method,
					success: (res) => {
						if (res.data.code !== 0) {
							toolsService.showErrorToast('加载失败: ' + res.data.msg)
							return
						}

						this.topicSummary = res.data.data
						var ti = toolsService.parseByFormat('yyyy-MM-dd hh:mm:ss', this.topicSummary.insertTime)
						this.topicSummary.insertTime = toolsService.formatDate(ti, 'yy/MM/dd hh:mm')
					},
					fail: function(err) {
						console.log(err)
						toolsService.showServerUnavlibleToast()
					}
				})
			}
		},
		onLoad() {
			this.loadTopic()
			this.loadComments()
		},
		onShow() {
			if (status.topic_refreshType !== undefined && status.topic_refreshType !== 0) {
				this.uniLoadMore.pageNum = 0
				this.uniLoadMore.totalPage = -1

				this.loadTopic()
				this.loadComments()
			}
		}
	}
</script>

<style>
	.vote-calc-tip {
		width: 40upx;
		height: 40upx;
	}

	.topic-notes {
		border-top-style: solid;
		border-top-color: #e3e3e3;
		border-top-width: 1px;

		padding: 30upx;
		font-size: 26upx;
	}

	.statistic text {
		margin-right: 10upx;
	}

	.statistic {
		font-size: 25upx;

		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.topic-summary-container {
		background-color: white;
		border-radius: 10px;
		margin-top: 20upx;
		padding-bottom: 10upx;
		box-shadow: 0 0 40px rgba(118, 118, 118, 7);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}

	.topic-summary-vote-item-line {
		height: 30upx;
		width: 1px;
		background-color: #999999;
	}

	.topic-summary-vote-item {
		width: 33%;
		height: 38upx;
		padding: 20upx;
	}

	.topic-summary-vote-container {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.topic-summary-statistic-container {
		color: #999999;
		height: 30upx;
		height: 30upx;
		padding: 0 30upx;
		padding-bottom: 20upx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.topic-summary-title {
		min-height: 125upx;
		padding: 30upx;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-title .line {
		/* width: 2px; */
		border-radius: 2px;
		background-color: #ffffff;
		height: 30upx;
		margin-right: 10upx;
	}

	.card-title {
		color: #ffffff;
		font-size: 40upx;
		height: 60upx;

		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.selected-comment-info {
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.selected-comment-info-container {
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 120upx;
		width: 94%;
		padding-left: 3%;
		padding-right: 3%;
		/* padding-top: 10upx; */
		/* padding-top: 10upx; */
		box-shadow: 0 0 20px rgba(163, 163, 163, 7);

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.comment-content {
		font-size: 26upx;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.selected-comment-vote {
		font-size: 18upx;
		color: #999999;
	}

	.select-comment-vote-btn-image {
		width: 40upx;
		height: 40upx;
		padding: 20upx;
	}

	.selected-comment-insertTime {
		font-size: 27upx;
	}

	.selected-comment-subinfo {
		display: flex;
		flex-direction: column;
		margin-left: 30upx;
	}

	.selected-comment-id {
		font-size: 40upx;
	}

	.comment-id {
		font-size: 35upx;
		margin-right: 20upx;
	}

	.comment-time {
		color: #999999;
		font-size: 15upx;
	}

	.comment-part-2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.comment-container {
		padding-top: 25upx;
		padding-bottom: 25upx;

		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: baseline;
	}

	.comments-vote-bar {
		margin-bottom: 20upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.comments-stats-container {
		display: flex;
		justify-content: space-between;
	}

	.topic-notice {
		background-color: #363636;
	}

	.no-comment-tip {
		width: 100%;
		text-align: center;
		color: #999999;
	}

	.comments-container {
		background-color: #ffffff;

		border-radius: 8px;
		padding-top: 30upx;
		padding-bottom: 60upx;
		margin-bottom: 100upx;
		margin-top: 20upx;
		box-shadow: 0 0 40px rgba(118, 118, 118, 7);
	}
</style>
