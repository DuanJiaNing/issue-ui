<template>
	<view>
		<navigator class="navigator" url="/pages/choiceTopicType/choiceTopicType" animation-type="fade-in">
			<uni-icons type="arrowdown" size="20" :color="topicType.them.color.secondary"></uni-icons>
			<text :style="{color:topicType.them.color.primary}">
				<!-- <text class="drop-down">o</text> -->
				{{topicType.name}}
			</text>
		</navigator>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	export default {
		components: {
			uniIcons
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
