<template>
	<view style="padding-bottom: 200upx;">
		<block v-if="!isApp()">
			<view class="get-app-container">
				<button class="save-btn colorful-stripe" size="default" hover-class="save-btn-hover">GET APP</button>
			</view>
		</block>

		<view>
			<view class="content top-part1-container" :style="{'background-color': them.primaryBackground}">
				<view class="top-part1">
					<block v-if="curSexMan">
						<image @click="switchCurSexMan(false)" class="logo-image" mode="aspectFit" src="../../static/man.png" />
					</block>
					<block v-else>
						<image @click="switchCurSexMan(true)" class="logo-image" mode="aspectFit" src="../../static/woman.png" />
					</block>
					<view>
						<view class="part1-item-cal" :style="{'background-color': them.secondaryBackground}">
							<view :style="{'background-color': isToday(index) ? them.currentDate : them.primaryBackground}" class="part1-item-item"
							 v-for="(item, index) in voteReco" :key="index">
								<block v-if="item == 1">
									<image :style="{'background-color': them.agree}" class="part1-item-item-image" mode="aspectFit" src="../../static/check-line-white.png" />
								</block>
								<block v-else-if="item == -1">
									<image :style="{'background-color': them.disagree}" class="part1-item-item-image" mode="aspectFit" src="../../static/close-line-white.png" />
								</block>
							</view>
						</view>
						<view class="part1-item-time" :style="{color: them.secondaryText}">
							今天是2020年2月21号 <text :style="{color: them.currentDate}">星期五</text></view>
					</view>
				</view>
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

		<view class="me-option" :style="{'background': 'linear-gradient('+them.primaryBackground+', '+them.secondaryBackground+')'}">
			<view>
				<view class="option-item" hover-class="option-item-hover">
					<text>关于</text>
				</view>
				<view class="padding-hr" :style="{'background-color': them.sperLine}"></view>
			</view>
			<view>
				<view class="option-item" hover-class="option-item-hover">
					<text>问题反馈</text>
				</view>
				<view class="padding-hr" :style="{'background-color': them.sperLine}"></view>
			</view>
			<view>
				<view class="option-item" hover-class="option-item-hover">
					<text>常见问题</text>
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
				voteReco: [0, 1, 0, -1, 0, 1, 1],
				curSexMan: false,
				them: them(),
				host: ApiService.host
			}
		},
		methods: {
			switchCurSexMan(sex) {
				this.curSexMan = sex
			},
			isToday(index) {
				return index == 4
			},
			isApp() {
				return false
			}
		}
	}
</script>

<style>
	.save-btn {
		border-radius: 50upx;
		padding: 0 200upx;
		color: #ffffff;
	}

	.save-btn-hover {
		opacity: 0.5;
	}

	.get-app-container {
		z-index: 1;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		margin-bottom: 60upx;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		/* background-color: #007AFF; */
	}

	.padding-hr {
		height: 1px;
	}

	.option-item-hover {
		background-color: #EEEEEE;
	}

	.option-item {
		padding: 25upx 20upx;
	}

	.me-option {
		padding: 30upx;
		border-top-right-radius: 40upx;
		border-top-left-radius: 40upx;
		margin-top: 100upx;
		box-shadow: 0px -15px 20px #EEEEEE;
		/* margin-left: 30upx; */
		/* margin-right: 30upx; */

		/* height: 100%; */
	}

	.logo-image {
		width: 300upx;
		height: 300upx;
	}

	.part1-item-time {
		font-size: 20upx;
		margin-top: 10upx;
	}

	.part1-item-cal {
		padding: 10upx;
		width: 350upx;
		height: 200upx;

		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.part1-item-item-image {
		border-radius: 50%;
		width: 30upx;
		height: 30upx;
	}

	.part1-item-item {
		width: 90upx;
		height: 45upx;
		margin: 8upx 8upx;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.top-part1-container {
		padding-top: 60upx;
		padding-bottom: 30upx;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.top-part1 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
	}

	.part2-item .type {
		font-size: 20upx;
	}

	.part2-item .count {
		font-size: 35upx;
	}

	.part2-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.top-part2 {
		border-top: solid 1px #dcdcdc;
		height: 120upx;
		box-shadow: 0px 10px 20px #e7e7e7;

		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
</style>
