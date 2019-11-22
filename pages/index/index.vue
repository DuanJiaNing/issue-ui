<template>
	<view>
		<view class="content">
			<block v-if="homeShow">
				<view class="uni-flex uni-row top-bar">
					<!-- <view class="text">横向布局-两端对齐</view> -->
					<!-- <view class="text">横向布局-两端对齐</view> -->
					<topic-type class="topic-type" :topicType="currentTopicType"></topic-type>
					<!-- <topic-type class="topic-type" :topicType="currentTopicType"></topic-type> -->
				</view>
			</block>
			<block v-else>
				me-show11111111
			</block>
		</view>
		<tab-bar @switchTab="switchTab" :tab="currentTab"></tab-bar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar.vue'
	import topicType from '@/components/topicType.vue'
	import config from '../../config.js'

	export default {
		components: {
			tabBar,
			topicType
		},
		onLoad(option) {
			if (option.topicTypeName === undefined || option.topicTypeColor === undefined) {
				this.currentTopicType = config.topicTypes.all
			} else {
				this.currentTopicType = {
					name: option.topicTypeName,
					color: option.topicTypeColor
				}
			}
		},
		methods: {
			switchTab(tab) {
				this.currentTab = tab
				switch (tab) {
					case 'home':
						if (!this.homeShow) {
							this.homeShow = true
						}
						break
					case 'me':
						if (this.homeShow) {
							this.homeShow = false
						}
						break
					case 'add':
						// TODO
						break
					default:
						// should not happen
						break;
				}
			}
		},
		data() {
			return {
				homeShow: true,
				currentTab: 'home',
				currentTopicType: config.topicTypes.all
			}
		}
	}
</script>

<style scoped>
	.top-bar {
		-webkit-justify-content: space-between;
		justify-content: space-between;
		width: 100%;
		height: 100upx;
	}

	.topic-type {
		padding: 0 20upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		color: #fff;
		font-size: 60upx;
	}
</style>
