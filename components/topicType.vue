<template>
	<view>
		<view class="navigator">
			<uni-icons type="arrowdown" size="20" color="#4d8ed7"></uni-icons>
			<text style="color: #007AFF;">
				{{topicType.name}}
			</text>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	import config from '../config.js'

	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				color: config.color
			}
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
	uni-icons {}

	text {
		height: 100upx;
		line-height: 100upx;
		font-size: 60upx;
	}
</style>
