<template>
	<view>
		<navigator url="/pages/choiceTopicType/choiceTopicType" animation-type="fade-in">
			<text :style="{'color': topicType.color}">{{topicType.name}}</text>
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

</style>
