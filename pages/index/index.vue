<template>
	<view>
		<view class="content" :style="{'background-color': appThem.color.background.background}">
			<scroll-view class="scroll-view" scroll-y :style="{height: scrollViewHeight}">
				<block v-if="status.homeShow">
					<topic-type class="topic-type" :topicType="types[status.topicTypeIndex]"></topic-type>
					<view class="search-wrapper">
						<search class="search" :sortName="sortTypes[status.search.sortTypeIndex].name" :searchKeyWord="status.search.keyWorld"
						 @showSortOption="showSortOption" :sortShow="types[status.topicTypeIndex].code === 'all'" @clearSearchKeyWord="clearSearchKeyWord"></search>
					</view>
					<view class="topic-list">
						<view v-for="(item, index) in topicList" :key="index">
							<topic-item :item="item"></topic-item>
							<view style="height: 20upx;"></view>
						</view>
						<uni-load-more :status="uniLoadMore.status" :size="16" :content-text="uniLoadMore.contentText" />
					</view>
				</block>
				<block v-else>
					me
				</block>
			</scroll-view>
		</view>
		<tab-bar @switchTab="switchTab" :tab="status.tab" :them="types[status.topicTypeIndex].them"></tab-bar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar.vue'
	import topicType from '@/components/topicType.vue'
	import search from '@/components/search.vue'
	import topicItem from '@/components/topicItem.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

	import config from '../../config.js'

	let observer = null;

	export default {
		components: {
			tabBar,
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
				status: {
					homeShow: true,
					tab: 'home',
					topicTypeIndex: 0,
					search: {
						keyWorld: "搜索",
						sortTypeIndex: 0
					}
				}
			}
		},
		computed: {
			scrollViewHeight() {
				let sinfo
				uni.getSystemInfo({
					success: function(res) {
						sinfo = res
						console.log(res)
					}
				})
				// 屏幕高度=状态栏高度+原生导航栏高度+可使用窗口高度+原生tabbar高度
				let paddingTop_px = 20 // padding-top 30upx -> 20px
				return sinfo.windowHeight - 20 + 'px'
			},
			types() {
				return config.topicTypes
			},
			sortTypes() {
				return config.sortTypes
			},
			topicList() {
				return config.topicList
			},
			thems() {
				return config.thems
			},
			appThem() {
				return config.appThem()
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
		onReady() {
			observer = uni.createIntersectionObserver(this);
			observer.relativeTo('.scroll-view').observe('.topic-type', (res) => {
				console.log("sss " + res.intersectionRatio)
				if (res.intersectionRatio > 0) {
					uni.setNavigationBarTitle({
						title: ''
					});

					uni.setNavigationBarColor({
						frontColor: this.appThem.color.navigationBar.frontColor,
						backgroundColor: this.appThem.color.background.background,
						animation: {
							duration: 400,
							timingFunc: 'easeIn'
						}
					})
				} else if (!res.intersectionRatio > 0) {
					uni.setNavigationBarTitle({
						title: this.types[this.status.topicTypeIndex].name
					});

					uni.setNavigationBarColor({
						frontColor: this.appThem.color.navigationBar.frontColor,
						backgroundColor: this.appThem.color.background.content,
						animation: {
							duration: 400,
							timingFunc: 'easeIn'
						}
					})
				}
			})
		},
		onUnload() {
			if (observer) {
				observer.disconnect()
			}
		},
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
		},
		methods: {
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
				config.sortTypes.forEach(st => {
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
			switchTab(tab) {
				this.status.tab = tab
				console.log(this.status.tab)
				switch (tab) {
					case 'home':
						if (!this.status.homeShow) {
							this.status.homeShow = true
						}
						break
					case 'me':
						if (this.status.homeShow) {
							this.status.homeShow = false
						}
						break
					default:
						// should not happen
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.scroll-view {}

	.topic-type {
		padding-top: 30upx;
	}

	.content {
		/* padding-top: 30upx; */
		padding-left: 30upx;
		padding-right: 30upx;
		/* margin-bottom: 100upx; */
	}

	// #ifdef MP-WEIXIN
	.search-wrapper {
		margin-top: 20upx;
	}

	// #endif

	.search {
		margin-top: 20upx;
	}

	.topic-list {
		margin-top: 50upx;
		margin-bottom: 50px;
	}
</style>
