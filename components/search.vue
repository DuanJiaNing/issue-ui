<template>
	<view class="search">
		<view class="search-content" :style="{'background-color': them.secondaryBackground}">
			<block v-if="sortShow">
				<text class="sort-type" @click="showSortOption()">
					{{sortTypeName}}
				</text>
				<uni-icons type="arrowdown" size="10" style="color: #999999;"></uni-icons>
			</block>

			<block v-if="canClear && sortShow">
				<text class="separ-line">|</text>
			</block>

			<block v-if="canClear">
				<text class="clear-key-word" @click="clearSearchKeyWord()">x</text>
			</block>

			<text class="key-word" @click="gotoSearch()">{{searchKeyWord}}</text>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	import {
		them
	} from '@/service/ThemService.js'
	import {
		topicTypes,
		sortTypes
	} from '@/service/TopicService.js'
	import {
		status
	} from '@/service/StatusService.js'

	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				them: them(),
				status: status,
				topicTypes: topicTypes,
				sortTypes: sortTypes
			};
		},
		computed: {
			sortShow() {
				return this.topicTypes[this.status.topicTypeIndex].code === 'all'
			},
			sortTypeName() {
				return this.sortTypes[this.status.sortTypeIndex].name
			},
			searchKeyWord() {
				return this.status.search.keyWord === '' ? '搜索' : this.status.search.keyWord
			},
			canClear() {
				return this.searchKeyWord !== '搜索'
			}
		},
		name: "search",
		methods: {
			gotoSearch() {
				uni.navigateTo({
					url: `/pages/search/search`
				});
			},
			showSortOption() {
				let stypeName = new Array()
				this.sortTypes.forEach(st => {
					stypeName.push(st.name)
				})

				uni.showActionSheet({
					title: '请选择排序方式',
					itemList: stypeName,
					success: (e) => {
						this.status.sortTypeIndex = e.tapIndex
					}
				})
			},
			clearSearchKeyWord() {
				this.status.search.keyWord = ''
				this.$emit('clearKeyWord')
			}
		}
	}
</script>

<style>
	.key-word {
		-webkit-flex: 1;
		flex: 1;
		white-space: nowrap;
		text-overflow: ellipsis;
		-webkit-text-overflow: ellipsis;
		overflow: hidden;
		font-size: 30upx;
	}

	.search-content {
		color: #999999;
		border-radius: 30upx;
		padding: 8upx 25upx;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.clear-key-word {
		font-size: 30upx;
	}

	.sort-type {
		color: #999999;
		font-size: 25upx;
	}

	.separ-line {
		opacity: 0.3;
		margin: 0px 15upx;
		font-size: 20upx;
	}
</style>
