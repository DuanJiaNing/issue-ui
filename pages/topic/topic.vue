<template>
	<view style="padding-bottom: 100upx;">
		<block v-if="commentInfoShow">
			<view class="selected-comment-info-container" :style="{
		'padding-bottom': isIphoneX() ? '25px' : '0',
		'background-color': them.primaryBackground}">
				<view class="selected-comment-info">
					<view style="display: flex;flex-direction: row;align-items: center;">
						<text class="selected-comment-id" :style="{
							color: selectedComment.vote === 1 ? them.agree : (selectedComment.vote === -1 ? them.disagree : them.secondaryText)}">{{selectedComment.commentId}}</text>
						<view class="selected-comment-subinfo">
							<text class="selected-comment-insertTime" :style="{color: them.primaryText}">
								<block v-if="selectedComment.userId === status.userId">
									我
								</block>
								发表于 {{selectedComment.insertTime}}
							</text>
							<view class="selected-comment-vote" :style="{color: them.secondaryText}">
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

		<view>
			<view class="topic-summary-container">
				<view class="topic-summary-title" :style="{color: them.primaryText}">
					<text>{{topicSummary.title}}</text>
				</view>
				<view style="width: 100%;">
					<view class="topic-summary-statistic-container">
						<view class="statistic">
							<view class="statistic-item" :style="{color: them.primary, 'background-color': them.secondary}">{{topicSummary.interestUserCount}}
								关注</view>
							<view class="statistic-item" :style="{color: them.primary, 'background-color': them.secondary}">{{topicSummary.voteCount}}
								次参与</view>
						</view>
						<view class="statistic" :style="{color: them.secondaryText}">
							{{topicSummary.insertTime}}
						</view>
					</view>
				</view>
				<block v-if="topicSummary.notes !== undefined">
					<view class="topic-notes" :style="{color: them.primaryText, 'border-top-color': them.sperLine}">
						{{topicSummary.notes}}
					</view>
				</block>
				<block v-else></block>

				<view style="width: 100%;">
					<view class="topic-summary-vote-container">
						<image @click="addVote(1)" class="topic-summary-vote-item" mode="aspectFit" src="../../static/thumb-up-line.png" />
						<view :style="{'background-color': them.sperLine}" class="topic-summary-vote-item-line"></view>
						<image @click="addVote(-1)" class="topic-summary-vote-item" mode="aspectFit" src="../../static/thumb-down-line.png" />
						<view :style="{'background-color': them.sperLine}" class="topic-summary-vote-item-line"></view>
						<image @click="addToInterest" class="topic-summary-vote-item" mode="aspectFit" src="../../static/heart-add-line.png" />
					</view>
				</view>
			</view>
		</view>

		<view style="margin-top: 60upx;">
			<view class="comments-container" :style="{'background-color': them.primaryBackground}">
				<block v-if="comments.length === 0">
					<view class="content no-comment-tip" :style="{color: them.secondaryText}">
						还没有评论，快投出宝贵的一票吧
					</view>
				</block>
				<block v-else>
					<view class="content comments-stats-container">
						<view :style="{color: them.primaryText}">
							<text :style="{color: them.agree, 'margin-right': '10upx'}">23</text>票赞同 <text :style="{color: them.disagree, 'margin-left': '20upx','margin-right': '10upx'}">40.5</text>票反对
						</view>
						<image @click="showVoteCalcIntro" class="vote-calc-tip" mode="aspectFit" src="../../static/question-fill.png" />
					</view>
					<view class="comments-vote-bar">
						<progress :backgroundColor="them.sperLine" style="transform: rotateY(180deg)" :percent="agree" :activeColor="them.agree"
						 stroke-width="3" />
						<progress :backgroundColor="them.sperLine" :percent="disagree" :activeColor="them.disagree" stroke-width="3" />
					</view>
					<view>
						<view v-for="(item, index) in comments" :key="index">
							<view @click="selectComment(index)" hover-class="hover-for-white-bg" style="min-height: 120upx;">
								<block v-if="item.userId === status.userId">
									<view class="comment-tags">
										<view class="comment-tag" :style="{'background-color': them.c1}">我的</view>
									</view>
								</block>
								<view class="content comment-container">
									<text class="comment-id" :style="{color: item.vote === 1 ? them.agree : (item.vote === -1 ? them.disagree : them.secondaryText)}">{{item.commentId}}</text>
									<text class="comment-content" :style="{
										color: them.primaryText,
										'-webkit-line-clamp': item.selected ? 20 : 2, 
										'font-size': item.selected ? '1em' : '0.9em'}">{{item.content}}</text>
								</view>
							</view>
							<block v-if="index != comments.length - 1">
								<block v-if="item.selected">
									<view class="padding-hr-selected" :style="{'background-color': them.c1}"></view>
								</block>
								<block v-else>
									<view class="padding-hr" :style="{'background-color': them.sperLine}"></view>
								</block>
							</block>
						</view>
						<view @click="loadComments">
							<uni-load-more :color="them.secondaryText" :status="uniLoadMore.status" :size="16" :content-text="uniLoadMore.contentText" />
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
			uniIcons,
			uniLoadMore
		},
		data() {
			return {
				them: them(),
				status: status,
				topicSummary: {},
				commentInfoShow: false,
				selectedComment: {},
				selectedCommentIndex: -1,
				pullDownRefresh: false,
				transfromClass: {
					'position': 'fixed',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
					/* #ifndef APP-NVUE */
					'display': 'flex',
					/* #endif */
					'justify-content': 'center',
					'align-items': 'center'
				},
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
	.padding-hr {
		height: 1px;
		margin-left: 90upx;
		margin-right: 30upx;
	}

	.padding-hr-selected {
		height: 2px;
		opacity: 0.8;
		margin-left: 30upx;
		margin-right: 30upx;
	}

	.vote-calc-tip {
		width: 40upx;
		height: 40upx;
	}

	.topic-notes {
		border-top-style: solid;
		border-top-width: 1px;

		padding-top: 30upx;
		padding-bottom: 30upx;
		margin-left: 30upx;
		margin-right: 30upx;
		font-size: 26upx;
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

	.topic-summary-container {
		background-color: white;
		border-radius: 10px;
		padding-bottom: 10upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}

	.topic-summary-vote-item-line {
		height: 30upx;
		width: 1px;
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

	.selected-comment-info {
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.selected-comment-info-container {
		z-index: 1;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 120upx;
		width: 94%;
		padding-left: 3%;
		padding-right: 3%;
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

	.comment-tags {
		z-index: 0;
		z-index: initial;
		position: absolute;
		right: 0;
		margin-right: 30upx;
		height: 120upx;
		width: 200upx;
		opacity: 0.7;
		overflow: hidden;
	}

	.comment-tag {
		transform: rotate(45deg) scale(0.8);
		text-align: center;
		width: 180upx;
		height: 40upx;
		font-size: 20upx;
		color: white;

		margin-top: 10upx;
		margin-left: 80upx;
	}

	.comment-container {
		padding-top: 20upx;
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
		padding-bottom: 20upx;
		display: flex;
		justify-content: space-between;
	}

	.no-comment-tip {
		width: 100%;
		text-align: center;
	}

	.comments-container {
		padding-top: 30upx;
		padding-bottom: 60upx;
		margin-bottom: 100upx;
		margin-top: 20upx;
	}
</style>
