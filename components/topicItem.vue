<template>
	<view>
		<!-- {{item.title}} -->
		<view class="uni-flex uni-row">
			<view class="text uni-flex" style="width: 200upx;height: 220upx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
				<image src="../../../static/plus.png" style="width: 150upx;height: 150upx;"></image>
			</view>
			<view class="uni-flex uni-column" style="-webkit-flex: 1;flex: 1;-webkit-justify-content: space-between;justify-content: space-between;">
				<view class="text" style="height: 120upx;text-align: left;padding-left: 20upx;padding-top: 10upx;">
					文字居左，留出左间距
				</view>
				<view class="uni-flex uni-row">
					<view class="text" style="-webkit-flex: 1;flex: 1;">剩余数量</view>
					<view class="text" style="-webkit-flex: 1;flex: 1;">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "topic-item",
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
.text {
		margin: 15upx 10upx;
		padding: 0 20upx;
		background-color: #ebebeb;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: #777;
		font-size: 26upx;
	}
</style>
