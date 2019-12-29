<template>
	<view class="topic-item-content">
		<view class="statistic-content">
			<view class="statistic">
				<text style="color: #09BB07;">1234</text>
				/
				<text style="color: #DD524D;">34</text>
			</view>
			<view class="count" style="color: #999999;">12人</view>
		</view>

		<view class="topic-content">
			<text>{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	import config from '../config.js'
	
	export default {
		name: "topic-item",
		computed: {
		},
		props: {
			item: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				color: config.color
			}
		}
	}
</script>

<style>
	.statistic {
		font-size: 18upx;
	}
	
	.count {
		font-size: 18upx;
		text-align: center;
	}
	
	.statistic-content {
		height: 10upx;
		width: 20%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.topic-content {
		width: 80%;
		padding-left: 10upx;
	}

	.topic-item-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 115upx;

		border-radius: 10upx;
	}

	.topic-content text {
		lines: 2;
		color: black;
		font-size: 28upx;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		word-break: break-all;
		overflow: hidden;
	}
</style>
