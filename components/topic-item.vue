<template>
	<view class="topic-item-content">
		<view class="topic-container">
			<text>{{item.title}}</text>
		</view>
		<view class="statistic-container">
			<view class="statistic">
				<view class="stats-item">
					<uni-icons type="star-filled" size="10" style="color: #54B1F7;"></uni-icons>
					<text style="color: #54B1F7;">{{item.interestUserCount}}</text>
				</view>
				<view class="stats-item">
					<uni-icons type="checkmarkempty" size="10" style="color: #09BB07;"></uni-icons>
					<text style="color: #09BB07;">{{item.agree}}</text>
				</view>
				<view class="stats-item">
					<uni-icons type="closeempty" size="10" style="color: #EC559E;"></uni-icons>
					<text style="color: #EC559E;">{{item.disagree}}</text>
				</view>
			</view>
			<view>
				<text>{{item.insertTime}}</text>
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
		/* background-color: #8A6DE9; */
		height: 150upx;
		
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
		height: 30upx;
	}

	.statistic-container text {
		color: #999999;
		height: 30upx;
		line-height: 30upx;
		font-size: 8upx;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		word-break: break-all;
		overflow: hidden;
	}

	.topic-container {
		/* background-color: #0A98D5; */
		height: 120upx;

		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.topic-container text {
		/* background-color: #2C405A; */
		lines: 2;
		color: black;
		font-size: 28upx;
		vertical-align: middle;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		word-break: break-all;
		overflow: hidden;
	}
</style>
