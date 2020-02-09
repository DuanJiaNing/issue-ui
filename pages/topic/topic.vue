<template>
	<view style="padding-bottom: 100upx;">
		<block v-if="commentInfoShow">
			<view class="selected-comment-info-container" :style="{
		'padding-bottom': isIphoneX() ? '25px' : '0'}">
				<view class="selected-comment-info">
					<view style="display: flex;flex-direction: row;align-items: center;">
						<text class="selected-comment-id" :style="{
							color: selectedCommentInfo.vote === 1 ? '#09BB07' : (selectedCommentInfo.vote === -1 ? '#EC559E' : '#999999')}">{{selectedCommentInfo.id}}</text>
						<view class="selected-comment-subinfo">
							<text class="selected-comment-insertTime">
								<block v-if="selectedCommentInfo.voteByMe">
									我
								</block>
								发表于 {{selectedCommentInfo.insertTime}}
							</text>
							<view class="selected-comment-vote">
								{{selectedCommentInfo.agree}} 赞同 {{selectedCommentInfo.disagree}} 反对
								<block v-if="selectedCommentInfo.myVote !== 0">
									{{selectedCommentInfo.myVote === -1 ? '(已投反对票)' : '(已投赞同票)'}}
								</block>
							</view>
						</view>
					</view>

					<view style="display: flex;flex-direction: row;align-items: center;">
						<block v-if="selectedCommentInfo.myVote === 0">
							<view @click="doVote(1)" hover-class="hover-for-white-bg" class="select-comment-vote-btn">
								<uni-icons type="checkmarkempty" size="28" style="color: #09BB07;"></uni-icons>
							</view>
							<view @click="doVote(-1)" style="margin-right: 20upx;" hover-class="hover-for-white-bg" class="select-comment-vote-btn">
								<uni-icons type="closeempty" size="28" style="color: #EC559E;"></uni-icons>
							</view>
						</block>
						<view @click="hideSelectCommentInfo">
							<uni-icons type="arrowdown" size="15" style="color: #999999; margin-left: 20upx;"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</block>
		<view class="content" style="margin-top: 30upx;">
			<topic-item :radius="true" :item="topicSummary" :showNotice="true"></topic-item>
		</view>

		<view class="content">
			<view class="comments-container" style="margin-top: 60upx;">
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
						<uni-icons type="help-filled" size="20" style="color: #09BB07; margin-left: 20upx;"></uni-icons>
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
									'background-color': item.selected ? '#3a3a3a' : (item.voteByMe ? '#fff7d3' : '#ffffff')
								}"
								 class="content comment-container" hover-class="hover-for-white-bg">
									<text class="comment-id" :style="{color: item.vote === 1 ? '#09BB07' : (item.vote === -1 ? '#EC559E' : '#999999')}">{{item.id}}</text>
									<text class="comment-content" :style="{
										'-webkit-line-clamp': item.selected ? 20 : 2, 
										'font-size': item.selected ? '1.2em' : '0.9em'}">{{item.content}}</text>
								</view>
							</view>
							<block v-if="index != comments.length - 1">
								<view class="padding-hr"></view>
							</block>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import topicItem from '@/components/topic-item.vue'

	import uniIcons from '@/components/uni-icons/uni-icons.vue'

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
			topicItem,
			uniIcons
		},
		data() {
			return {
				status: status,
				topicSummary: {},
				comments_: [],
				commentInfoShow: false,
				selectedCommentInfo: {},
				selectedCommentIndex: -1,
				comments: [{
						id: 1,
						selected: false,
						content: "树型结构的设计我们需要考虑的是次级评论的展示问题。因为次级评论是依附于一级评论的，所以一些产品会将次级评论“收起来”放到二级页面进行展示。以微博为例，其评论区只会展示一级评论，所有的二级评论，哪怕获得的点赞量再高，都必须要进入二级页面才可以查看。",
						// insertTime: "2小时前",
						// userId: "12121", // userId === uid ? My : notShow
						// agree: 12,
						// disagree: 23,
						vote: 1, // 1 -1 0.5 -0.5
						voteByMe: false,
					},
					{
						id: 101,
						selected: false,
						content: "树型结构的设计我们需要考虑的是次级评论的展示问题。因为次级评论是依附于一级评论的，所以一些产品会将次级评论“收起来”放到二级页面进行展示。以微博为例，其评论区只会展示一级评论，所有的二级评论，哪怕获得的点赞量再高，都必须要进入二级页面才可以查看。",
						vote: 0.5, // 1 -1 0.5 -0.5
						voteByMe: true,
					},
					{
						id: 98,
						selected: false,
						content: "树型结构的设计我们需要考虑的是次级评论的展示问题。因为次级评论是依附于一级评论的，所以一些产品会将次级评论“收起来”放到二级页面进行展示。以微博为例，其评论区只会展示一级评论，所有的二级评论，哪怕获得的点赞量再高，都必须要进入二级页面才可以查看。",
						vote: -1, // 1 -1 0.5 -0.5
						voteByMe: false,
					},
					{
						id: 9822,
						selected: false,
						content: "树型结构的设计我们需要考虑的是次级评论的展示问题。因为次级评论是依附于一级评论的，所以一些产品会将次级评论“收起来”放到二级页面进行展示。以微博为例，其评论区只会展示一级评论，所有的二级评论，哪怕获得的点赞量再高，都必须要进入二级页面才可以查看。",
						vote: 1, // 1 -1 0.5 -0.5
						voteByMe: true,
					},
					{
						id: 922,
						selected: false,
						content: "树型结构的设计我们需要考虑的是次级评论的展示问题。因为次级评论是依附于一级评论的，所以一些产品会将次级评论“收起来”放到二级页面进行展示。以微博为例，其评论区只会展示一级评论，所有的二级评论，哪怕获得的点赞量再高，都必须要进入二级页面才可以查看。",
						vote: 1, // 1 -1 0.5 -0.5
					},
					{
						id: 42,
						selected: false,
						content: "树型结构的设计我们需要考虑的是次级评论的展示问题。因为次级评论是依附于一级评论的，所以一些产品会将次级评论“收起来”放到二级页面进行展示。以微博为例，其评论区只会展示一级评论，所有的二级评论，哪怕获得的点赞量再高，都必须要进入二级页面才可以查看。",
						vote: 1, // 1 -1 0.5 -0.5
						voteByMe: false,
					},
				]
			}
		},
		computed: {
			agree() {
				return 60
			},
			disagree() {
				return 20
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 1) { // agree
				uni.navigateTo({
					url: '/pages/vote/vote?vote=1'
				});
				return
			}
			if (e.index === 0) { // disagree
				uni.navigateTo({
					url: '/pages/vote/vote?vote=-1'
				});
				return
			}
		},
		methods: {
			doVote(vote) {
				toolsService.showSuccessToast('vote: ' + vote)
			},
			isIphoneX() {
				return toolsService.isIphoneX()
			},
			hideSelectCommentInfo() {
				this.comments[this.selectedCommentIndex].selected = false
				this.commentInfoShow = false
			},
			loadCommentInfo(commentId) {
				this.selectedCommentInfo = {
					id: commentId,
					myVote: 0, // 0 1 -1
					vote: 1,
					agree: 21,
					disagree: 23,
					insertTime: '20/02/01 21:50',
					voteByMe: true
				}
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
					this.loadCommentInfo(this.comments[index].id)
				}
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
		onShow() {
			this.loadTopic()
		}
	}
</script>

<style>
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
		height: 100upx;
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
		color: #999999;
	}

	.select-comment-vote-btn {
		padding-left: 10upx;
		padding-right: 10upx;
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
		box-shadow: 0 0 40px rgba(118, 118, 118, 7);
	}
</style>
