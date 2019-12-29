<template>
	<view class="choice-topic-type">
		<text v-for="(ttype,index) in types" :style="{color:topicTypeColor(ttype.code)}" @click="choiceType(index)" :key="index">
			{{ttype.name}}
		</text>
	</view>
</template>

<script>
	import TopicService from '@/service/TopicService.js'
	import StatusService from '@/service/StatusService.js'
	import {
		topicColor
	} from '@/service/ThemService.js'

	export default {
		data() {
			return {}
		},
		computed: {
			types() {
				return TopicService.topicTypes
			}
		},
		onLoad() {
			console.log(StatusService.status)
		},
		methods: {
			choiceType(topicTypeIndex) {
				StatusService.status.topicTypeIndex = topicTypeIndex
				uni.navigateBack({
					delta:1
				})
			},
			topicTypeColor(topicCode) {
				return topicColor(topicCode).primary
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
