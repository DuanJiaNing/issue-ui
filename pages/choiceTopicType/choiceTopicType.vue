<template>
	<view class="choice-topic-type">
		<text v-for="(ttype,index) in types" :style="{color:ttype.them.color.primary}" @click="choiceType(index)" :key="index">
			{{ttype.name}}
		</text>
	</view>
</template>

<script>
	import config from '../../config.js'

	export default {
		data() {
			return {}
		},
		computed: {
			types() {
				return config.topicTypes
			}
		},
		methods: {
			choiceType(topicTypeIndex) {
				uni.reLaunch({
					url: `/pages/index/index?topicTypeIndex=${topicTypeIndex}`
				});
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
