<template>
	<view>
		<navigator url="/pages/choiceTopicType/choiceTopicType" animation-type="fade-in">
			<text :style="{'color': topicType.color}"><text class="drop-down">o</text>{{topicType.name}}</text>
		</navigator>
	</view>
</template>

<script>
	export default {
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
	.drop-down {
		margin-right: 8px;
		opacity: 0.4;
		font-size: 50upx;
	}
</style>
