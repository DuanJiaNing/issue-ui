<template>
	<view>
		<view class="content">
			<block v-if="status.homeShow">
				<view class="uni-flex uni-row top-bar">
					<topic-type class="top-bar-item" :topicType="types[status.topicTypeIndex]"></topic-type>
				</view>
				<search class="search" :sortName="sortTypes[status.search.sortTypeIndex].name"></search>
			</block>
			<block v-else>
				me-show111111111212
			</block>
		</view>
		<tab-bar @switchTab="switchTab" :tab="status.tab"></tab-bar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar.vue'
	import topicType from '@/components/topicType.vue'
	import search from '@/components/search.vue'
	import config from '../../config.js'

	export default {
		components: {
			tabBar,
			topicType,
			search
		},
		computed: {
			types() {
				return config.topicTypes
			},
			sortTypes() {
				return config.sortTypes
			}
		},
		onLoad(option) {
			if (option.searchKeyWord) {
				this.status.keyWorld = option.searchKeyWord
			} else {
				this.status.keyWorld = "搜索"
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
			switchTab(tab) {
				this.status.tab = tab
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

	.top-bar-item {
		padding: 0 20upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		font-size: 60upx;
	}

	.search {
		margin-top: 20upx;
	}
</style>
