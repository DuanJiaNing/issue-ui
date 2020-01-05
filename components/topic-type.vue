<template>
	<view>
		<view class="navigator">
			<uni-icons type="arrowdown" size="20" color="#54B1F7"></uni-icons>
			<text style="color: #2182ED;">
				{{topicType.name}}
			</text>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'

	export default {
		components: {
			uniIcons
		},
		data() {
			return {
			}
		},
		computed: {
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
