<template>
	<view class="topic-item-content">
		<view class="topic-container">
			<text>{{item.title}}</text>
		</view>
		<view class="statistic-container">
			<view class="statistic">
				<view class="stats-item">
					<text style="color: #54B1F7;">{{item.interestUserCount}} 关注</text>
				</view>
				<view class="stats-item">
					<text>{{item.voteCount}} 次投票</text>
				</view>
			</view>
			<view class="statistic">
				<text>{{item.insertTime}}</text>
				<block v-if="item.vote > 0">
					<uni-icons type="checkmarkempty" size="25" style="color: #09BB07; margin-left: 20upx;"></uni-icons>
				</block>
				<block v-else-if="item.vote < 0">
					<uni-icons type="closeempty" size="25" style="color: #EC559E; margin-left: 20upx;"></uni-icons>
				</block>
				<block v-else>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	export default {
		components: {
			uniIcons
		},
		name: "topic-item",
		computed: {},
		props: {
			item: {
				type: Object,
				required: true
			}
		},
		data() {
			return {}
		}
	}
</script>

<style>
	.stats-item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-left: 10upx;
	}

	.statistic {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.topic-item-content {
		padding: 30upx;
		/* border-radius: 5px; */
		/* border-top-left-radius: 5px; */
		box-shadow: 0 0 40px rgba(118, 118, 118, 7);

		background-color: #ffffff;
		height: 180upx;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		/* align-items: center; */
	}

	.statistic-container {
		/* background-color: #007AFF; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		opacity: 0.8;
		width: 100%;
		height: 35upx;
	}

	.statistic-container text {
		color: #999999;
		height: 30upx;
		line-height: 30upx;
		font-size: 20upx;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		word-break: break-all;
		overflow: hidden;
	}

	.topic-container {
		/* background-color: #0A98D5; */
		height: 125upx;

		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.topic-container text {
		/* background-color: #2C405A; */
		color: black;
		font-size: 28upx;
		vertical-align: middle;
	}
</style>
