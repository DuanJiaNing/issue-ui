<template>
	<view>
		<navigator class="navigator" url="/pages/choiceTopicType/choiceTopicType" animation-type="fade-in">
			<uni-icons type="arrowdown" size="20" :color="topicTypeColor.secondary"></uni-icons>
			<text :style="{color:topicTypeColor.primary}">
				<!-- <text class="drop-down">o</text> -->
				{{topicType.name}}
			</text>
		</navigator>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	import {topicColor} from '@/service/ThemService.js'
	
	export default {
		components: {
			uniIcons
		},
		computed: {
			topicTypeColor() {
				return topicColor(this.topicType.code)
			}
		},
		name: "topic-type",
		props: {
			topicType: {
				type: Object,
				required: true
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	text {
		height: 100upx;
		line-height: 100upx;
		font-size: 60upx;
	}
</style>
