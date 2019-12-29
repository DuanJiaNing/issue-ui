<template>
	<view class="content">
		<view class="statistic-content">
			<view class="statistic">
				<text class="like">1234</text>
				/
				<text class="dislike">34</text>
			</view>
			<view class="count">12人</view>
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
			appThem() {
				return config.appThem()
			}
		},
		props: {
			item: {
				type: Object,
				required: true
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.like {
		color: #09BB07;
	}
	
	.statistic {
		font-size: 18upx;
	}
	
	.dislike {
		color: #DD524D;
	}
	
	.count {
		font-size: 18upx;
		text-align: center;
		color: #999999;
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

	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 115upx;

		border-radius: 10upx;
	}

	.topic-content text {
		lines: 2;
		color: black;
		font-size: 30upx;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		word-break: break-all;
		overflow: hidden;
	}
</style>
