<template>
	<view class="time-title-item content">
		<view class="time">
			{{item.insertTime}}
		</view>
		<view class="title">
			{{item.title}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "time-title-item",
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
	.time {
		color: #999999;
		width: 30%;

		overflow: hidden;
		text-overflow: ellipsis;
		-ms-text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title {
		overflow: hidden;
		text-overflow: ellipsis;
		-ms-text-overflow: ellipsis;
		white-space: nowrap;

		width: 70%;
	}

	.time-title-item {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: 18upx;
		padding-bottom: 18upx;
	}
</style>
