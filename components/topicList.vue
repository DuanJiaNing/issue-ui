<template>
	<view class='topic-list'>
		<block v-for="(topic,index) in topics" :key='index'>
			<text>{{topic.title}}</text>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'topicList',
		data() {
			return {};
		},
		props: {
			topics: {
				type: Array
			}
		},
	}
</script>

<style>
</style>
