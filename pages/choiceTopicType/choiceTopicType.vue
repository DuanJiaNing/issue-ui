<template>
	<view class="choice-topic-type">
		<text v-for="(ttype,index) in types" @click="choiceType(ttype)" :key="index" :style="{'color': ttype.color}">
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
				return [
					config.topicTypes.hot,
					config.topicTypes.all,
					config.topicTypes.cool,
					config.topicTypes.latest,
					config.topicTypes.my
				]
			}
		},
		methods: {
			choiceType(ttype) {
				let typeName = ttype.name
				uni.reLaunch({
					url: `/pages/index/index?topicTypeName=${ttype.name}&topicTypeColor=${ttype.color}`
				});
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: black;
		height: 100%;
		width: 100%;
	}

	.choice-topic-type {
		display: flex;
		flex-direction: column;
		justify-content: center;

		height: 100%;
		width: 100%;
	}

	.choice-topic-type text {
		height: 120upx;
		color: wheat;
		width: 100%;
		line-height: 120upx;
		text-align: center;
		font-size: 50upx;
	}
</style>
