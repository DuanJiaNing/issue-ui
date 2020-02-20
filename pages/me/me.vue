<template>
	<view>
		<view>
			<view class="content top-part1" :style="{'background-color': them.primaryBackground}">
				<view class="part1-item">
					<text class="title" :style="{color: them.primaryText}">Speak out</text>
					<text class="sub-title" :style="{color: them.secondaryText}">于2019年2月23日加入</text>
				</view>
				<image class="logo-image" mode="aspectFit" src="../../static/logo.png" />
			</view>
			<view class="content top-part2" :style="{'background-color': them.secondaryBackground}">
				<view class="part2-item">
					<text class="count" :style="{color: them.primaryText}">6</text>
					<text class="type" :style="{color: them.secondaryText}">次发起</text>
				</view>
				<view class="part2-item">
					<text class="count" :style="{color: them.primaryText}">230</text>
					<text class="type" :style="{color: them.secondaryText}">次关注</text>
				</view>
				<view class="part2-item">
					<text class="count" :style="{color: them.primaryText}">98</text>
					<text class="type" :style="{color: them.secondaryText}">次参与</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ApiService from '@/service/ApiService.js'
	import {
		status
	} from '@/service/StatusService.js'
	import {
		them
	} from '@/service/ThemService.js'
	export default {
		data() {
			return {
				them: them(),
				host: ApiService.host
			}
		},
		methods: {

		}
	}
</script>

<style>
	.logo-image {
		border-radius: 150upx;
		width: 220upx;
		height: 120upx;
	}

	.top-part1 {
		height: 400upx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.part2-item .count {
		font-size: 40upx;
	}

	.part2-item .type {
		font-size: 20upx;
	}

	.part2-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.part1-item .title {
		font-size: 56upx;
	}

	.part1-item .sub-title {
		font-size: 25upx;
	}

	.part1-item {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		/* align-items: center; */
	}

	.top-part2 {
		border-top: solid 1px #dcdcdc;
		height: 150upx;
		box-shadow: 0px 10px 20px #dcdcdc;

		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
</style>
