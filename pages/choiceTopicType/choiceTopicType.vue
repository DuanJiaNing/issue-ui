<template>
	<view class="choice-topic-type" :style="{'background-color':them.secondaryBackground}">
		<text v-for="(ttype,index) in types" @click="choiceType(index)" :key="index" :style="{color: them.primaryText}">
			{{ttype.name}}
		</text>
	</view>
</template>

<script>
	import TopicService from '@/service/TopicService.js'
	import StatusService from '@/service/StatusService.js'
	import {
		them
	} from '@/service/ThemService.js'
	export default {
		data() {
			return {
				them: them()
			}
		},
		computed: {
			types() {
				return TopicService.topicTypes
			}
		},
		onLoad() {},
		methods: {
			choiceType(topicTypeIndex) {
				var oldIndex = StatusService.status.topicTypeIndex
				if (oldIndex != topicTypeIndex) {
					StatusService.status.refreshType = 2
					StatusService.status.topicTypeIndex = topicTypeIndex
				}
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped>
	page {
		/* background-color: black; */
		/* height: 100%; */
		position: fixed;
		min-height: 100vh;
		display: flex;
		width: 100%;
	}

	.choice-topic-type {
		position: fixed;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.choice-topic-type text {
		height: 120upx;
		color: white;
		width: 100%;
		line-height: 120upx;
		text-align: center;
		font-size: 50upx;
	}
</style>
