<template>
	<view class="search">
		<view class="search-content">
			<block v-if="sortShow">
				<text class="sort-type" @click="showSortOption()">o {{sortName}}</text>
			</block>

			<block v-if="canClear && sortShow">
				<text class="separ-line">|</text>
			</block>

			<block v-if="canClear">
				<text class="clear-key-word" @click="clearSearchKeyWord()">X</text>
			</block>

			<text class="key-word" @click="gotoSearch()">{{searchKeyWord}}</text>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		props: {
			sortName: {
				type: String,
				requied: true
			},
			searchKeyWord: {
				type: String,
				requied: true
			},
			sortShow: {
				type: Boolean,
				requied: true
			}
		},
		methods: {
			gotoSearch() {
				uni.navigateTo({
					url: `/pages/search/search`
				});
			},
			showSortOption() {
				this.$emit('showSortOption')
			},
			clearSearchKeyWord() {
				this.$emit('clearSearchKeyWord')
			}
		},
		computed: {
			canClear() {
				return this.searchKeyWord !== '搜索'
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.key-word {
		-webkit-flex: 1;
		flex: 1;
	}

	.search-content {
		color: #777;
		border-radius: 25upx;
		padding: 10upx 20upx;
		background-color: lightgray;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.clear-key-word {
		font-size: 25upx;
	}

	.sort-type {
		font-size: 20upx;
	}

	.separ-line {
		opacity: 0.3;
		margin: 0px 15upx;
		font-size: 32upx;
	}
</style>