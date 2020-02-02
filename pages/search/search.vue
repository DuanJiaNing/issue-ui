<template>
	<view id="search" class="content">
		<br>
		<uni-search-bar ref="search" radius="100" clearButton="always" @confirm="doSearch" @input="input" @cancel="doSearch" />

		<br>
		<block v-if="searchHistory.length > 0 ">
			<view style="color: #999999;margin: 10upx 0;">
				<view>搜索历史</view>
			</view>
			<view class="search-history-container">
				<view @click="setupKeyword(item.content)" v-for="(item, index) in searchHistory" :key="index" class="search-history"
				 hover-class="search-history-hover">
					<text>{{item.content}}</text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'

	import {
		status
	} from '@/service/StatusService.js'
	import toolsService from '@/service/ToolsService.js'
	import {
		api,
		request
	} from '@/service/ApiService.js'
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				keyWord: status.search.keyWord,
				searchHistory: []
			}
		},
		onShow() {
			this.loadSearchHistory()
		},
		methods: {
			setupKeyword(v) {
				this.$refs.search.setupKeyword(v)
			},
			input(res) {
				this.keyWord = res.value
			},
			loadSearchHistory() {
				request({
					url: api.search_history.path,
					data: {
						pageNum: 1,
						pageSize: 10
					},
					method: api.search_history.method,
					success: (res) => {
						if (res.data.code !== 0) {
							toolsService.showErrorToast('加载失败: ' + res.data.msg)
							return
						}
						this.searchHistory = res.data.data.list
					},
					fail: function(err) {
						console.log(err)
						toolsService.showServerUnavlibleToast()
					}
				})
			},
			addSearcHistory() {
				request({
					url: api.add_search_history.path,
					data: this.keyWord,
					method: api.add_search_history.method,
					success: (res) => {
						if (res.data.code !== 0) {
							toolsService.showErrorToast('添加搜索历史失败: ' + res.data.msg)
							return
						}
						this.loadSearchHistory()
					},
					fail: function(err) {
						console.log(err)
						toolsService.showServerUnavlibleToast()
					}
				})
			},
			doSearch() {
				this.addSearcHistory()

				var oldkw = status.search.keyWord
				let content = this.keyWord.trim()
				status.search.keyWord = content
				status.search.refreshType = oldkw != content ? 3 : 0
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	.search {
		border-style: solid;
		border-width: 1px;
		border-color: #999999;
		border-radius: 15upx;
	}

	.search-history-container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}

	.search-history {
		margin: 15upx 10upx;
		background-color: #ffffff;
		padding: 8upx 25upx;
		border-radius: 5px;
	}

	.search-history-hover {
		background-color: #999999;
		color: #ffffff;
	}
</style>
